import useGlobalState from "./context/useGlobalState";
import styles from "./LoginModal.module.css";

export default function LoginModal() {
  const { setIsLoginModalOpen, setRating } = useGlobalState()

  const handleClick = () => {
    setRating(0)
    setIsLoginModalOpen(false)
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Login to Rate Jokes</h3>

        <div className={styles.field}>
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className={styles.loginBtn}>Login</button>

        <button className={styles.close} onClick={handleClick}>
          ✕
        </button>
      </div>
    </div>
  );
}