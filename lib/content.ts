import type { PhotoKey } from "@/lib/photos";

export type Service = { icon: string; title: string; copy: string };

export const services: Service[] = [
  {
    icon: "camera",
    title: "Fotografía de estudio",
    copy: "Retratos y sesiones con iluminación profesional.",
  },
  {
    icon: "video-camera",
    title: "Videografía profesional",
    copy: "Tu evento contado en video, de la ceremonia a la fiesta.",
  },
  {
    icon: "calendar-heart",
    title: "Sesión previa (Save the Date)",
    copy: "Fotos antes del gran día para anunciar tu fecha.",
  },
  {
    icon: "book-open",
    title: "Álbum con tus fotos más especiales",
    copy: "Una selección impresa de los mejores momentos.",
  },
  {
    icon: "usb",
    title: "USB con estuche de lujo",
    copy: "Tus recuerdos digitales, bien guardados.",
  },
  {
    icon: "sliders-horizontal",
    title: "Paquetes 100% personalizados",
    copy: "Elige los servicios que necesitas para tu evento.",
  },
];

export const reasons: string[] = [
  "Paquetes a tu medida",
  "Entrega en estuche de lujo",
  "Años de experiencia en bodas y XV años",
  "Atención personalizada de principio a fin",
];

export type GalleryItem = {
  id: string;
  photo: PhotoKey;
  label: string;
  rows: 1 | 2;
};

export const gallery: GalleryItem[] = [
  { id: "g1", photo: "g1", label: "XV años", rows: 2 },
  { id: "g2", photo: "g2", label: "Boda", rows: 1 },
  { id: "g3", photo: "g3", label: "Sesión", rows: 2 },
  { id: "g4", photo: "g4", label: "Boda", rows: 1 },
  { id: "g5", photo: "g5", label: "Boda", rows: 2 },
  { id: "g6", photo: "g6", label: "Sesión", rows: 1 },
  { id: "g7", photo: "g7", label: "Cumpleaños", rows: 2 },
  { id: "g8", photo: "g8", label: "Cumpleaños", rows: 1 },
];
