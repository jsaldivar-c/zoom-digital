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

// Fotos provisionales de licencia libre (Pexels License: uso comercial permitido,
// sin atribución obligatoria). Se sustituyen por el portafolio real del cliente.
// Licencia: https://www.pexels.com/license/
export const photos: Record<PhotoKey, Photo> = {
  heroA: {
    src: "/photos/hero-a.jpg",
    alt: "Retrato en blanco y negro de una pareja de novios abrazados",
    width: 1062,
    height: 1600,
    credit: {
      author: "Anastasia Nagibina",
      sourceUrl: "https://www.pexels.com/photo/31439868/",
      license: "Pexels",
    },
  },
  heroB: {
    src: "/photos/hero-b.jpg",
    alt: "Silueta de una joven con vestido de gala en un balcón al atardecer",
    width: 1280,
    height: 1600,
    credit: {
      author: "Jamil Martinez",
      sourceUrl: "https://www.pexels.com/photo/31941219/",
      license: "Pexels",
    },
  },
  heroC: {
    src: "/photos/hero-c.jpg",
    alt: "Pareja de novios en silueta en un pasillo antiguo con luz cálida",
    width: 1600,
    height: 1067,
    credit: {
      author: "Luis Becerra Fotógrafo",
      sourceUrl: "https://www.pexels.com/photo/5931515/",
      license: "Pexels",
    },
  },
  g1: {
    src: "/photos/g1.jpg",
    alt: "Joven con vestido de gala dorado girando frente a un edificio histórico",
    width: 1067,
    height: 1600,
    credit: {
      author: "Luis Becerra Fotógrafo",
      sourceUrl: "https://www.pexels.com/photo/5824378/",
      license: "Pexels",
    },
  },
  g2: {
    src: "/photos/g2.jpg",
    alt: "Novios en silueta de pie junto a un ventanal",
    width: 1600,
    height: 1067,
    credit: {
      author: "The Visionary Vows",
      sourceUrl: "https://www.pexels.com/photo/37331192/",
      license: "Pexels",
    },
  },
  g3: {
    src: "/photos/g3.jpg",
    alt: "Retrato de estudio de una mujer embarazada con vestido azul de lentejuelas",
    width: 1067,
    height: 1600,
    credit: {
      author: "Amreet Pandey",
      sourceUrl: "https://www.pexels.com/photo/24863434/",
      license: "Pexels",
    },
  },
  g4: {
    src: "/photos/g4.jpg",
    alt: "Manos de los novios con sus anillos sobre un ramo de rosas amarillas",
    width: 1600,
    height: 1060,
    credit: {
      author: "Juris Freidenfelds",
      sourceUrl: "https://www.pexels.com/photo/7816258/",
      license: "Pexels",
    },
  },
  g5: {
    src: "/photos/g5.jpg",
    alt: "Pareja de novios abrazados de noche bajo una lámpara de luz cálida",
    width: 1095,
    height: 1600,
    credit: {
      author: "Paula Rodriguez",
      sourceUrl: "https://www.pexels.com/photo/37457861/",
      license: "Pexels",
    },
  },
  g6: {
    src: "/photos/g6.jpg",
    alt: "Mujer embarazada recostada sobre un vestido de tul morado",
    width: 1600,
    height: 1067,
    credit: {
      author: "Amreet Pandey",
      sourceUrl: "https://www.pexels.com/photo/25471469/",
      license: "Pexels",
    },
  },
  g7: {
    src: "/photos/g7.jpg",
    alt: "Joven sonriendo con una bengala de cumpleaños en una mesa de fiesta",
    width: 1067,
    height: 1600,
    credit: {
      author: "César O'neill",
      sourceUrl: "https://www.pexels.com/photo/34524983/",
      license: "Pexels",
    },
  },
  g8: {
    src: "/photos/g8.jpg",
    alt: "Velas encendidas sobre un pastel de cumpleaños en la oscuridad",
    width: 1067,
    height: 1600,
    credit: {
      author: "Shuvalova Natalia",
      sourceUrl: "https://www.pexels.com/photo/15211704/",
      license: "Pexels",
    },
  },
};
