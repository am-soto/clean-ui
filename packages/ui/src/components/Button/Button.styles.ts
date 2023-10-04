import { BgColorsClass, Colors } from "../../constants";

export const ButtonStyles = ({ color = Colors.black }: { color?: string }) => {
  return `rounded-full w-10 h-10 ${
    color === "black" ? "text-white" : "text-black"
  } 
  ${
    BgColorsClass[color]
  } border-none transition-all transform active:rotate-180 active:scale-110`;
};

export const ButtonDeleteStyles =
  "flex items-center justify-center w-8 h-8 transition-all duration-100 ease-in-out scale-100 bg-white rounded-full hover:shadow-lg hover:border-black hover:scale-105";
