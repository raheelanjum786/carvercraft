import debitcard from "../../assets/debitcard.png";
import lookHere from "../../assets/lookHere.png";
import Background from "../../content/ui/background";
const LandingPage = () => {
  return (
    <div className="relative h-screen w-full z-50">
      <Background />
      <div className="absolute left-0 bottom-0 -z-10 w-[20vw] h-[20vw] md:w-[200px] md:h-[200px] transform -translate-x-1/2 animate-bounce">
        <img
          src={debitcard}
          alt="Background"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute right-10 bottom-0  z-10 w-[20vw] h-[20vw] md:w-[400px] md:h-[400px] transform -translate-x-1/2 md:translate-x-0 md:translate-y-20 hover:scale-110 hover:duration-300 hover:ease-in">
        <img
          src={lookHere}
          alt="Background"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="absolute left-1/2 top-1/2 p-4 md:p-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-[2rem] md:rounded-[4rem] shadow-[0_0_2rem_1rem_rgba(147,51,234,0.3)] md:shadow-[0_0_3rem_2rem_rgba(147,51,234,0.3)] text-transparent bg-clip-text text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-poppins font-extrabold transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300 animate-pulse text-center">
        Carvercraft
      </h1>
      <div className="absolute left-1/2 top-1/2 w-[90vw] h-[70vh] md:w-[800px] md:h-[600px] transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-full h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-spin-slow"></div>
      </div>
    </div>
  );
};
export default LandingPage;
