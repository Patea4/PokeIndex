'use client';

export interface SearchBarProps {
  searchState: string;
  setSearchStateAction: (query: string) => void;
}

export default function SearchBar({ searchState, setSearchStateAction }: SearchBarProps) {
  return (
    <input
      type="text"
      value={searchState}
      onChange={(e) => setSearchStateAction(e.target.value)}
      placeholder="Search Pokémon..."
      className="
        w-full max-w-xs p-2 rounded-full 
        border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-yellow-400 
        bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 
        placeholder-gray-500 dark:placeholder-gray-400
        shadow-sm
        transition-colors duration-300
      "
    />
  );
}
