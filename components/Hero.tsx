import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";
import styles from "./Hero.module.css";

const collageSizes = "(min-width: 1280px) 340px, (min-width: 834px) 45vw, 90vw";

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero} data-screen-label="Hero">
      <div className={styles.copy}>
        <h1 className={styles.title}>
          Capturamos los momentos que no se repiten
        </h1>
        <p className={styles.subtitle}>
          Fotografía y video profesional para bodas, XV años y eventos
        </p>
        <div className={styles.actions}>
          <a
            className={`btn btn-primary ${styles.cta}`}
            href={site.whatsapp}
            target="_blank"
            rel="noopener"
          >
            <WhatsappLogo size={18} aria-hidden="true" />
            Agenda tu sesión
          </a>
          <a className={`btn btn-ghost ${styles.cta}`} href="#servicios">
            Ver paquetes
          </a>
          <a className={`btn btn-ghost ${styles.cta}`} href="#galeria">
            Ver galería
          </a>
        </div>
      </div>

      <div className={`lighten ${styles.collage}`}>
        <div className={`${styles.slot} ${styles.tall}`}>
          <Image
            src={photos.heroA.src}
            alt={photos.heroA.alt}
            fill
            sizes={collageSizes}
            preload
            className={styles.photo}
          />
        </div>
        <div className={styles.slot}>
          <Image
            src={photos.heroB.src}
            alt={photos.heroB.alt}
            fill
            sizes={collageSizes}
            className={styles.photo}
          />
        </div>
        <div className={styles.slot}>
          <Image
            src={photos.heroC.src}
            alt={photos.heroC.alt}
            fill
            sizes={collageSizes}
            className={styles.photo}
          />
        </div>
      </div>
    </section>
  );
}
