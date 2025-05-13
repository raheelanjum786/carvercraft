import AboutUs from "./AboutUs";
import Footer from "../Footer/Footer";

const AboutUsPage = () => {
  return (
    <div className="bg-[#041322] relative overflow-hidden">
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 overflow-hidden animate-pulse">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-spin"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <div className="text-center text-white z-10 px-4 hover:scale-105 transition-all duration-300">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text hover:tracking-wider transition-all duration-500">
            Carvercraft Legacy
          </h1>
          <p className="text-[#E0A387] text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed hover:skew-x-6 transition-all duration-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum.
          </p>
        </div>
      </div>

      <AboutUs />

      <div className="py-24 px-4 bg-gradient-to-b from-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-8 hover:scale-110 transition-all duration-300">
            Join Our Groovy Community
          </h2>
          <p className="text-pink-300/80 mb-12 max-w-3xl mx-auto text-xl leading-relaxed hover:rotate-1 transition-all duration-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
            risus eget urna mollis ornare vel eu leo. Cras mattis consectetur
            purus sit amet fermentum.
          </p>

          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-pink-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-300 animate-bounce">
            Get Funky With Us!
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
