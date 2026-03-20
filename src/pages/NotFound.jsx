import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Compass, MapPin } from "lucide-react";
import { useI18n } from "../i18n/useI18n";
import { motion as Motion } from "framer-motion";

const NotFound = () => {
  const { t } = useI18n();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particles = PARTICLES;

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-orange/20 to-primary-orange/10 dark:from-primary-orange/10 dark:to-primary-orange/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <Motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-primary-orange/20 to-primary-orange/10 dark:from-primary-orange/10 dark:to-primary-orange/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <Motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-primary-orange/40 to-primary-orange/30 dark:from-primary-orange/30 dark:to-primary-orange/20 pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            top: particle.top,
            left: particle.left,
          }}
          animate={{
            y: [0, particle.xRange, 0],
            x: [0, particle.xRange / 2, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full">
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* 404 Number with Parallax Effect */}
          <Motion.div
            className="relative mb-8"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
          >
            <div className="relative inline-block">
              {/* Glow Effect */}
              <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary-orange to-primary-orange-dark rounded-full opacity-30" />
              
              <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none tracking-tighter">
                <span className="bg-gradient-to-r from-primary-orange via-primary-orange to-primary-orange-dark bg-clip-text text-transparent animate-gradient">
                  404
                </span>
              </h1>
              
              {/* Decorative Elements */}
              <Motion.div
                className="absolute -top-8 -right-8 sm:top-0 sm:right-0"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-primary-orange/30 dark:text-primary-orange/20" />
              </Motion.div>
              <Motion.div
                className="absolute -bottom-8 -left-8 sm:bottom-0 sm:left-0"
                animate={{
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-primary-orange/30 dark:text-primary-orange/20" />
              </Motion.div>
            </div>
          </Motion.div>

          {/* Error Message */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-4 py-2 bg-bg-side rounded-full"
            >
              <p className="text-xs sm:text-sm text-text-sub">
                💡 Tip: Check the URL for typos or use the navigation below
              </p>
            </Motion.div>
          </Motion.div>

          {/* Action Buttons */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="group relative flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-primary-orange to-primary-orange-dark 
                       text-white rounded-xl font-semibold shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
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
                       transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>{t("notFound.goBack") || "Go Back"}</span>
            </button>
          </Motion.div>

          {/* Quick Links */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-border-main"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-text-sub">Quick Navigation:</span>
              <Link
                to="/blog"
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

      {/* Add gradient animation keyframes */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

const PARTICLES = [...Array(15)].map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 4,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
  xRange: -20 + Math.random() * 40,
}));

export default NotFound;