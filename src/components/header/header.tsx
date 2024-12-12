'use client';

import SearchBar, { SearchBarProps } from "../SearchBar/SearchBar";

interface HeaderProps extends SearchBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Header({ searchState, setSearchStateAction, isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="
      w-full fixed top-0 z-50 
      bg-gradient-to-r from-purple-800 via-pink-600 to-red-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
      h-20 
      flex items-center justify-between 
      px-8 shadow-md transition-colors duration-300
    ">
      <span
        className="font-bold tracking-widest text-white dark:text-gray-100"
        style={{ fontSize: '40px', lineHeight: '50px' }}
      >
        PokeIndex
      </span>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="
            p-2 rounded-full 
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-200
            hover:shadow-md transition
          "
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
        <div className="flex items-center justify-end w-full max-w-sm">
          <SearchBar searchState={searchState} setSearchStateAction={setSearchStateAction} />
        </div>
      </div>
    </header>
  );
}

export default Header;
