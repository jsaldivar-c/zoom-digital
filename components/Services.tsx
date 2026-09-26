import type { Icon } from "@phosphor-icons/react/lib";
import {
  BookOpen,
  CalendarHeart,
  Camera,
  SlidersHorizontal,
  Usb,
  VideoCamera,
} from "@phosphor-icons/react/ssr";
import { services } from "@/lib/content";
import styles from "./Services.module.css";

const icons: Record<string, Icon> = {
  camera: Camera,
  "video-camera": VideoCamera,
  "calendar-heart": CalendarHeart,
  "book-open": BookOpen,
  usb: Usb,
  "sliders-horizontal": SlidersHorizontal,
};

export default function Services() {
  return (
    <section id="servicios" className={styles.section} data-screen-label="Servicios">
      <span className={styles.kicker}>Servicios</span>
      <h2 className={styles.title}>Todo lo que necesitas para tu gran día</h2>
      <ul className={styles.list}>
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <li key={service.title} className={styles.item}>
              <Icon
                size={26}
                weight="light"
                aria-hidden="true"
                className={styles.icon}
              />
              <h3 className={styles.itemTitle}>{service.title}</h3>
              <p className={styles.copy}>{service.copy}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
