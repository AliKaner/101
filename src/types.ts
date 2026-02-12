export interface Tile {
  uniqueID: number;
  number: number;
  color: number;
  isJoker: boolean;
  isOkey: boolean;
  x?: number;
}

export interface OpenedTile extends Tile {
  is_opened?: boolean;
  group_id: number;
  index?: number;
}

export interface GameAction {
  action_type_source: string;
  action_name: ActionName;
  tile: Tile | null;
  seat_index: number;
  user_id: string;
  user_name: string;
  action_time: string;
  tiles_after: Tile[] | null;
  series_opened: OpenedTile[][] | null;
  merged_tiles: OpenedTile[] | null;
  center_tiles?: Record<string, OpenedTile[][]>;
  penalty: unknown;
  series_open_score: number;
}

import { ACTION_NAMES } from './utils/constants';

export type ActionName = (typeof ACTION_NAMES)[keyof typeof ACTION_NAMES];

export interface Player {
  user_id: string;
  user_name: string;
  seat_index: number;
}

export interface PlayerState {
  player: Player;
  tiles: Tile[];
}

export interface GameState {
  players: Player[];
  playerTiles: Record<number, Tile[]>;
  centerTiles: Record<string, OpenedTile[][]>;
  discardPile: Tile[];
  discardPiles: Record<number, Tile[]>;
  currentActionIndex: number;
  totalActions: number;
  remainingTiles: number;
  winner: string | null;
  okeyIndicator: Tile | null;
}

export type Position = 'bottom' | 'top' | 'left' | 'right';

export const COLOR_MAP: Record<number, string> = {
  1: 'Yellow',
  2: 'Blue',
  3: 'Red',
  4: 'Black',
};

export const TOTAL_TILES = 106;
