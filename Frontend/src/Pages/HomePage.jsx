import AboutUs from "../components/AboutUs/AboutUs";
import Home from "../components/Home/Home";
import HomeProducts from "../components/HomeProducts/HomeProducts";
import CarouselProducts from "../components/HomeProducts/CrouselProducts";
import Footer from "../components/Footer/Footer";
import Navbar from "../content/Navbar/Navbar";
import ContactUs from "../components/Contact Us/ContactUs";

const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Home />
      <HomeProducts />
      <AboutUs />
      <CarouselProducts />

      <ContactUs />

      <Footer />
    </>
  );
};
export default HomePage;
