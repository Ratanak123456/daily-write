import { useState, useEffect, useRef } from "react";
import Button from "../../Button/Button";
import { useI18n } from "../../../i18n/useI18n";

export default function Information() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t, language } = useI18n();
  const isKhmer = language === "km";

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
        rootMargin: "0px",
      },
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
      <h1
        className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-text-main ${
          isKhmer
            ? "leading-[1.55] sm:leading-[1.6] lg:leading-[1.65]"
            : "leading-tight"
        }`}
      >
        <span
          className={`inline-flex items-baseline gap-2 whitespace-nowrap transition-all duration-700 ease-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 animate-fade-in-up"
              : "opacity-0 translate-y-10"
          } ${isKhmer ? "tracking-[0.01em]" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          <span className="text-primary-orange animate-wave">
            {t("hero.leadLetter")}
          </span>
          <span>{t("hero.titleLine1")}</span>
        </span>
        <span
          className={`text-primary-orange block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl transition-all duration-700 ease-out transform ${
            isKhmer ? "mt-3 sm:mt-4 leading-[1.45]" : "mt-1 sm:mt-2"
          } ${
            isVisible
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-10 scale-90"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {t("hero.titleLine2")}
        </span>
      </h1>

      {/* Description paragraph */}
      <p
        className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-text-sub max-w-xl mx-auto lg:mx-0 transition-all duration-700 ease-out transform ${
          isKhmer ? "leading-[1.9]" : "leading-relaxed"
        } ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        {t("hero.description")}
      </p>

      {/* Buttons container */}
      <div
        className={`mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start transition-all duration-700 ease-out transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
          <Button
            link="blogs"
            title={t("hero.exploreBlogs")}
            backgroundColor="bg-primary-orange"
            hoverColor="bg-primary-orange-dark"
            textColor="text-white"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          />
        </div>
        <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 border-2 border-border-main bg-white text-text-sub font-bold rounded-lg hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transform hover:-translate-y-1 text-sm sm:text-base">
          {t("hero.learnMore")}
        </button>
      </div>
    </div>
  );
}
