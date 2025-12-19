import { useState } from 'react';
import Container from './Container'
import styles from './main.module.css'
import ThemeToggle from './ThemeToggle'
import LoginModal from './LoginModal';
const getTheme = () => {
  const theme = localStorage.getItem("theme")
  if (!theme) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return localStorage.getItem("theme") === "dark"
}

function App() {
  const [dark, setDark] = useState(getTheme());
  localStorage.setItem("theme", dark ? "dark" : "light")
  return (
    <main className={`${styles.main} ${dark ? styles.dark : ""}`}>
      <ThemeToggle dark={dark} setDark={setDark} />
      <Container dark={dark} />
      {/* <LoginModal onClose={false}  /> */}
    </main>
  )
}

export default App
