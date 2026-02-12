
import styles from './ActionCounter.module.scss';

interface ActionCounterProps {
  currentIndex: number;
  totalActions: number;
}

const ActionCounter = ({ currentIndex, totalActions }: ActionCounterProps) => {
  return (
    <div className={styles.actionCounter}>
      <span className={styles.current}>{currentIndex}</span>
      <span className={styles.separator}>/</span>
      <span className={styles.total}>{totalActions}</span>
    </div>
  );
};

export default ActionCounter;
