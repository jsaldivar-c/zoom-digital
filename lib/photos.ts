export type PhotoKey =
  | "heroA"
  | "heroB"
  | "heroC"
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6"
  | "g7"
  | "g8";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: {
    author: string;
    sourceUrl: string;
    license: "Unsplash" | "Pexels" | "CC0";
  };
};

// TEMPORAL (paso 3): entradas de relleno para que el tipo compile.
// El paso 5 las reemplaza por las fotos reales con autor, URL de origen y licencia.
const placeholder = (src: string, alt: string): Photo => ({
  src,
  alt,
  width: 1200,
  height: 1500,
  credit: { author: "", sourceUrl: "", license: "CC0" },
});

export const photos: Record<PhotoKey, Photo> = {
  heroA: placeholder("/photos/hero-a.jpg", "Foto de boda"),
  heroB: placeholder("/photos/hero-b.jpg", "Foto de XV años"),
  heroC: placeholder("/photos/hero-c.jpg", "Foto de evento"),
  g1: placeholder("/photos/g1.jpg", "XV años"),
  g2: placeholder("/photos/g2.jpg", "XV años"),
  g3: placeholder("/photos/g3.jpg", "XV años"),
  g4: placeholder("/photos/g4.jpg", "Sesión"),
  g5: placeholder("/photos/g5.jpg", "XV años"),
  g6: placeholder("/photos/g6.jpg", "Boda"),
  g7: placeholder("/photos/g7.jpg", "XV años"),
  g8: placeholder("/photos/g8.jpg", "Cumpleaños"),
};
