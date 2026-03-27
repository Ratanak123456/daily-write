import { useState, useEffect } from "react";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

const student1 = "/Team/Saren Ratanak.jpg";
const student2 = "/Team/photo_2026-02-17_21-02-08.jpg";
const student3 = "/Team/_MG_8835.jpg";
const student4 = "/Team/IMG_4905.jpg";
const student5 = "/Team/rosa.jpg";
const student6 = "/Team/photo_2026-02-19_00-24-53.jpg";
const student7 = "/Team/image_2024-01-22_14-24-14.png";
export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: sectionRef, isInView: isVisible } = useScrollAnimation({ amount: 0.1, id: 'home-review-section' });

  const students = [
    {
      id: 1,
      name: "Ratanak",
      image: student1,
      quote:
        "I'm much more confident in my writing thanks to DailyWrite. I used to second-guess myself, but now I trust my voice.",
    },
    {
      id: 2,
      name: "Visak",
      image: student4,
      quote:
        "My writing has come a long way since I started posting on DailyWrite. Putting out content regularly has made it feel more natural and less forced.",
    },
    {
      id: 3,
      name: "Chamroeun",
      image: student6,
      quote:
        "DailyWrite has leveled up my writing abilities. The variety of topics keeps me learning with every post.",
    },
    {
      id: 4,
      name: "Ousa",
      image: student7,
      quote:
        "I've improved my writing skills significantly since joining. This has allowed me to contribute more effectively to team projects and client communications.",
    },
    {
      id: 5,
      name: "Rosa",
      image: student5,
      quote:
        "DailyWrite has made me a more flexible writer. One day I'm covering tech, the next I'm diving into health or culture",
    },
    {
      id: 6,
      name: "Sovan",
      image: student3,
      quote:
        "The AI chatbot on DailyWrite has been a game-changer for my writing. It helps me brainstorm and refine until my point lands.",
    },
    {
      id: 7,
      name: "Theara",
      image: student2,
      quote:
        "DailyWrite has sharpened my writing craft. I've gotten better at structure, pacing, and simplifying complex ideas.",
    },
  ];

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? students.length - 1 : prevIndex - 1,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === students.length - 1 ? 0 : prevIndex + 1,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto float functionality - only when visible
  useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        if (!isAnimating) {
          setIsAnimating(true);
          setDirection("right");
          setCurrentIndex((prevIndex) =>
            prevIndex === students.length - 1 ? 0 : prevIndex + 1,
          );
          setTimeout(() => setIsAnimating(false), 500);
        }
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isAnimating, isVisible, students.length]);

  const currentStudent = students[currentIndex];

  const getSlideAnimation = () => {
    if (direction === "right") {
      return "animate-slide-in-right";
    } else {
      return "animate-slide-in-left";
    }
  };

  return (
    <div ref={sectionRef} className="container mx-auto px-6 text-center">
      {/* Header section with pop in/out animation */}
      <div
        className={`mb-16 transition-all duration-700 ease-in-out transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <span className="text-sm font-bold text-primary-orange uppercase tracking-widest">
          Testimonials
        </span>
        <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold text-text-main">
          HEAR FROM OUR USER
        </h2>
      </div>

      {/* Main content with pop in/out animation */}
      <div
        className={`relative max-w-5xl mx-auto flex items-center justify-center transition-all duration-700 delay-200 ease-in-out transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={handlePrevious}
          disabled={isAnimating}
          className="absolute left-0 z-10 w-12 h-12 flex items-center justify-center bg-bg-secondary rounded-full text-text-sub hover:bg-border-main transition-colors shadow-sm animate-pulse-slow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-12 px-16">
          {/* Image with pop and rotate animation */}
          <div className={`relative ${getSlideAnimation()}`}>
            <div
              className={`w-50 h-50 bg-primary-orange rounded-[40%_60%_70%_30%/40%_50%_60%_50%] overflow-hidden flex items-start justify-start shadow-xl transition-all duration-700 delay-400 ease-out transform ${
                isVisible
                  ? "opacity-100 translate-x-0 rotate-0 scale-100"
                  : "opacity-0 -translate-x-10 rotate-6 scale-90"
              }`}
            >
              <img
                src={currentStudent.image}
                alt={currentStudent.alt}
                className="w-[90%] h-[90%] object-cover p-2 rounded-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Text content with staggered pop animation */}
          <div
            className={`text-left max-w-md relative ${getSlideAnimation()}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span
              className={`absolute -top-6 -left-4 text-border-main text-6xl font-sans animate-pulse-slow transition-all duration-700 delay-500 ease-out transform ${
                isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-12"
              }`}
            >
              “
            </span>

            <h3
              className={`text-2xl font-bold text-text-main mb-4 transition-all duration-700 delay-600 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {currentStudent.name}
            </h3>

            <p
              className={`text-text-sub text-lg leading-relaxed italic mb-4 transition-all duration-700 delay-700 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {currentStudent.quote}
            </p>

            <span
              className={`absolute -bottom-10 right-0 text-border-main text-6xl font-sans animate-pulse-slow transition-all duration-700 delay-800 ease-out transform ${
                isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-12"
              }`}
            >
              ”
            </span>
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-0 z-10 w-12 h-12 flex items-center justify-center bg-bg-secondary rounded-full text-text-sub hover:bg-border-main transition-colors shadow-sm animate-pulse-slow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation dots with pop animation */}
      <div
        className={`flex justify-center gap-2 mt-8 transition-all duration-700 delay-900 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {students.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            disabled={isAnimating}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary-orange w-4 animate-pulse-glow"
                : "bg-border-main hover:bg-primary-orange/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter with pop animation */}
      <p
        className={`text-sm text-text-sub mt-4 transition-all duration-700 delay-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {currentIndex + 1} / {students.length}
      </p>
    </div>
  );
}