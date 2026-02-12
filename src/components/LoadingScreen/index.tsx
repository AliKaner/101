import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => (
  <div className={styles.loading}>
    <div className={styles.spinner} />
    <p>Oyun yükleniyor...</p>
  </div>
);

export default LoadingScreen;
