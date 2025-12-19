import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ dark, setDark, }) {
 
 return (
  <button
   className={`${styles.toggle} ${dark ? styles.dark : ""}`}
   onClick={() => setDark(!dark)}
  >
   <span className={styles.iconSun}>☀️</span>
   <span className={styles.iconMoon}>🌙</span>
  </button>
 );
}