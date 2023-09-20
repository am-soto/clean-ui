export const SearchBar = ({
  onValueChange = () => {},
}: {
  onValueChange?: (value: string) => void;
}) => (
  <div className="relative flex items-center mt-2">
    <span className="absolute">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2.5"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </span>

    <input
      type="email"
      placeholder="Buscar"
      className="block w-full p-2.5 text-gray-700 placeholder-gray-400/70 bg-white rounded-lg pl-11 pr-5 "
      onChange={(event) => onValueChange(event.target.value)}
    />
  </div>
);
