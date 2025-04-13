import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutUs from "./AboutUs";
import Footer from "../Footer/Footer";

const AboutUsPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const bgElement1Ref = useRef(null);
  const bgElement2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    const heroTl = gsap.timeline();

    heroTl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    heroTl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );

    // Enhanced parallax effects

    // Parallax effect on hero section
    gsap.to(heroRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Parallax effect on background elements
    gsap.to(bgElement1Ref.current, {
      yPercent: -50,
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.to(bgElement2Ref.current, {
      yPercent: -30,
      xPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Parallax for title and subtitle
    gsap.to(titleRef.current, {
      yPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
    });

    gsap.to(subtitleRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
      },
    });

    // CTA section animation
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#1a0f0f] relative overflow-hidden">
      {/* Hero Section with Parallax */}
      <div
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
      >
        {/* Background decorative elements with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={bgElement1Ref}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          ></div>
          <div
            ref={bgElement2Ref}
            className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
          ></div>

          {/* Additional parallax elements */}
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl transform translate-y-[30%] translate-x-[20%]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-red-800/5 rounded-full blur-3xl transform -translate-y-[40%]"></div>
        </div>

        <div className="text-center text-white z-10 px-4">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#E0A387] via-[#D38E73] to-[#B96A59] text-transparent bg-clip-text"
          >
            Carvercraft Legacy
          </h1>
          <p
            ref={subtitleRef}
            className="text-[#E0A387] text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum.
          </p>
        </div>
      </div>

      {/* AboutUs Component */}
      <AboutUs />

      {/* CTA Section */}
      <div
        ref={ctaRef}
        className="py-24 px-4 bg-gradient-to-b from-[#491B1D] to-[#310A0B] relative overflow-hidden"
      >
        {/* Parallax background elements for CTA section */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E0A387] to-[#B96A59] mb-8">
            Join Our Artisanal Community
          </h2>
          <p className="text-[#E0A387]/80 mb-12 max-w-3xl mx-auto text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
            risus eget urna mollis ornare vel eu leo. Cras mattis consectetur
            purus sit amet fermentum.
          </p>

          <button className="px-8 py-4 bg-gradient-to-r from-[#B96A59] to-[#E0A387] text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-orange-900/20 transform hover:scale-105 transition-all duration-300">
            Discover More
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
