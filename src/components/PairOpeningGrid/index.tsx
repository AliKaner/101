
import TileComponent from '../TileComponent';
import styles from './PairOpeningGrid.module.scss';
import { type GridCell as PairGridCell } from '../../utils/gridUtils';

export type { PairGridCell };

interface PairOpeningGridProps {
  cells: PairGridCell[];
  label?: string;
}

const PAIR_ROWS = 13;
const PAIR_COLS = 3;

const PairOpeningGrid = ({ cells }: PairOpeningGridProps) => {
  const cellMap = new Map<string, PairGridCell>();
  cells.forEach((c) => cellMap.set(`${c.row}-${c.col}`, c));

  return (
    <div className={styles.pairGrid}>
      <div className={styles.table}>
        {Array.from({ length: PAIR_ROWS }, (_, row) => (
          <div key={row} className={styles.row}>
            <div className={styles.rowLabel}>{row + 1}</div>
            {Array.from({ length: PAIR_COLS }, (_, col) => {
              const cell = cellMap.get(`${row}-${col}`);
              return (
                <div
                  key={col}
                  className={`${styles.cell} ${cell ? styles.filled : ''}`}
                >
                  {cell && (
                    <TileComponent 
                      tile={cell.tile} 
                      size="tiny" 
                      showBack={cell.tile.isOkey} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PairOpeningGrid;
