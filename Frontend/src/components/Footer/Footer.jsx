const Footer = () => {
  return (
    <footer className="relative z-20 flex justify-center px-4 bg-[#041322]">
      <div className="container px-6 py-8 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-2xl">
        <h1 className="text-xl font-bold text-center lg:text-3xl animate-[bounce_1s_ease-in-out_infinite] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
          🌟 Get Your Daily Dose of Awesome! 🌈
        </h1>

        <div className="flex flex-col justify-center mx-auto mt-8 space-y-4 md:space-y-0 md:flex-row">
          <input
            id="email"
            type="text"
            className="px-6 py-3 text-gray-700 bg-white/80 backdrop-blur-lg border-2 border-purple-400 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-4 ring-purple-300/50 outline-none"
            placeholder="✨ Sprinkle some email magic here! ✨"
          />

          <button className="w-full px-8 py-3 text-base font-bold tracking-wider text-white transition-all duration-500 transform md:w-auto md:mx-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full hover:scale-110 hover:rotate-3 hover:shadow-[0_0_20px_rgba(255,105,180,0.5)] animate-[pulse_2s_infinite]">
            🚀 Blast Off to Awesomeness!
          </button>
        </div>

        <hr className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent border-none my-8" />

        <div className="flex flex-col items-center justify-between md:flex-row">
          <a
            href="#"
            className="transform hover:rotate-12 transition-transform duration-300 group"
          >
            <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 group-hover:animate-[pulse_1s_infinite]">
              CarverCraft
            </span>
          </a>

          <div className="flex mt-6 md:m-0">
            <div className="-mx-4">
              {["About", "Blog", "News", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 text-base font-medium text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110 inline-block hover:-rotate-6 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
