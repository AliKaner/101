export const ACTION_NAMES = {
  START_GAME: 'StartGame',
  DISTRIBUTED_TILES_PAIRS: 'DistributedTilesPairs',
  DISTRIBUTED_TILES: 'DistributedTiles',
  DISCARD_TILE: 'DiscardTile',
  DRAW_FROM_DISCARD: 'DrawFromDiscard',
  DRAW_FROM_MIDDLE: 'DrawFromMiddle',
  OPEN_SET: 'OpenSet',
  OPEN_SET_PAIRS: 'OpenSetPairs',
  MERGE_SET: 'MergeSet',
} as const;

export const ACTION_SOURCES = {
  GAME: 'Game',
  PLAYER: 'Player',
} as const;
