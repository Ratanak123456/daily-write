import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/about/About us page-cuate.svg"
import {
  useScrollAnimation,
  animationVariants,
  blobAnimation,
} from "./hooks/useScrollAnimation";
import { useI18n } from "../../i18n/useI18n";

const AboutSection = () => {
  const { controls, ref } = useScrollAnimation({ amount: 0.3 });
  const { t } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const illustrationVariants = {
    hidden: { scale: 0.8, opacity: 0, x: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4,
      },
    },
  };


  return (
    <section
      className="relative w-full py-12 px-4 sm:py-16 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
      ref={ref}
    >
      {/* Decorative Background Circles */}
      <motion.div
        className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"
        style={{ backgroundColor: "var(--primary-500)" }}
        animate={blobAnimation}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-20 -ml-32 -mb-32"
        style={{ backgroundColor: "var(--primary-700)" }}
        animate={{ ...blobAnimation, scale: [1, 1.3, 1] }}
      />

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Left Content Column */}
        <motion.div
          className="z-10 order-2 lg:order-1"
          variants={containerVariants}
        >
          <motion.h2
            className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6"
            style={{ color: "var(--primary-500)" }}
            variants={animationVariants.fadeInUp}
          >
            {t("about.sectionTitle")}
          </motion.h2>
          <motion.h1
            className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-6"
            style={{ color: "var(--text-primary)" }}
            variants={animationVariants.fadeInUp}
          >
            A Community of{" "}
            <motion.span
              style={{ color: "var(--primary-500)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("about.heroHighlight1")}
            </motion.span>
            , <br className="hidden sm:block" />
            {t("about.heroMiddle")}{" "}
            <motion.span
              style={{ color: "var(--primary-500)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("about.heroHighlight2")}
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl"
            style={{ color: "var(--text-secondary)" }}
            variants={animationVariants.fadeInUp}
          >
            {t("about.heroDescription")}
          </motion.p>
          <motion.button
            className="font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg text-white"
            style={{ backgroundColor: "var(--primary-500)" }}
            variants={animationVariants.fadeInUp}
            whileHover={{
              scale: 1.05,
              backgroundColor: "var(--primary-700)",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t("about.learnMore")}
          </motion.button>
        </motion.div>

        {/* Right Illustration Column */}
        <motion.div
          className="relative flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
          variants={illustrationVariants}
        >
          <motion.img
            src={image}
            alt="About Us Illustration"
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto"
            whileHover={{
              scale: 1.05,
              rotate: 1,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
        
      </motion.div>
    </section>
  );
};

export default AboutSection;
