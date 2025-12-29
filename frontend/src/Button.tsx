import type { MouseEvent } from "react";
import styles from './Button.module.css'
import usePostRating from "./queries/usePostRating";
import useGlobalState from "./context/useGlobalState";

interface ButtonProps {
  jokeId: string;
  pageTotal: number
}
export default function Button({ jokeId, pageTotal }: ButtonProps) {
  const { setRating, setIndex, setPageNumber, rating, index, user, isLoginModalOpen, setIsLoginModalOpen } = useGlobalState()
  const mutation = usePostRating()
  const isPending = mutation.isPending

  const handlePost = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!user) {
      setIsLoginModalOpen(true)
      return
    }
    mutation.mutate({
      user_id: user?.userId!,
      joke_id: jokeId,
      rating,
    })
    setRating(0)
    setIndex((prevState: number) => prevState + 1)
  }

  const handleClick = () => {
    setPageNumber((prevState: number) => prevState + 1)
    setIndex(0)
  }
  if (rating !== 0) {
    return <button className={styles.btn} onClick={handlePost}>Post Rating</button>
  }

  if (pageTotal === index) {
    return <button className={styles.btn} onClick={handleClick}>Load More</button>
  }

  return <button disabled={isPending} className={`${styles.btn} ${isPending && styles.disabled}`} onClick={() => setIndex((prevState) => prevState + 1)}>
    {isPending ? "Posting..." : "Next"}
  </button>
}
