
function Header() {
  return (
    <header className="w-full fixed top-0 z-50 bg-[#000000] h-[80px]">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 h-full">
        <div className="flex items-center justify-start w-full max-w-screen-xl h-full">
         <span
          className="self-center font-semibold whitespace-nowrap text-white"
          style={{ fontSize: '50px', lineHeight : '60px'}}
          >
            PokeIndex
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
