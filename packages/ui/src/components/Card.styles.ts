import { BgColorsClass, Colors } from "../constants";

export const CardStyles = ({ color = Colors.orange }: { color?: string }) =>
  `rounded-2xl w-[250px] p-4 text-black ${BgColorsClass[color]} border-none shadow-md min-h-[250px] flex flex-col`;
