import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { useI18n } from "../i18n/useI18n";

const NotFound = () => {
  const { t } = useI18n();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-bg-main">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-20 bg-primary-orange blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-10 bg-primary-orange blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated 404 Text */}
          <motion.h1
            className="text-9xl font-black text-primary-orange/20 dark:text-primary-orange/10 mb-[-3.5rem] select-none"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            404
          </motion.h1>

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mb-4">
              {t("notFound.title") || "Oops! Page Not Found"}
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              {t("notFound.description") ||
                "The page you're looking for doesn't exist or has been moved."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-3 bg-primary-orange text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:brightness-110 transition-all hover:scale-105"
            >
              <Home size={20} />
              {t("notFound.backHome") || "Back to Home"}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-3 border-2 border-primary-orange text-primary-orange rounded-xl font-bold hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all hover:scale-105"
            >
              <ArrowLeft size={20} />
              {t("notFound.goBack") || "Go Back"}
            </button>
          </div>
        </motion.div>

        {/* Small floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-orange/30 rounded-full hidden sm:block"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default NotFound;
