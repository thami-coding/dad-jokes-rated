import styles from './ErrorModal.module.css';
import type { ErrorCardProps } from './types/types';

export default function ErrorModal({
 title,
 message
}: ErrorCardProps) {
 if (!message) return null;

 return (
  <div className={styles.wrapper} role="alert">
   <div className={styles.icon} aria-hidden>
    !
   </div>
   <div className={styles.content}>
    <p className={styles.title}>{title}</p>
    <p className={styles.message}>{message}</p>
   </div>
  </div>
 );
}