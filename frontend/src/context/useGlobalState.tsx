import { useContext } from "react"
import { AppContext } from "./AppContext"

export default function useGlobalState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useGlobal must be used within a AppProvider')
  }
  return context;
}
