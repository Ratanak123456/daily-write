import { useEffect, useRef, useState } from "react";
import image from "../../../assets/homepage/Man thinking-pana.svg";
import { useI18n } from "../../../i18n/useI18n";

export default function FAQ() {
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const faqItemsRef = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useI18n();

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes when element becomes visible
          if (entry.target === headerRef.current) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("animate-fade-out");
          } else if (entry.target === imageRef.current) {
            entry.target.classList.add("animate-slide-in-left");
            entry.target.classList.remove("animate-slide-out-left");
          } else {
            // Handle FAQ items with staggered animation
            const index = faqItemsRef.current.indexOf(entry.target);
            if (index !== -1) {
              // Add delay based on index (0.2s, 0.4s, 0.6s, etc.)
              entry.target.style.animationDelay = `${index * 0.2}s`;
              entry.target.classList.add("animate-slide-in-bottom");
              entry.target.classList.remove("animate-slide-out-bottom");
            }
          }
        } else {
          // Add fade out animations when element leaves viewport
          if (entry.target === headerRef.current) {
            entry.target.classList.remove("animate-fade-in-up");
            entry.target.classList.add("animate-fade-out");
          } else if (entry.target === imageRef.current) {
            entry.target.classList.remove("animate-slide-in-left");
            entry.target.classList.add("animate-slide-out-left");
          } else {
            // Handle FAQ items fade out
            const index = faqItemsRef.current.indexOf(entry.target);
            if (index !== -1) {
              entry.target.classList.remove("animate-slide-in-bottom");
              entry.target.classList.add("animate-slide-out-bottom");
              // Reset animation delay when fading out
              entry.target.style.animationDelay = "0s";
            }
          }
        }
      });
    }, observerOptions);

    // Observe header and image
    if (headerRef.current) observer.observe(headerRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    // Observe all FAQ items
    faqItemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    // Cleanup
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
      faqItemsRef.current.forEach((item) => {
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
          {t("faq.titleLead")}{" "}
          <span className="text-primary-orange">{t("faq.titleHighlight")}</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-text-sub text-base sm:text-lg">
          {t("faq.description")}
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
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={`faq-${index}`}
                ref={(el) => (faqItemsRef.current[index] = el)}
                className="bg-bg-main border border-border-main rounded-xl sm:rounded-2xl shadow-sm transition-all opacity-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left transition-all group ${
                    isOpen
                      ? "border-primary-orange"
                      : "hover:border-primary-orange"
                  }`}
                >
                  <span className="text-base sm:text-lg font-bold text-text-main pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold transition-colors shrink-0 ${
                      isOpen
                        ? "bg-primary-orange text-white"
                        : "bg-primary-orange/10 text-primary-orange group-hover:bg-primary-orange group-hover:text-white"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </div>
                </button>

                <div
                  className={`px-4 sm:px-5 md:px-6 overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "max-h-48 pb-5 sm:pb-6 opacity-100"
                      : "max-h-0 pb-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-base text-text-sub leading-relaxed pr-2">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
