import { useState, type ReactNode } from "react"
import { AppContext } from "./AppContext"
import type { TFormType } from "../types/types"


type AppProviderProps = {
  children: ReactNode
}
const isDefaultTheme = () => {
  const theme = localStorage.getItem("theme")
  if (!theme) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return localStorage.getItem("theme") === "dark"
}

export default function AppProvider({ children }: AppProviderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(isDefaultTheme())
  const [pageNumber, setPageNumber] = useState(1)
  const [index, setIndex] = useState(0)
  const [rating, setRating] = useState(0);
  const [mode, setMode] = useState<TFormType>('login')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light")

  const values = {
    isDarkTheme,
    pageNumber,
    index,
    rating,
    isLoginModalOpen,
    mode,
    setMode,
    setIsLoginModalOpen,
    setIsDarkTheme,
    setPageNumber,
    setIndex,
    setRating,
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}
