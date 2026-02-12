import styles from './GameSelector.module.scss';

const DECO_TILES = ['Yellow_1', 'Blue_2', 'Red_3', 'Black_4', 'Red_10', 'Blue_11'];

interface GameSelectorProps {
  onSelect: (file: string) => void;
}

const GameSelector = ({ onSelect }: GameSelectorProps) => (
  <div className={styles.selector}>
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          src="/assets/images/tiles/FakeOkey.png"
          alt="Okey Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Okey 101</h1>
      </div>

      <p className={styles.subtitle}>Oyun Geçmişi İzleyici</p>

      <div className={styles.decoration}>
        {DECO_TILES.map((t, i) => (
          <img
            key={i}
            src={`/assets/images/tiles/${t}.png`}
            className={styles.decoTile}
            alt=""
            style={{
              transform: `rotate(${Math.sin(i) * 10}deg) translateY(${Math.cos(i) * 5}px)`,
            }}
          />
        ))}
      </div>

      <div className={styles.buttons}>
        <button className={styles.btn} onClick={() => onSelect('/2_players.json')}>
          <span className={styles.btnIcon}>👥</span>
          <span className={styles.btnLabel}>2 Oyuncu</span>
          <span className={styles.btnDesc}>Baş başa oyun</span>
        </button>
        <button className={styles.btn} onClick={() => onSelect('/4_players.json')}>
          <span className={styles.btnIcon}>👥👥</span>
          <span className={styles.btnLabel}>4 Oyuncu</span>
          <span className={styles.btnDesc}>Dörtlü oyun</span>
        </button>
      </div>
    </div>
  </div>
);

export default GameSelector;
