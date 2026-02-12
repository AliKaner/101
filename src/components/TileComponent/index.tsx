
import type { Tile as TileType } from '../../types';
import { getTileImagePath } from '../../utils/tileUtils';
import styles from './TileComponent.module.scss';

interface TileComponentProps {
  tile: TileType;
  isOkey?: boolean;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  highlighted?: boolean;
  showBack?: boolean;
}

const TileComponent = ({
  tile,
  isOkey = false,
  size = 'medium',
  highlighted = false,
  showBack = false,
}: TileComponentProps) => {
  const imagePath = showBack 
    ? '/src/assets/images/tiles/BackTiles.png' 
    : getTileImagePath(tile);

  return (
    <div
      className={`${styles.tile} ${styles[size]} ${highlighted ? styles.highlighted : ''} ${isOkey ? styles.okey : ''}`}
      title={`${tile.number} (ID: ${tile.uniqueID})`}
    >
      <img src={imagePath} alt={`Tile ${tile.number}`} draggable={false} />
      {isOkey && !showBack && <div className={styles.okeyBadge}>OKEY</div>}
    </div>
  );
};

export default TileComponent;
