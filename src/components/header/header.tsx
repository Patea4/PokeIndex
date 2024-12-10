
function Header() {
  return (
    <header className="w-full fixed top-0 z-50 bg-[#000000] h-[80px]">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 h-25">
        <div className="flex items-center justify-start w-full max-w-screen-xl">
         <span
          className="self-center font-semibold whitespace-nowrap dark:text-white"
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
