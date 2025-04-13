import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AboutUs from "../components/AboutUs/AboutUs";
import Home from "../components/Home/Home";
import HomeProducts from "../components/HomeProducts/HomeProducts";
import CarouselProducts from "../components/HomeProducts/CrouselProducts";
import Footer from "../components/Footer/Footer";
import Navbar from "../content/Navbar/Navbar";
import ContactUs from "../components/Contact Us/ContactUs";

const HomePage = () => {
  useEffect(() => {
    // Register the ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);

    // Set up smooth scrolling for all anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: href,
            offsetY: 0,
          },
          ease: "power3.inOut",
        });
      }
    };

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", handleAnchorClick);
    });

    // Clean up function
    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return (
    <>
      <Navbar />
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
