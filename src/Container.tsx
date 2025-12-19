import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./container.module.css"
import Ratings from "./Ratings";


export default function Container({ dark }: { dark: boolean }) {
 const [page, setPage] = useState(1)
 const [index, setIndex] = useState(0)
 const [value, setValue] = useState(0);

 const { data, isPending, isError, error, fetchStatus } = useQuery({
  queryKey: ['jokes', page],
  queryFn: async () => {
   const response = await fetch(`https://icanhazdadjoke.com/search?page=${page}`, { headers: { 'Accept': 'application/json' } })
   if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
   }
   return await response.json()
  }
  , staleTime: Infinity,
 })

 const handlePost = () => {
  setValue(0)
  setIndex((prevState) => prevState + 1)
 }

 const renderButton = () => {
  if (value !== 0) {
   return <button className={styles.btn} onClick={handlePost}>Post Rating</button>
  }

  if (data.results.length - 1 === index) {
   return <button className={styles.btn} onClick={() => {
    setPage((prevState) => prevState + 1)
    setIndex(0)
   }}>Load More</button>
  }

  return <button className={styles.btn} onClick={() => setIndex((prevState) => prevState + 1)}>Next</button>
 }

 if (isPending) {
  return <div>Loading...</div>
 }

 if (isError) {
  console.log(error.message);
  return <div>Something went wrong please try again...</div>
 }

 if (fetchStatus === "paused") {
  return <div>Please try reconnecting to your internet and try again</div>
 }




 const { joke } = data.results[index]
 console.log(joke);

 return (
  <div className={styles.container}>
   <div >
    <p className={`${styles.joke} ${dark ? styles.dark : styles.light}`}>{joke}</p>
   </div>
   <Ratings value={value} setValue={setValue} />
   {renderButton()}
  </div>
 )
}
