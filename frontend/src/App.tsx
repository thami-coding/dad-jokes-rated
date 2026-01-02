import styles from './App.module.css'
import ThemeToggle from './ThemeToggle'
import useGlobalState from './context/useGlobalState';
import CardContainer from './CardContainer';
import AuthForm from './AuthForm';
import LoginLinks from './LoginLinks';



function App() {
  const { isDarkTheme, isLoginModalOpen} = useGlobalState()
 
  return (
    <main className={`${styles.main} ${isDarkTheme && styles.dark}`}>
      <LoginLinks />

      <ThemeToggle />
      <CardContainer />
      {isLoginModalOpen && <AuthForm />}
    </main >
  )
}

export default App
