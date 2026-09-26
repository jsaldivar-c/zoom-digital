import { reasons } from "@/lib/content";
import styles from "./Reasons.module.css";

export default function Reasons() {
  return (
    <section className={styles.band} data-screen-label="Por qué Zoom">
      <div className={styles.inner}>
        <h2 className={styles.title}>¿Por qué Zoom Digital?</h2>
        <ul className={styles.grid}>
          {reasons.map((reason) => (
            <li key={reason} className={styles.reason}>
              <span className={styles.mark} aria-hidden="true" />
              <p className={styles.text}>{reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
