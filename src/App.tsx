import styles from './App.module.css'
import ThemeToggle from './ThemeToggle'
import LoginModal from './LoginModal';
import useGlobalState from './context/useGlobalState';
import CardContainer from './CardContainer';


function App() {
  const { isDarkTheme, isLoginModalOpen } = useGlobalState()

  return (
    <main className={`${styles.main} ${isDarkTheme && styles.dark}`}>
      <ThemeToggle />
      <CardContainer />
      {isLoginModalOpen && <LoginModal />}
    </main>
  )
}

export default App
