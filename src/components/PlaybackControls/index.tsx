
import type { GameAction } from '../../types';
import { getActionLabel } from '../../utils/tileUtils';
import styles from './PlaybackControls.module.scss';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onBack: () => void;
  currentAction: GameAction | null;
}

const PlaybackControls = ({
  isPlaying,
  onToggle,
  onNext,
  onPrev,
  onReset,
  onBack,
  currentAction,
}: PlaybackControlsProps) => {
  return (
    <div className={styles.playbackControls}>
      <button
        onClick={onBack}
        className={`${styles.btn} ${styles.btnReset}`}
        title="Menüye Dön"
        style={{ marginRight: 8 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>

      <div className={styles.divider}></div>

      <div className={styles.actions}>
        <button className={styles.btn} onClick={onPrev} title="Önceki Hamle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onToggle}
          title={isPlaying ? 'Durdur' : 'Devam Et'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button className={styles.btn} onClick={onNext} title="Sonraki Hamle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      <div className={styles.divider}></div>

      <button
        onClick={onReset}
        className={`${styles.btn} ${styles.btnReset}`}
        title="Başa Dön"
      >
        ↺
      </button>
      {currentAction && (
        <div className={styles.actionInfo}>
          <span className={styles.actionPlayer}>
            {currentAction.user_name || 'Sistem'}
          </span>
          <span className={styles.actionName}>
            {getActionLabel(currentAction.action_name)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PlaybackControls;
