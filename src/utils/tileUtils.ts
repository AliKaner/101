import type { Tile } from '../types';
import { COLOR_MAP } from '../types';

export function getTileImagePath(tile: Tile): string {
  if (tile.isJoker) {
    return '/src/assets/images/tiles/FakeOkey.png';
  }
  const colorName = COLOR_MAP[tile.color] || 'Red';
  return `/src/assets/images/tiles/${colorName}_${tile.number}.png`;
}

export function getTileBackImagePath(): string {
  return '/src/assets/images/tiles/BackTiles.png';
}

export function getActionLabel(actionName: string): string {
  switch (actionName) {
    case 'StartGame':
      return 'Oyun Başladı';
    case 'DistributedTilesPairs':
      return 'Taşlar Dağıtıldı (Çiftler)';
    case 'DistributedTiles':
      return 'Taşlar Dizildi';
    case 'DiscardTile':
      return 'Taş Attı';
    case 'DrawFromDiscard':
      return 'Atılandan Çekti';
    case 'DrawFromMiddle':
      return 'Ortadan Çekti';
    case 'OpenSet':
      return 'Seri Açtı';
    case 'OpenSetPairs':
      return 'Çift Açtı';
    case 'MergeSet':
      return 'Seriye Ekledi';
    default:
      return actionName;
  }
}
