import styles from './App.module.css'
import ThemeToggle from './ThemeToggle'
import useGlobalState from './context/useGlobalState';
import CardContainer from './CardContainer';
import AuthForm from './AuthForm';
import type { TFormType } from './types/types';



function App() {
  const { isDarkTheme, isLoginModalOpen, setIsLoginModalOpen, setMode } = useGlobalState()
  const handleClick = (mode: TFormType) => {
    setMode(mode)
    setIsLoginModalOpen(true)
  }


  return (
    <main className={`${styles.main} ${isDarkTheme && styles.dark}`}>
      <div className={styles.toggle}>
        <button className={styles.loginBtn} onClick={() => handleClick("login")}>Login</button> / <button className={styles.loginBtn} onClick={() => handleClick("register")}>Signup</button>
      </div>

      <ThemeToggle />
      <CardContainer />
      {isLoginModalOpen && <AuthForm />}
    </main >
  )
}

export default App
