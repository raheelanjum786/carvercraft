import { useRef, useState } from "react";

const KeyPoints = () => {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Remove the useEffect with GSAP animation

  const handleSlideChange = (direction) => {
    const cards = document.querySelectorAll(".stack-card");
    const totalSlides = cards.length;

    let newCurrentSlide;
    if (direction === "next") {
      newCurrentSlide = (currentSlide + 1) % totalSlides;
    } else {
      newCurrentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }

    setCurrentSlide(newCurrentSlide);

    cards.forEach((card, index) => {
      let position = (index - newCurrentSlide + totalSlides) % totalSlides;
      updateCardStyle(card, position);
    });
  };

  const updateCardStyle = (card, index) => {
    const styles = {
      0: { zIndex: 40, transform: "translate(0, 0) scale(1)", opacity: 1 },
      1: {
        zIndex: 30,
        transform: "translateY(1rem) scale(0.95)",
        opacity: 0.8,
      },
      2: { zIndex: 20, transform: "translateY(2rem) scale(0.9)", opacity: 0.6 },
      3: {
        zIndex: 10,
        transform: "translateY(3rem) scale(0.85)",
        opacity: 0.4,
      },
    };

    Object.entries(styles[index]).forEach(([property, value]) => {
      if (property === "transform") {
        card.style.transform = value;
      } else {
        card.style[property] = value;
      }
    });
  };

  const cardBackgrounds = [
    "rgba(255, 0, 255, 1)", // Neon pink
    "rgba(0, 255, 255, 1)", // Neon cyan
    "rgba(255, 255, 0, 1)", // Neon yellow
    "rgba(0, 255, 0, 1)", // Neon green
  ];

  return (
    <div ref={sectionRef} className="overflow-hidden keypoints-section">
      <div className="relative h-[80vh] w-full flex items-center justify-center">
        <button
          className="absolute left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleSlideChange("prev")}
        >
          ←
        </button>

        <div className="stack-container relative w-[80%] h-[70vh]">
          {[1, 2, 3, 4].map((num, index) => (
            <div
              key={num}
              className="stack-card absolute w-full h-full rounded-lg shadow-lg transform transition-all duration-500 flex"
              style={{
                zIndex: 40 - index * 10,
                backgroundColor: cardBackgrounds[index],
                transform:
                  index > 0
                    ? `translateY(${index * 1}rem) scale(${1 - index * 0.05})`
                    : "none",
                opacity: 1 - index * 0.2,
              }}
            >
              {num % 2 === 0 ? (
                <>
                  <div className="w-1/2 h-full">
                    <img
                      src={`/heading${num}.jpg`}
                      alt={`Heading ${num}`}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="w-1/2 h-full p-6 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4">Key Point {num}</h2>
                    <p className="text-gray-600">
                      Description for key point {num} goes here...
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-1/2 h-full p-6 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-4">Key Point {num}</h2>
                    <p className="text-gray-600">
                      Description for key point {num} goes here...
                    </p>
                  </div>
                  <div className="w-1/2 h-full">
                    <img
                      src={`/heading${num}.jpg`}
                      alt={`Heading ${num}`}
                      className="w-full h-full object-cover rounded-r-lg"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          className="absolute right-4 z-50 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleSlideChange("next")}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default KeyPoints;
