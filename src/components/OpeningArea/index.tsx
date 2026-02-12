
import type { OpenedTile, Player, Tile } from '../../types';
import TileComponent from '../TileComponent';
import styles from './OpeningArea.module.scss';

interface OpeningAreaProps {
  centerTiles: Record<string, OpenedTile[][]>;
  players: Player[];
  remainingTiles: number;
  discardPile: Tile[];
}

const OpeningArea = ({
  centerTiles,
  players,
  remainingTiles,
  discardPile,
}: OpeningAreaProps) => {
  const playerIdToName = (userId: string) => {
    const p = players.find((pl) => pl.user_id === userId);
    return p?.user_name ?? userId;
  };

  const hasOpenedTiles = Object.values(centerTiles).some((groups) => groups.length > 0);

  return (
    <div className={styles.openingArea}>
      <div className={styles.header}>
        <div className={styles.pool}>
          <img
            src="/src/assets/images/tiles/BackTiles.png"
            alt="Pool"
            className={styles.poolImg}
          />
          <span className={styles.poolCount}>{remainingTiles}</span>
        </div>
        {discardPile.length > 0 && (
          <div className={styles.discard}>
            <span className={styles.discardLabel}>Son Atılan</span>
            <TileComponent tile={discardPile[discardPile.length - 1]} size="medium" />
          </div>
        )}
      </div>

      {hasOpenedTiles && (
        <div className={styles.grid}>
          {Object.entries(centerTiles).map(([userId, groups]) => {
            if (groups.length === 0) return null;
            return (
              <div key={userId} className={styles.playerSection}>
                <div className={styles.playerLabel}>{playerIdToName(userId)}</div>
                <div className={styles.groups}>
                  {groups.map((group, gIdx) => {
                    const isPair = group.length <= 2;
                    return (
                      <div
                        key={gIdx}
                        className={`${styles.group} ${isPair ? styles.groupPair : ''}`}
                      >
                        {group.map((tile) => (
                          <TileComponent key={tile.uniqueID} tile={tile} size="small" />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OpeningArea;
