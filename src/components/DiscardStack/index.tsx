
import type { Tile } from '../../types';
import type { Position } from '../../types';
import TileComponent from '../TileComponent';
import styles from './DiscardStack.module.scss';

interface DiscardStackProps {
  tiles: Tile[];
  position: Position;
}

const DiscardStack = ({ tiles, position }: DiscardStackProps) => {
  if (tiles.length === 0) {
    return (
      <div className={`${styles.discardStack} ${styles[position]}`}>
        <div className={styles.placeholder}>XXX</div>
      </div>
    );
  }

  const visibleTiles = tiles.slice(-3);

  return (
    <div className={`${styles.discardStack} ${styles[position]}`}>
      {visibleTiles.map((tile, i) => (
        <div key={`${tile.uniqueID}-${i}`} className={styles.tile}>
          <TileComponent tile={tile} size="medium" />
        </div>
      ))}
    </div>
  );
};

export default DiscardStack;
