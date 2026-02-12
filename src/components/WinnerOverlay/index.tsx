import type { CSSProperties } from 'react';
import { useWinner } from '../../context/WinnerContext';
import styles from './WinnerOverlay.module.scss';

const WinnerOverlay = () => {
  const { winnerName, onDismiss } = useWinner();

  if (!winnerName) return null;

  return (
    <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.backdrop} />
      <div className={styles.content}>
        <div className={styles.glow} />
        <span className={styles.trophy}>🏆</span>
        <span className={styles.text}>{winnerName} kazandı!</span>
        <div className={styles.confetti}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className={styles.confettiPiece}
              style={{
                '--delay': `${Math.random() * 1.5}s`,
                '--x': `${Math.random() * 200 - 100}px`,
                '--rot': `${Math.random() * 720 - 360}deg`,
                '--color': ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#BB8FCE'][i % 6],
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnerOverlay;
