import Image from "next/image";
import { gallery } from "@/lib/content";
import { photos } from "@/lib/photos";
import styles from "./Gallery.module.css";

const sizes = "(min-width: 1280px) 350px, (min-width: 600px) 45vw, 100vw";

export default function Gallery() {
  return (
    <section id="galeria" className={styles.section} data-screen-label="Galería">
      <span className={styles.kicker}>Galería</span>
      <h2 className={styles.title}>
        Bodas, XV años y los detalles de cada historia
      </h2>
      <ul className={`lighten ${styles.grid}`}>
        {gallery.map((item) => {
          const photo = photos[item.photo];
          return (
            <li
              key={item.id}
              className={`${styles.slot} ${item.rows === 2 ? styles.tall : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={sizes}
                className={styles.photo}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
