import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/lib/site";
import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      className={`btn btn-primary ${styles.fab}`}
      href={site.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsappLogo size={26} aria-hidden="true" />
    </a>
  );
}
