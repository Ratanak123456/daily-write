import Button from "../../../../components/Button/Button";
import { useI18n } from "../../../../i18n/useI18n";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

export default function Information() {
  const { ref: sectionRef, isInView: isVisible } = useScrollAnimation({ amount: 0.1, id: 'home-hero-info' });
  const { t, language } = useI18n();
  const isKhmer = language === "km";

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
          className={`inline-flex items-baseline gap-2 whitespace-nowrap transition-all duration-700 delay-100 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${isKhmer ? "tracking-[0.01em]" : ""}`}
        >
          <span className="text-primary-orange">
            {t("hero.leadLetter")}
          </span>
          <span>{t("hero.titleLine1")}</span>
        </span>
        <span
          className={`text-primary-orange block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl transition-all duration-700 delay-300 transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          } ${
            isKhmer ? "mt-3 sm:mt-4 leading-[1.45]" : "mt-1 sm:mt-2"
          }`}
        >
          {t("hero.titleLine2")}
        </span>
      </h1>

      {/* Description paragraph */}
      <p
        className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-text-sub max-w-xl mx-auto lg:mx-0 transition-all duration-700 delay-500 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${
          isKhmer ? "leading-[1.9]" : "leading-relaxed"
        }`}
      >
        {t("hero.description")}
      </p>

      {/* Buttons container */}
      <div
        className={`mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start transition-all duration-700 delay-700 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="w-full sm:w-auto">
          <Button
            link="blogs"
            title={t("hero.exploreBlogs")}
            backgroundColor="bg-primary-orange"
            hoverColor="hover:bg-primary-orange-dark"
            textColor="text-white"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          />
        </div>

        <div className="w-full sm:w-auto">
          <Button
            link="about"
            title={t("hero.learnMore")}
            backgroundColor="bg-white dark:bg-transparent"
            hoverColor="hover:bg-primary-orange"
            textColor="text-text-sub dark:text-gray-300"
            borderColor="border-2 border-border-main dark:border-gray-700"
            hoverTextColor="hover:text-white"
            hoverBorderColor="hover:border-primary-orange"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold hover:shadow-lg hover:shadow-primary-orange/20"
          />
        </div>
      </div>
    </div>
  );
}
