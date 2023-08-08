import { Colors } from "../types";

export const CardStyles = ({ color = Colors.ORANGE }: { color?: Colors }) =>
  `rounded-2xl w-[250px] p-4 text-black bg-${color} border-none shadow-md h-[250px]`;
