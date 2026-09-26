import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <nav className={`nav ${styles.header}`} data-screen-label="Header">
      <a href="#inicio" className={`nav-brand ${styles.brand}`}>
        <span className={styles.kicker}>{site.kicker}</span>
        <span className={styles.name}>ZOOM DIGITAL</span>
      </a>
      <div className={styles.actions}>
        <div className={styles.links}>
          <a href="#servicios">Servicios</a>
          <a href="#galeria">Galería</a>
          <a href="#contacto">Contacto</a>
        </div>
        <a
          className="btn btn-primary"
          href={site.whatsapp}
          target="_blank"
          rel="noopener"
        >
          <WhatsappLogo size={16} aria-hidden="true" />
          Agendar por WhatsApp
        </a>
      </div>
    </nav>
  );
}
