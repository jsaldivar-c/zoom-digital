import { FacebookLogo, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer} data-screen-label="Footer">
      <span className={styles.brand}>ZOOM DIGITAL</span>
      <span>
        © {site.year} {site.kicker} {site.name}
      </span>
      <div className={styles.social}>
        <a
          className="btn btn-icon btn-ghost"
          href={site.facebook}
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
        >
          <FacebookLogo size={18} aria-hidden="true" />
        </a>
        <a
          className="btn btn-icon btn-ghost"
          href={site.whatsapp}
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
        >
          <WhatsappLogo size={18} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
