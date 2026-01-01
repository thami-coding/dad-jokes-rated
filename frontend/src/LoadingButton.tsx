import styles from "./LoadingButton.module.css"

export default function LoadingButton() {
  return (
    <div className={styles.loading}>
      Loading
      <span className={styles.dots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </div>
  );
};