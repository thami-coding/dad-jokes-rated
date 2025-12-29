import styles from "./JokeCard.module.css"
interface JokeCardProps {
  joke: string,
  isDarkTheme: boolean
}
export default function JokeCard({ joke, isDarkTheme }: JokeCardProps) {
  return (
    <p className={`${styles.joke} ${isDarkTheme ? styles.dark : styles.light}`}>{joke}</p>
  )
}
