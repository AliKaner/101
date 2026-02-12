import { Fragment } from 'react';
import type { Tile, Position } from '../../types';
import TileComponent from '../TileComponent';
import styles from './PlayerRack.module.scss';

interface PlayerRackProps {
  playerName: string;
  tiles: Tile[];
  position: Position;
  isActive?: boolean;
  okeyTileId?: number | null;
  seatIndex: number;
}

function addGroupGaps(tiles: Tile[]): { tile: Tile; gapBefore: boolean }[] {
  const sorted = [...tiles].sort((a, b) => (a.x ?? 0) - (b.x ?? 0));
  return sorted.map((tile, i) => {
    if (i === 0) return { tile, gapBefore: false };
    const prevX = sorted[i - 1].x ?? 0;
    const currX = tile.x ?? 0;
    return { tile, gapBefore: currX - prevX > 1 };
  });
}

const PlayerRack = ({
  playerName,
  tiles,
  position,
  isActive = false,
  okeyTileId,
  seatIndex,
}: PlayerRackProps) => {
  const tilesWithGaps = addGroupGaps(tiles);

  const midPoint = Math.ceil(tilesWithGaps.length / 2);
  const topRow = tilesWithGaps.slice(0, midPoint);
  const bottomRow = tilesWithGaps.slice(midPoint);

  const tileSize = 'small';

  const renderRow = (row: typeof tilesWithGaps) =>
    row.map(({ tile, gapBefore }) => (
      <Fragment key={tile.uniqueID}>
        {gapBefore && <div className={styles.gap} />}
        <TileComponent
          tile={tile}
          isOkey={okeyTileId != null && tile.uniqueID === okeyTileId}
          size={tileSize}
        />
      </Fragment>
    ));

  return (
    <div
      className={`${styles.playerRack} ${styles[position]} ${isActive ? styles.active : ''}`}
    >
      <div className={styles.nameBadge}>
        <span className={styles.seat}>P{seatIndex}</span>
        <span className={styles.name}>{playerName}</span>
        <span className={styles.count}>{tiles.length}</span>
      </div>
      <div className={styles.rackContainer}>
        <div className={styles.tilesRow}>{renderRow(topRow)}</div>
        {bottomRow.length > 0 && (
          <div className={styles.tilesRow}>{renderRow(bottomRow)}</div>
        )}
      </div>
    </div>
  );
};

export default PlayerRack;
