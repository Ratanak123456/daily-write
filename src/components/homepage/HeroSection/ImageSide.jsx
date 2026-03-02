import { useState, useEffect, useRef } from "react";
import heropic from "../../../assets/homepage/Untitled design.svg";

export default function ImageSide() {
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
      className="relative flex items-center justify-center order-1 lg:order-2 mt-8 lg:mt-10 lg:mb-20"
    >
      <div className="relative group w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        {/* Main Image Container - with pop animation */}
        <div 
          className={`relative z-0 bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)] rounded-full w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-150 xl:h-150 flex items-center justify-center p-4 sm:p-6 md:p-8 mx-auto transition-all duration-1000 ease-out transform ${
            isVisible 
              ? 'opacity-100 scale-100 rotate-0 translate-y-0' 
              : 'opacity-0 scale-50 rotate-12 translate-y-10'
          }`}
        >
          <img
            src={heropic}
            alt="Blogging Illustration"
            className="w-full h-full object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 dark:shadow-gray-800 animate-pulse-glow"
          />
        </div>

        {/* Rating Card - with pop animation from right */}
        <div 
          className={`absolute -top-4 sm:-top-4 md:-top-6 right-0 sm:right-2 md:right-4 lg:right-10 bg-bg-main p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-1 sm:gap-2 md:gap-3 shadow-orange-100 dark:shadow-gray-800 dark:bg-gray-800 dark:border dark:border-gray-700 z-10 transition-all duration-700 delay-200 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-10 scale-75'
          } hover:scale-110`}
        >
          <div className="text-yellow-400 text-lg sm:text-xl md:text-2xl animate-pulse-slow">
            ★
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-text-main dark:text-white">
              4.8
            </p>
            <p className="text-[8px] sm:text-[10px] text-text-sub dark:text-gray-400">
              Satisfaction
            </p>
          </div>
        </div>

        {/* Background Glow - with fade animation */}
        <div 
          className={`absolute w-[120%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(255,237,213,1)_0%,rgba(255,251,247,0)_70%)] blur-xl sm:blur-2xl opacity-80 -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-[radial-gradient(circle,rgba(55,65,81,0.8)_0%,rgba(31,41,55,0)_70%)] transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-90'
          }`}
        ></div>

        {/* User Card - with pop animation from left */}
        <div 
          className={`absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-0 sm:left-2 md:left-4 lg:-left-6 bg-bg-main p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 md:gap-4 border border-border-main dark:bg-gray-800 dark:border-gray-700 z-10 transition-all duration-700 delay-300 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 -translate-x-10 scale-75'
          } hover:scale-110`}
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary-orange rounded-lg sm:rounded-xl flex items-center justify-center text-white animate-bounce-subtle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-text-sub dark:text-gray-400">
              User
            </p>
            <p className="text-xs sm:text-sm font-bold text-text-main dark:text-white">
              1,000 +
            </p>
          </div>
        </div>

        {/* Courses Blog - with pop animation from right */}
        <div 
          className={`absolute bottom-4 sm:bottom-6 md:bottom-10 -right-2 sm:right-0 md:-right-4 lg:-right-8 bg-bg-main p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 md:gap-4 border border-border-main dark:bg-gray-800 dark:border-gray-700 z-10 transition-all duration-700 delay-400 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-10 scale-75'
          } hover:scale-110`}
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-text-sub rounded-lg sm:rounded-xl flex items-center justify-center text-white dark:bg-gray-600 animate-spin-slow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-text-main dark:text-white">
              2,000+
            </p>
            <p className="text-[8px] sm:text-[10px] text-text-sub dark:text-gray-400">
              Blogs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}