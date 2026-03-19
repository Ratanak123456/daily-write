import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useI18n } from "../../i18n/useI18n";
import image from "../../assets/about/Team page-bro.svg"
import { Link } from "react-router-dom";

const IntroSection = () => {
  const { controls, ref } = useScrollAnimation({ amount: 0.3 });
  const { t } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      className="relative w-full py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
      ref={ref}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Left Side: Team Illustration Area */}
        <motion.div
          className="relative order-2 lg:order-1 mt-8 lg:mt-0 flex justify-center items-center"
          variants={itemVariants}
        >
          <motion.img
            src={image}
            alt="Team Illustration"
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto relative z-10"
            whileHover={{
              scale: 1.05,
              rotate: -1,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          className="z-10 order-1 lg:order-2"
          variants={containerVariants}
        >
          <motion.div className="mb-3 sm:mb-4" variants={itemVariants}>
            <motion.h2
              className="font-extrabold text-3xl sm:text-4xl md:text-5xl"
              style={{ color: "var(--text-primary)" }}
            >
              {t("about.team.whoAre")}{" "}
              <span style={{ color: "var(--primary-500)" }}>
                {t("about.team.we")}
              </span>
              ?
            </motion.h2>
            <motion.div
              className="h-1 sm:h-1.5 w-24 sm:w-32 mt-2 rounded-full"
              style={{ backgroundColor: "var(--primary-500)" }}
              initial={{ width: 0 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            variants={containerVariants}
          >
            <motion.p variants={itemVariants}>
              {t("about.team.description1")}
            </motion.p>
            <motion.p variants={itemVariants}>
              {t("about.team.description2")}
            </motion.p>
          </motion.div>

          <Link to="/auth">
            <motion.button
              className="mt-6 sm:mt-8 md:mt-10 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 md:px-10 rounded-lg transition-all text-sm sm:text-base"
              style={{ backgroundColor: "var(--primary-500)" }}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--primary-700)",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("about.team.join")}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroSection;