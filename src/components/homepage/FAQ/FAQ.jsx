import { useEffect, useRef } from "react";
import image from "../../../assets/homepage/Man thinking-pana.svg";

export default function FAQ() {
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const faqItemsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation classes when element becomes visible
          if (entry.target === headerRef.current) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('animate-fade-out');
          } else if (entry.target === imageRef.current) {
            entry.target.classList.add('animate-slide-in-left');
            entry.target.classList.remove('animate-slide-out-left');
          } else {
            // Handle FAQ items with staggered animation
            const index = faqItemsRef.current.indexOf(entry.target);
            if (index !== -1) {
              // Add delay based on index (0.2s, 0.4s, 0.6s, etc.)
              entry.target.style.animationDelay = `${index * 0.2}s`;
              entry.target.classList.add('animate-slide-in-bottom');
              entry.target.classList.remove('animate-slide-out-bottom');
            }
          }
        } else {
          // Add fade out animations when element leaves viewport
          if (entry.target === headerRef.current) {
            entry.target.classList.remove('animate-fade-in-up');
            entry.target.classList.add('animate-fade-out');
          } else if (entry.target === imageRef.current) {
            entry.target.classList.remove('animate-slide-in-left');
            entry.target.classList.add('animate-slide-out-left');
          } else {
            // Handle FAQ items fade out
            const index = faqItemsRef.current.indexOf(entry.target);
            if (index !== -1) {
              entry.target.classList.remove('animate-slide-in-bottom');
              entry.target.classList.add('animate-slide-out-bottom');
              // Reset animation delay when fading out
              entry.target.style.animationDelay = '0s';
            }
          }
        }
      });
    }, observerOptions);

    // Observe header and image
    if (headerRef.current) observer.observe(headerRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    
    // Observe all FAQ items
    faqItemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    // Cleanup
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
      faqItemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      {/* Header Section */}
      <div 
        ref={headerRef}
        className="text-center max-w-2xl mx-auto mb-12 md:mb-16 lg:mb-24 opacity-0"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main leading-tight">
          Frequently Asked <span className="text-primary-orange">Questions</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-text-sub text-base sm:text-lg">
          Find answers to common questions about DailyWrite, including what
          types of content you can post, enrollment, and more.
        </p>
      </div>

      {/* Grid Layout - Image on top for mobile, side by side for desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-24 items-center">
        {/* Image Section - Shows first on mobile */}
        <div 
          ref={imageRef}
          className="flex justify-center order-1 lg:order-1 opacity-0"
        >
          <img
            src={image}
            alt="Thinking Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md h-auto animate-float-slow"
          />
        </div>

        {/* FAQ Buttons Section */}
        <div className="space-y-3 sm:space-y-4 order-2 lg:order-2">
          {/* FAQ Item 1 */}
          <button 
            ref={el => faqItemsRef.current[0] = el}
            className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 bg-bg-main border border-border-main rounded-xl sm:rounded-2xl shadow-sm hover:border-primary-orange transition-all group opacity-0"
          >
            <span className="text-base sm:text-lg font-bold text-text-main text-left pr-4">
              What is DailyWrite?
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-orange/10 flex items-center justify-center text-primary-orange font-bold group-hover:bg-primary-orange group-hover:text-white transition-colors shrink-0">
              +
            </div>
          </button>

          {/* FAQ Item 2 */}
          <button 
            ref={el => faqItemsRef.current[1] = el}
            className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 bg-bg-main border border-border-main rounded-xl sm:rounded-2xl shadow-sm hover:border-primary-orange transition-all group opacity-0"
          >
            <span className="text-base sm:text-lg font-bold text-text-main text-left pr-4">
              How can we post the blogs?
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-orange/10 flex items-center justify-center text-primary-orange font-bold group-hover:bg-primary-orange group-hover:text-white transition-colors shrink-0">
              +
            </div>
          </button>

          {/* FAQ Item 3 */}
          <button 
            ref={el => faqItemsRef.current[2] = el}
            className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 bg-bg-main border border-border-main rounded-xl sm:rounded-2xl shadow-sm hover:border-primary-orange transition-all group opacity-0"
          >
            <span className="text-base sm:text-lg font-bold text-text-main text-left pr-4">
              Is it free to create an account?
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-orange/10 flex items-center justify-center text-primary-orange font-bold group-hover:bg-primary-orange group-hover:text-white transition-colors shrink-0">
              +
            </div>
          </button>

          {/* FAQ Item 4 */}
          <button 
            ref={el => faqItemsRef.current[3] = el}
            className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 bg-bg-main border border-border-main rounded-xl sm:rounded-2xl shadow-sm hover:border-primary-orange transition-all group opacity-0"
          >
            <span className="text-base sm:text-lg font-bold text-text-main text-left pr-4">
              What topics can I write about?
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-orange/10 flex items-center justify-center text-primary-orange font-bold group-hover:bg-primary-orange group-hover:text-white transition-colors shrink-0">
              +
            </div>
          </button>

          {/* FAQ Item 5 */}
          <button 
            ref={el => faqItemsRef.current[4] = el}
            className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 bg-bg-main border border-border-main rounded-xl sm:rounded-2xl shadow-sm hover:border-primary-orange transition-all group opacity-0"
          >
            <span className="text-base sm:text-lg font-bold text-text-main text-left pr-4">
              How do I create an account?
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-orange/10 flex items-center justify-center text-primary-orange font-bold group-hover:bg-primary-orange group-hover:text-white transition-colors shrink-0">
              +
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}