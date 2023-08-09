import { BgColorsClass, Colors } from "../constants";

export const ButtonStyles = ({ color = Colors.black }: { color?: string }) => {
  return `rounded-full w-10 h-10 ${
    color === "black" ? "text-white" : "text-black"
  } 
  ${BgColorsClass[color]} border-none`;
};
