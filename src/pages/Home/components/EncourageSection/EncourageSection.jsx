import { Link } from "react-router-dom";
import image from "../../../../assets/homepage/wall-post-amico.svg";
import { useI18n } from "../../../../i18n/useI18n";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

export default function EncourageSection() {
  const { ref: imageRef, isInView: isVisibleImage } = useScrollAnimation({ amount: 0.2, id: 'home-encourage-image' });
  const { ref: contentRef, isInView: isVisibleContent } = useScrollAnimation({ amount: 0.2, id: 'home-encourage-content' });
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
        {/* Image Section - Shows first on mobile, adjusts order on desktop */}
        <div
          ref={imageRef}
          className={`relative flex justify-center items-center order-1 lg:order-1 transition-all duration-1000 ease-out transform ${
            isVisibleImage
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-20 scale-90"
          }`}
        >
          <img
            src={image}
            alt="Technology and Life Illustration"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto relative z-10"
          />
        </div>

        {/* Content Section */}
        <div
          ref={contentRef}
          className={`max-w-xl order-2 lg:order-2 text-center lg:text-left transition-all duration-1000 delay-200 ease-out transform ${
            isVisibleContent
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-20"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-main leading-tight">
            <span className="text-primary-orange">
              {t("encourage.titleStart")}
            </span>{" "}
            {t("encourage.titleMiddle")}{" "}
            <span className="text-primary-orange">
              {t("encourage.titleHighlight")}
            </span>{" "}
            {t("encourage.titleEnd")}
          </h2>

          <p className="mt-4 sm:mt-6 text-text-sub text-base sm:text-lg leading-relaxed">
            {t("encourage.description")}
          </p>

          <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-md mx-auto lg:mx-0">
            <li className={`flex items-center gap-3 sm:gap-4 text-text-sub text-sm sm:text-base font-medium transition-all duration-500 delay-300 transform ${isVisibleContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-orange shrink-0"></span>
              {t("encourage.point1")}
            </li>
            <li className={`flex items-center gap-3 sm:gap-4 text-text-sub text-sm sm:text-base font-medium transition-all duration-500 delay-400 transform ${isVisibleContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-text-main shrink-0"></span>
              {t("encourage.point2")}
            </li>
            <li className={`flex items-center gap-3 sm:gap-4 text-text-sub text-sm sm:text-base font-medium transition-all duration-500 delay-500 transform ${isVisibleContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-text-sub shrink-0"></span>
              {t("encourage.point3")}
            </li>
          </ul>

          <Link
            to="/about"
            className="inline-flex items-center mt-8 sm:mt-10 text-primary-orange font-semibold sm:font-bold text-base sm:text-lg group"
          >
            {t("encourage.learnMore")}
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
