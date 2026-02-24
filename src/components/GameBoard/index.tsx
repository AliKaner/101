import { useEffect, useMemo } from 'react';
import type { GameAction, Position, OpenedTile } from '../../types';
import { useGameEngine } from '../../hooks/useGameEngine';
import PlayerRack from '../PlayerRack';
import PlayerOpeningGrid from '../PlayerOpeningGrid';
import PairOpeningGrid from '../PairOpeningGrid';
import { computePairCells } from '../../utils/gridUtils';
import PlaybackControls from '../PlaybackControls';
import ActionCounter from '../ActionCounter';
import { useWinner } from '../../context/WinnerContext';

import DiscardStack from '../DiscardStack';
import styles from './GameBoard.module.scss';

interface GameBoardProps {
  actions: GameAction[];
  onBack: () => void;
  onShowTable: () => void;
}

const POSITION_MAP_2: Record<number, Position> = {
  1: 'bottom',
  2: 'top',
};

const POSITION_MAP_4: Record<number, Position> = {
  1: 'bottom',
  2: 'left',
  3: 'top',
  4: 'right',
};

function isPairGroup(group: OpenedTile[]): boolean {
  return group.length === 2;
}

function splitGroups(groups: OpenedTile[][]): {
  regular: OpenedTile[][];
  pairs: OpenedTile[][];
} {
  const regular: OpenedTile[][] = [];
  const pairs: OpenedTile[][] = [];
  for (const group of groups) {
    if (isPairGroup(group)) {
      pairs.push(group);
    } else {
      regular.push(group);
    }
  }
  return { regular, pairs };
}

const GameBoard = ({ actions, onBack, onShowTable }: GameBoardProps) => {
  const {
    gameState,
    currentAction,
    currentIndex,
    isPlaying,
    goToNext,
    goToPrev,
    togglePlayback,
    resetGame,
    players,
  } = useGameEngine(actions);


  const { showWinner, clearWinner, setOnDismiss } = useWinner();

  useEffect(() => {
    if (gameState.winner) {
      showWinner(gameState.winner);
    } else {
      clearWinner();
    }
  }, [gameState.winner, showWinner, clearWinner]);

  setOnDismiss(onBack);

  useEffect(() => {
    return () => clearWinner();
  }, [clearWinner]);

  const positionMap = players.length <= 2 ? POSITION_MAP_2 : POSITION_MAP_4;
  const is4Player = players.length > 2;

  const okeyTileId = gameState.okeyIndicator?.uniqueID ?? null;

  const getPlayerByPosition = (pos: Position) =>
    players.find((p) => positionMap[p.seat_index] === pos);

  const { regularGroupsByPos, pairGrids } = useMemo(() => {
    const regularByPos: Record<Position, OpenedTile[][]> = {
      top: [],
      left: [],
      right: [],
      bottom: [],
    };
    const pairsByPlayer: { name: string; pairs: OpenedTile[][] }[] = [];

    for (const player of players) {
      const pos = positionMap[player.seat_index];
      if (!pos) continue;
      const groups = gameState.centerTiles[player.user_id] || [];
      const { regular, pairs } = splitGroups(groups);
      regularByPos[pos] = regular;
      if (pairs.length > 0) {
        pairsByPlayer.push({ name: player.user_name, pairs });
      }
    }

    const half = Math.ceil(pairsByPlayer.length / 2);
    const group1 = pairsByPlayer.slice(0, half);
    const group2 = pairsByPlayer.slice(half);

    return {
      regularGroupsByPos: regularByPos,
      pairGrids: [
        {
          label: group1.map((p) => p.name).join(' / ') || '—',
          cells: computePairCells(group1.flatMap((p) => p.pairs)),
        },
        {
          label: group2.map((p) => p.name).join(' / ') || '—',
          cells: computePairCells(group2.flatMap((p) => p.pairs)),
        },
      ],
    };
  }, [gameState.centerTiles, players, positionMap]);

  const renderRack = (pos: Position) => {
    const player = getPlayerByPosition(pos);
    if (!player) return null;
    const tiles = gameState.playerTiles[player.seat_index] || [];
    const isActive = currentAction?.seat_index === player.seat_index;

    return (
      <PlayerRack
        key={player.seat_index}
        playerName={player.user_name}
        tiles={tiles}
        position={pos}
        isActive={isActive}
        okeyTileId={okeyTileId}
        seatIndex={player.seat_index}
      />
    );
  };

  const renderGrid = (pos: Position) => <PlayerOpeningGrid groups={regularGroupsByPos[pos]} />;



  return (
    <div className={`${styles.gameBoard} ${is4Player ? styles.gameBoard4p : styles.gameBoard2p}`}>
      
      <div className={styles.controls}>
        <PlaybackControls
          isPlaying={isPlaying}
          onToggle={togglePlayback}
          onNext={goToNext}
          onPrev={goToPrev}
          onReset={resetGame}
          onBack={onBack}
          onShowTable={() => { if (isPlaying) togglePlayback(); onShowTable(); }}
          currentAction={currentAction}
        />
      </div>

      

      
      <div className={styles.table}>
        
        <div className={styles.rackTop}>{renderRack('top')}</div>

        
        <div className={styles.middle}>
          {is4Player && <div className={styles.rackSide}>{renderRack('left')}</div>}

          
          <div className={styles.center}>
            <div className={styles.gridBlock}>
              <div className={styles.gridCell}>{renderGrid('top')}</div>
              <div className={styles.gridCell}>{renderGrid('right')}</div>
              <div className={styles.gridCell}>{renderGrid('left')}</div>
              <div className={styles.gridCell}>{renderGrid('bottom')}</div>
            </div>

            <div className={styles.discardCol}>
              <div className={styles.poolBadge}>
                {gameState.okeyIndicator && (
                  <div className={styles.poolOkey}>
                    <img
                      src={`/assets/images/tiles/${
                        ['', 'Yellow', 'Blue', 'Red', 'Black'][gameState.okeyIndicator.color]
                      }_${gameState.okeyIndicator.number}.png`}
                      alt="Okey"
                      className={styles.poolImg}
                      style={{ width: '2rem', height: 'auto', borderRadius: '0.1875rem' }} 
                    />
                  </div>
                )}
                <img
                  src="/assets/images/tiles/BackTiles.png"
                  alt="Pool"
                  className={styles.poolImg}
                />
                <span className={styles.poolCount}>{gameState.remainingTiles}</span>
              </div>
            </div>

            <div className={styles.pairArea}>
              <PairOpeningGrid cells={pairGrids[0].cells} label={pairGrids[0].label} />
              <PairOpeningGrid cells={pairGrids[1].cells} label={pairGrids[1].label} />
            </div>

            {players.map((player) => {
              const pos = positionMap[player.seat_index];
              if (!pos) return null;
              return (
                <DiscardStack
                  key={`discard-${player.seat_index}`}
                  tiles={gameState.discardPiles[player.seat_index] || []}
                  position={pos}
                />
              );
            })}
          </div>

          {is4Player && <div className={styles.rackSide}>{renderRack('right')}</div>}
        </div>

        <div className={styles.rackBottom}>{renderRack('bottom')}</div>
      </div>

      
      <ActionCounter currentIndex={currentIndex} totalActions={gameState.totalActions} />

      
    </div>
  );
};

export default GameBoard;
