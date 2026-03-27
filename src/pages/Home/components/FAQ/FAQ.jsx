import { useState } from "react";
import image from "../../../../assets/homepage/man-thinking-pana.svg";
import { useI18n } from "../../../../i18n/useI18n";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref: headerRef, isInView: isVisibleHeader } = useScrollAnimation({ amount: 0.2, id: 'home-faq-header' });
  const { ref: imageRef, isInView: isVisibleImage } = useScrollAnimation({ amount: 0.2, id: 'home-faq-image' });
  const { ref: faqRef, isInView: isVisibleFaq } = useScrollAnimation({ amount: 0.2, id: 'home-faq-items' });
  const { t } = useI18n();

  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      {/* Header Section */}
      <div
        ref={headerRef}
        className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 lg:mb-24 transition-all duration-1000 ease-out transform ${
          isVisibleHeader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
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
          className={`flex justify-center order-1 lg:order-1 transition-all duration-1000 ease-out transform ${
            isVisibleImage ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-20 scale-90"
          }`}
        >
          <img
            src={image}
            alt="Thinking Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md h-auto"
          />
        </div>

        {/* FAQ Buttons Section */}
        <div ref={faqRef} className="space-y-3 sm:space-y-4 order-2 lg:order-2">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={`faq-${index}`}
                className={`bg-bg-main border border-border-main rounded-xl sm:rounded-2xl shadow-sm transition-all duration-500 transform ${
                  isVisibleFaq 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
