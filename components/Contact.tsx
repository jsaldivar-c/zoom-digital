import {
  FacebookLogo,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contacto" className={styles.section} data-screen-label="Contacto">
      <div className={styles.rule} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.pitch}>
          <h2 className={styles.title}>Hagamos juntos el recuerdo de tu vida</h2>
          <p className={styles.lead}>
            ¿Ya tienes fecha? Cuéntanos tu evento y armamos un paquete para ti.
          </p>
          <div>
            <a
              className={`btn btn-primary ${styles.cta}`}
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
            >
              <WhatsappLogo size={22} aria-hidden="true" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
        <div className={styles.details}>
          <a
            className={styles.row}
            href={site.whatsapp}
            target="_blank"
            rel="noopener"
          >
            <Phone size={20} aria-hidden="true" className={styles.icon} />
            <span>{site.phoneLabel}</span>
          </a>
          <a
            className={styles.row}
            href={site.facebook}
            target="_blank"
            rel="noopener"
          >
            <FacebookLogo size={20} aria-hidden="true" className={styles.icon} />
            <span>Estudio Fotográfico Zoom Digital</span>
          </a>
          <a
            className={styles.row}
            href={site.maps}
            target="_blank"
            rel="noopener"
          >
            <MapPin size={20} aria-hidden="true" className={styles.icon} />
            <span>
              {site.address}
              <br />
              <span className={styles.mapLink}>Ver en Google Maps</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
