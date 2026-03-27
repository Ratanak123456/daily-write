import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Compass, MapPin } from "lucide-react";
import { useI18n } from "../i18n/useI18n";
import { motion as Motion } from "framer-motion";

const NotFound = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full">
        <Motion.div
          initial={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="relative inline-block">
              {/* Glow Effect */}
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary-orange to-primary-orange-dark rounded-full opacity-30" />
              
              <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none tracking-tighter">
                <span className="bg-gradient-to-r from-primary-orange via-primary-orange to-primary-orange-dark bg-clip-text text-transparent">
                  404
                </span>
              </h1>
              
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 sm:top-0 sm:right-0">
                <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-primary-orange/30 dark:text-primary-orange/20" />
              </div>
              <div className="absolute -bottom-8 -left-8 sm:bottom-0 sm:left-0">
                <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-primary-orange/30 dark:text-primary-orange/20" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <Motion.div
            initial={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main">
              {t("notFound.title") || "Lost in Space?"}
            </h2>
            <p className="text-base sm:text-lg text-text-sub max-w-md mx-auto">
              {t("notFound.description") ||
                "The page you're looking for seems to have wandered off into the digital wilderness."}
            </p>
            
            {/* Fun Fact */}
            <Motion.div
              initial={{ opacity: 1 }}
              className="inline-block px-4 py-2 bg-bg-side rounded-full"
            >
              <p className="text-xs sm:text-sm text-text-sub">
                💡 Tip: Check the URL for typos or use the navigation below
              </p>
            </Motion.div>
          </Motion.div>

          {/* Action Buttons */}
          <Motion.div
            initial={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="group relative flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-primary-orange to-primary-orange-dark 
                       text-white rounded-xl font-semibold shadow-lg hover:shadow-xl 
                       transition-all duration-200 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-orange-dark to-primary-orange-dark opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <Home size={20} className="relative z-10" />
              <span className="relative z-10">{t("notFound.backHome") || "Back to Home"}</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 px-8 py-3.5 border-2 border-primary-orange text-primary-orange 
                       dark:border-primary-orange dark:text-primary-orange rounded-xl font-semibold 
                       hover:bg-primary-orange/10 dark:hover:bg-primary-orange/10 
                       transition-all duration-200"
            >
              <ArrowLeft size={20} />
              <span>{t("notFound.goBack") || "Go Back"}</span>
            </button>
          </Motion.div>

          {/* Quick Links */}
          <Motion.div
            initial={{ opacity: 1 }}
            className="mt-12 pt-8 border-t border-border-main"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-text-sub">Quick Navigation:</span>
              <Link
                to="/blogs"
                className="text-text-sub hover:text-primary-orange transition-colors"
              >
                Blog
              </Link>
              <span className="text-border-main">•</span>
              <Link
                to="/about"
                className="text-text-sub hover:text-primary-orange transition-colors"
              >
                About
              </Link>
              <span className="text-border-main">•</span>
              <Link
                to="/"
                className="text-text-sub hover:text-primary-orange transition-colors"
              >
                Home
              </Link>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </div>
  );
};

export default NotFound;
