export const TailwindCSSColors = {
  white: "#FFF",
  black: "#000",
  lime: "#bef264",
  blue: "#7dd3fc",
  red: "#fca5a5",
  orange: "#fcd34d",
};

type ColorEnum = keyof typeof TailwindCSSColors;

export const Colors: Record<ColorEnum, string> = {
  ...Object.keys(TailwindCSSColors).reduce((acc, key) => {
    acc[key as ColorEnum] = key;
    return acc;
  }, {} as Record<ColorEnum, string>),
};

// IMPORTANTE: añadir nuevas clases para nuevos colores de la constante `TailwindCSSColors`
export const BgColorsClass: {
  [key: string]: string;
} = {
  blue: "bg-blue",
  lime: "bg-lime",
  red: "bg-red",
  orange: "bg-orange",
  white: "bg-white",
  black: "bg-black",
};
