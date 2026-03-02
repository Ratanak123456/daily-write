import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/homepage/Wall post-amico.svg";

export default function EncourageSection() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation classes when element becomes visible
          if (entry.target === imageRef.current) {
            entry.target.classList.add('animate-slide-in-left');
            entry.target.classList.remove('animate-slide-out-left', 'opacity-0');
          } else if (entry.target === contentRef.current) {
            entry.target.classList.add('animate-slide-in-right');
            entry.target.classList.remove('animate-slide-out-right', 'opacity-0');
          }
        } else {
          // Remove animation classes and add fade out when element leaves viewport
          if (entry.target === imageRef.current) {
            entry.target.classList.remove('animate-slide-in-left');
            entry.target.classList.add('animate-slide-out-left');
          } else if (entry.target === contentRef.current) {
            entry.target.classList.remove('animate-slide-in-right');
            entry.target.classList.add('animate-slide-out-right');
          }
        }
      });
    }, observerOptions);

    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
        {/* Image Section - Shows first on mobile, adjusts order on desktop */}
        <div 
          ref={imageRef}
          className="relative flex justify-center items-center order-1 lg:order-1 opacity-0"
        >
          <img
            src={image}
            alt="Technology and Life Illustration"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto relative z-10 animate-float-slow"
          />
        </div>

        {/* Content Section */}
        <div 
          ref={contentRef}
          className="max-w-xl order-2 lg:order-2 text-center lg:text-left opacity-0"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-main leading-tight">
            <span className="text-primary-orange">Thoughts on</span> Technology,
            Life, <span className="text-primary-orange">and Everything</span> In
            Between
          </h2>

          <p className="mt-4 sm:mt-6 text-text-sub text-base sm:text-lg leading-relaxed animate-fade-in-up-delay">
            Discover thoughtful articles on technology, daily life, and general
            topics shared by a growing community of writers.
          </p>

          <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-md mx-auto lg:mx-0">
            <li className="flex items-center gap-3 sm:gap-4 text-text-sub text-sm sm:text-base font-medium animate-fade-in-up-delay">
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-orange shrink-0 animate-pulse-glow"></span>
              Quality-vetted pieces
            </li>
            <li className="flex items-center gap-3 sm:gap-4 text-text-sub text-sm sm:text-base font-medium animate-fade-in-up-delay-2">
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-text-main shrink-0"></span>
              Carefully curated selection
            </li>
            <li className="flex items-center gap-3 sm:gap-4 text-text-sub text-sm sm:text-base font-medium animate-fade-in-up-delay-2">
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-text-sub shrink-0"></span>
              Global brand discovery
            </li>
          </ul>

          <Link
            to="/about"
            className="inline-flex items-center mt-8 sm:mt-10 text-primary-orange font-semibold sm:font-bold text-base sm:text-lg group animate-bounce-subtle"
          >
            Learn More About Us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transform transition-transform group-hover:translate-x-1"
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
          </Link>
        </div>
      </div>
    </div>
  );
}