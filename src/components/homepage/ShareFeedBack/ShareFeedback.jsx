import React, { useState, useEffect, useRef } from 'react'

export default function ShareFeedback() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll in/out animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
      className="container mx-auto"
    >
      <div 
        className={`bg-[#F38331] rounded-2xl lg:rounded-[2rem] p-8 lg:p-16 grid lg:grid-cols-2 gap-12 items-center shadow-2xl shadow-orange-200 transition-all duration-1000 ease-out transform ${
          isVisible 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-95 rotate-1'
        }`}
      >
        {/* Left content - Text section */}
        <div className="max-w-md">
          <h2 
            className={`text-4xl lg:text-5xl font-extrabold text-white leading-tight transition-all duration-700 delay-200 transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-10'
            }`}
          >
            Share Your Feedback
          </h2>
          <p 
            className={`mt-6 text-white text-lg opacity-90 leading-relaxed transition-all duration-700 delay-400 transform ${
              isVisible 
                ? 'opacity-90 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            Your voice matters! Tell us how we can improve and make this platform better for writers and readers. Together, we can grow a more engaging and supportive blogging community.
          </p>
        </div>

        {/* Right content - Form section */}
        <div className="w-full">
          <form className="flex flex-col gap-4">
            {/* Name input field */}
            <div
              className={`transition-all duration-700 delay-300 transform ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <input 
                type="text" 
                placeholder="Last name" 
                className="w-full px-6 py-4 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all text-lg hover:scale-[1.02]"
              />
            </div>
            
            {/* Textarea field */}
            <div
              className={`transition-all duration-700 delay-400 transform ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <textarea 
                placeholder="Message" 
                rows="4"
                className="w-full px-6 py-4 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all text-lg resize-none hover:scale-[1.02]"
              ></textarea>
            </div>
            
            {/* Submit button */}
            <div
              className={`transition-all duration-700 delay-500 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-10 scale-90'
              }`}
            >
              <button 
                type="submit" 
                className="w-full bg-[#24292E] text-white font-bold py-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all text-lg shadow-lg hover:shadow-xl hover:shadow-gray-900/30"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Decorative elements - floating circles for extra flair */}
        <div 
          className={`absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        ></div>
        <div 
          className={`absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        ></div>
      </div>
    </div>
  )
}