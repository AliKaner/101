import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameAction, GameState, Player, OpenedTile } from '../types';
import { TOTAL_TILES } from '../types';

import { ACTION_NAMES } from '../utils/constants';

const AUTO_PLAY_INTERVAL = 1000;

export function useGameEngine(actions: GameAction[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const players = useMemoPlayers(actions);

  const timerRef = useRef<number | null>(null);

  const gameState = useMemoGameState(actions, currentIndex, players);

  const goToNext = useCallback(() => {
    if (currentIndex < actions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, actions.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const resetGame = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  const togglePlayback = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(goToNext, AUTO_PLAY_INTERVAL);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, goToNext]);

  const currentAction = actions[currentIndex] || null;

  return {
    gameState,
    currentAction,
    currentIndex: currentIndex + 1,
    isPlaying,
    goToNext,
    goToPrev,
    togglePlayback,
    resetGame,
    players,
  };
}

function useMemoPlayers(actions: GameAction[]): Player[] {
  const playerMap = new Map<number, Player>();

  for (const action of actions) {
    if (!playerMap.has(action.seat_index) && action.user_name) {
      playerMap.set(action.seat_index, {
        seat_index: action.seat_index,
        user_id: action.user_id,
        user_name: action.user_name,
      });
    }
  }

  return Array.from(playerMap.values()).sort((a, b) => a.seat_index - b.seat_index);
}

function useMemoGameState(actions: GameAction[], index: number, players: Player[]): GameState {
  const playerTiles: Record<number, import('../types').Tile[]> = {};
  const centerTiles: Record<string, OpenedTile[][]> = {};
  const discardPile: import('../types').Tile[] = []; // Global history
  const discardPiles: Record<number, import('../types').Tile[]> = {}; // Per player
  let okeyIndicator: import('../types').Tile | null = null;
  let remainingTiles = TOTAL_TILES;
  let winner: string | null = null;
  let lastDiscarderSeat: number = -1;

  players.forEach((p) => {
    playerTiles[p.seat_index] = [];
    centerTiles[p.user_id] = [];
    discardPiles[p.seat_index] = [];
  });

  for (let i = 0; i <= index; i++) {
    const action = actions[i];
    if (!action) continue;

    if (
      (action.action_name === ACTION_NAMES.START_GAME || action.action_name.startsWith('Distributed')) &&
      action.tile
    ) {
      if (!okeyIndicator) {
        okeyIndicator = action.tile;
      }
    }

    // Detect winner: if the player had exactly 1 tile and discards it, they win
    // This check must happen BEFORE tiles_after is applied so we see the pre-discard rack
    if (
      !winner &&
      action.action_name === ACTION_NAMES.DISCARD_TILE &&
      playerTiles[action.seat_index]?.length === 1
    ) {
      winner = action.user_name;
    }

    if (action.tiles_after !== null && action.tiles_after !== undefined) {
      playerTiles[action.seat_index] = action.tiles_after;

      if (!okeyIndicator) {
        const okeyTile = action.tiles_after.find((t) => t.isOkey);
        if (okeyTile) {
          let num = okeyTile.number - 1;
          if (num === 0) num = 13;
          okeyIndicator = { ...okeyTile, number: num, isOkey: false, isJoker: false };
        }
      }
    }

    // Handle null tiles_after on DiscardTile as empty rack (player finished)
    if (action.action_name === ACTION_NAMES.DISCARD_TILE && action.tiles_after === null) {
      playerTiles[action.seat_index] = [];
    }

    if (action.center_tiles) {
      Object.assign(centerTiles, action.center_tiles);
    } else if (action.series_opened) {
      // Initialize if not exists
      if (!centerTiles[action.user_id]) centerTiles[action.user_id] = [];
    }

    if (action.center_tiles) {
      Object.keys(action.center_tiles).forEach((uid) => {
        centerTiles[uid] = action.center_tiles![uid];
      });
    } else if (
      action.series_opened &&
      (action.action_name.includes('Open') || action.action_name === ACTION_NAMES.MERGE_SET)
    ) {
      if (!centerTiles[action.user_id]) centerTiles[action.user_id] = [];

      // For Open actions, we push the new series.
      // For MergeSet, if it sends series_opened, it might be the modified series or new ones.
      // Assuming series_opened contains the Valid Sets that should be added/updated.
      // NOTE: If MergeSet modifies an existing group, pushing a new one might duplicate visual state 
      // if centerTiles isn't fully refreshed. 
      // Ideally backend sends full 'center_tiles' on complex updates.
      // If it sends partial, we assume it's additive for now, or we might need clearer logic.
      // But adding MergeSet here ensures we at least TRY to process it.
      
      action.series_opened.forEach((group) => {
        centerTiles[action.user_id].push(group);
      });
    }

    if (action.action_name === ACTION_NAMES.START_GAME) {
      remainingTiles = TOTAL_TILES;
    }

    if (action.action_name === ACTION_NAMES.DISCARD_TILE && action.tile) {
      discardPile.push(action.tile);
      if (discardPiles[action.seat_index]) {
        discardPiles[action.seat_index].push(action.tile);
      }
      lastDiscarderSeat = action.seat_index;
    }

    if (action.action_name === ACTION_NAMES.DRAW_FROM_DISCARD) {
      discardPile.pop();
      // Remove from the stack of the person who last discarded
      if (lastDiscarderSeat !== -1 && discardPiles[lastDiscarderSeat]) {
        discardPiles[lastDiscarderSeat].pop();
      }
    }
  }

  let drawnCount = 0;
  for (let j = 0; j <= index; j++) {
    const a = actions[j];
    if (a.action_name === 'DrawFromMiddle') drawnCount++;
  }

  const initialHand = 21;
  const initialPool = TOTAL_TILES - players.length * initialHand - 1;

  remainingTiles = initialPool - drawnCount;
  if (remainingTiles < 0) remainingTiles = 0;

  return {
    players,
    playerTiles,
    centerTiles,
    discardPile,
    currentActionIndex: index + 1,
    totalActions: actions.length,
    remainingTiles,
    winner,
    okeyIndicator,
    discardPiles,
  };
}
