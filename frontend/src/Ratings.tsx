import { useState, type MouseEvent } from "react";
import styles from "./rating.module.css";
import useGlobalState from "./context/useGlobalState";

export default function Ratings({ max = 5 }) {
   const { setRating, rating } = useGlobalState()
   const [hoverValue, setHoverValue] = useState(0);

   const handleMove = (i: number, e: MouseEvent<HTMLSpanElement>) => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const half = x < width / 2 ? 0.5 : 1;
      setHoverValue(i + half);
      console.log(i + half);
   };

   const handleClick = () => {
      setRating(hoverValue);
      
   }

   const display = hoverValue || rating;

   return (
      <div className={styles.wrapper}>
         {[...Array(max)].map((_, i) => {
            const fill =
               display >= i + 1
                  ? "full"
                  : display >= i + 0.5
                     ? "half"
                     : "empty";

            return (
               <span
                  key={i}
                  className={`${styles.star} ${styles[fill]}`}
                  onMouseMove={(e) => handleMove(i, e)}
                  onMouseLeave={() => setHoverValue(0)}
                  onClick={handleClick}
               >
                  ★
               </span>
            );
         })}
      </div>
   );
}