
import type { OpenedTile } from '../../types';
import TileComponent from '../TileComponent';
import { computeGridCells } from '../../utils/gridUtils';
import styles from './PlayerOpeningGrid.module.scss';

interface PlayerOpeningGridProps {
  groups: OpenedTile[][];
}

const COLS = 13;
const ROWS = 7;

const PlayerOpeningGrid = ({ groups }: PlayerOpeningGridProps) => {
  const cells = computeGridCells(groups);

  const cellMap = new Map<string, (typeof cells)[0]>();
  cells.forEach((c) => cellMap.set(`${c.row}-${c.col}`, c));

  return (
    <div className={styles.openingGrid}>
      <div className={styles.table}>
        
        <div className={styles.header}>
          {Array.from({ length: COLS }, (_, i) => (
            <div key={i} className={styles.headerCell}>
              {i + 1}
            </div>
          ))}
        </div>

        
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className={styles.row}>
            {Array.from({ length: COLS }, (_, col) => {
              const cell = cellMap.get(`${row}-${col}`);
              return (
                <div
                  key={col}
                  className={`${styles.cell} ${cell ? styles.filled : ''}`}
                >
                  {cell && <TileComponent tile={cell.tile} size="tiny" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerOpeningGrid;
