import { LoaderCircle } from 'lucide-react';
import useJokesQuery from './queries/useJokesQuery';
import ErrorModal from './ErrorModal';
import styles from "./CardContainer.module.css"
import useGlobalState from './context/useGlobalState';
import JokeCard from './JokeCard';
import Ratings from './Ratings';
import Button from './Button';

export default function CardContainer() {
  const { pageNumber, isDarkTheme, index } = useGlobalState()
  const { data, isError, isPending, error, fetchStatus } = useJokesQuery(pageNumber)

  if (isPending) {
    return <div className={`${styles.loadingContainer} ${isDarkTheme && styles.darkSpinner}`}>
      <LoaderCircle size={70} className={styles.spin} />
      <span className={styles.loadingText} >Loading Jokes</span>
    </div>
  }

  if (isError) {
    console.log(error);
    return <ErrorModal title='Error' message="Something went wrong please try again later!" />
  }

  if (fetchStatus === "paused") {
    return <ErrorModal title='Error' message="Please try reconnecting to the internet and try again" />
  }

  const { joke, id } = data.results[index]
  const pageTotal = data.results.length - 1
  
  return <div className={styles.container}>
    <JokeCard joke={joke} isDarkTheme={isDarkTheme} />
    <Ratings max={5} />
    <Button jokeId={id} pageTotal={pageTotal} />
  </div>
}
