import { useState, useEffect, useRef } from "react";
import Button from "../../Button/Button";

export default function Information() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll in/out animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visibility state based on intersection
          setIsVisible(entry.isIntersecting);
        });
      },
      { 
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="max-w-2xl text-center lg:text-left order-2 lg:order-1"
    >
      {/* Main heading with letter animation */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-text-main leading-tight">
        <span 
          className={`inline-block transition-all duration-700 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0 rotate-0' 
              : 'opacity-0 -translate-y-10 -rotate-12'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <span className="text-primary-orange inline-block animate-wave">A</span>
        </span>{" "}
        <span 
          className={`inline-block transition-all duration-700 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Community-Driven
        </span>
        <span 
          className={`text-primary-orange block mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl transition-all duration-700 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 -translate-x-10 scale-90'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Platform for Sharing Ideas, Engaging in Discussion
        </span>
      </h1>

      {/* Description paragraph */}
      <p 
        className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-text-sub leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-700 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        DailyWrite is an open blogging platform where users share insights on
        technology, daily life, and general topics while engaging in thoughtful
        discussion and meaningful interaction.
      </p>

      {/* Buttons container */}
      <div 
        className={`mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start transition-all duration-700 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
          <Button
            link="blogs"
            title="Explore Blogs"
            backgroundColor="bg-primary-orange"
            hoverColor="bg-primary-orange-dark"
            textColor="text-white"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          />
        </div>
        <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 border-2 border-border-main bg-white text-text-sub font-bold rounded-lg hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transform hover:-translate-y-1 text-sm sm:text-base">
          Learn More
        </button>
      </div>
    </div>
  );
}