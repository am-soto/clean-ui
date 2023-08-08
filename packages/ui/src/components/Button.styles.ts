import { Colors } from "../types";

export const ButtonStyles = ({ color = Colors.BLACK }: { color?: Colors }) =>
  `rounded-full w-10 h-10 ${
    color === Colors.BLACK ? "text-white" : "text-black"
  } bg-${color} border-none`;
