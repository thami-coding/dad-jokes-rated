import { useState } from "react";
import styles from "./rating.module.css";

export default function Rating({ max = 5, value,setValue }) {
 const [hoverValue, setHoverValue] = useState(0);


 const handleMove = (i, e) => {
  const { left, width } = e.target.getBoundingClientRect();
  const x = e.clientX - left;
  const half = x < width / 2 ? 0.5 : 1;
  setHoverValue(i + half);
 };

 const handleClick = () => setValue(hoverValue);

 const display = hoverValue || value;

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