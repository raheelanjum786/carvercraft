const Navbar = () => {
  const navItems = ["Home", "Products", "About", "Contact"];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="group transition-all duration-300 ease-in-out 
                   w-[200px] hover:w-full 
                   rounded-full hover:rounded-none
                   bg-gray-800 text-white
                   p-4 mx-auto mt-2"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          </div>

          {/* Nav Items - Hidden when compressed, visible on hover */}
          <div className="hidden group-hover:flex items-center space-x-4 mx-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-white hover:text-gray-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <button className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
