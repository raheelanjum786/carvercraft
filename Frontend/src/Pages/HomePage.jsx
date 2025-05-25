import { useEffect } from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import Home from "../components/Home/Home";
import HomeProducts from "../components/HomeProducts/HomeProducts";
import CarouselProducts from "../components/HomeProducts/CrouselProducts";
import Footer from "../components/Footer/Footer";
import Navbar from "../content/Navbar/Navbar";
import ContactUs from "../components/Contact Us/ContactUs";
import KeyPoints from "../components/KeyPoints/KeyPoints";
import Background from "../content/ui/background";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingPage from "../components/Home/LandingPage";
import PosPage from "../components/PosPage";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {
    // Add smooth scrolling behavior to the entire page
    document.documentElement.style.scrollBehavior = "smooth";

    // Set up the card model container to be fixed position for scrolling animations
    const cardContainer = document.getElementById("card-model-container");
    if (cardContainer) {
      // Initially hide the card model completely
      gsap.set(cardContainer, { autoAlpha: 0 });

      // Create a timeline for the card model appearance and movement
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home-section",
          start: "top 10%",
          end: "top -10%",
          scrub: true,
          id: "card-model-reveal",
        },
      });

      // Reveal the card model only when fully at Home section
      cardTl.to(cardContainer, {
        autoAlpha: 1,
        position: "fixed",
        zIndex: 100,
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        duration: 0.3,
      });

      // Set up animations for subsequent sections
      // Move card to the right side during products section
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#products-section",
          start: "top bottom",
          end: "top top",
          scrub: true,
          id: "card-animation-products",
        },
      });

      homeTl.to(cardContainer, {
        scale: 0.7,
        x: "30vw",
        duration: 1,
      });

      // Move card to the left side during AboutUs section
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",
          end: "top top",
          scrub: true,
          id: "card-animation-about",
        },
      });

      aboutTl.to(cardContainer, {
        x: "-30vw",
        y: "-10vh",
        rotateY: 180,
        duration: 1,
      });

      // Move card back to right during carousel section
      const carouselTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#carousel-section",
          start: "top bottom",
          end: "top top",
          scrub: true,
          id: "card-animation-carousel",
        },
      });

      carouselTl.to(cardContainer, {
        x: "25vw",
        y: "5vh",
        rotateY: 0,
        scale: 0.6,
        duration: 1,
      });

      // Move card to center during POS section
      const posTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#pos-section",
          start: "top bottom",
          end: "top top",
          scrub: true,
          id: "card-animation-pos",
        },
      });

      posTl.to(cardContainer, {
        x: "0vw",
        y: "0vh",
        scale: 0.9,
        duration: 1,
      });

      // Hide card during keypoints section
      const hideCardTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".keypoints-section",
          start: "top 80%",
          end: "top 80%",
          scrub: true,
          id: "card-hide-keypoints",
        },
      });

      hideCardTl.to(cardContainer, {
        autoAlpha: 0,
        duration: 0.5,
      });
    }

    // Cleanup function to remove smooth scrolling when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="relative z-10 overflow-hidden bg-[#041322]">
        <Navbar />
        <LandingPage />
        <div id="home-section">
          <Home />
        </div>
        <div id="products-section">
          <HomeProducts />
        </div>
        <div id="about-section">
          <AboutUs />
        </div>
        <div id="carousel-section">
          <CarouselProducts />
        </div>
        <div id="pos-section">
          <PosPage />
        </div>
        {/* <KeyPoints /> */}
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
