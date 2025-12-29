import useGlobalState from "./context/useGlobalState";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
    const {isDarkTheme,setIsDarkTheme} = useGlobalState()
 
 return (
  <button
   className={`${styles.toggle} ${isDarkTheme ? styles.dark : ""}`}
   onClick={() => setIsDarkTheme(!isDarkTheme)}
  >
   <span className={styles.iconSun}>☀️</span>
   <span className={styles.iconMoon}>🌙</span>
  </button>
 );
}