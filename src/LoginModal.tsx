import styles from "./LoginModal.module.css";

export default function LoginModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Login</h2>

        <div className={styles.field}>
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className={styles.loginBtn}>Login</button>

        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}