import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useI18n } from "../../i18n/useI18n";
import image from "../../assets/about/Team page-bro.svg"
import { Link } from "react-router-dom";

const IntroSection = () => {
  const { controls, ref, isInView } = useScrollAnimation({ amount: 0.3 });
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

  const blobVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 0.6,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.1,
      },
    },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      borderRadius: [
        "40% 60% 70% 30% / 40% 50% 60% 50%",
        "50% 50% 50% 50% / 50% 50% 50% 50%",
        "30% 70% 40% 60% / 60% 40% 60% 40%",
        "40% 60% 70% 30% / 40% 50% 60% 50%",
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="relative w-full py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
      ref={ref}
    >
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-5 left-5 sm:top-10 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full"
        style={{ backgroundColor: "var(--primary-500)" }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-10 sm:top-20 -left-10 sm:-left-20 w-32 sm:w-40 h-32 sm:h-40 rounded-full opacity-30"
        style={{ borderColor: "var(--primary-500)", borderWidth: "1px" }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

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
              <motion.span
                style={{ color: "var(--primary-500)" }}
                animate={{
                  textShadow: [
                    "0 0 0px var(--primary-500)",
                    "0 0 10px var(--primary-500)",
                    "0 0 0px var(--primary-500)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t("about.team.we")}
              </motion.span>
              ?
            </motion.h2>
            <motion.div
              className="h-1 sm:h-1.5 w-24 sm:w-32 mt-2 rounded-full"
              style={{ backgroundColor: "var(--primary-500)" }}
              initial={{ width: 0 }}
              animate={isInView ? { width: "8rem" } : { width: 0 }}
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

      {/* Bottom Decorative Circle */}
      <motion.div
        className="absolute -bottom-5 sm:-bottom-8 md:-bottom-10 left-1/4 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 rounded-full opacity-60 sm:opacity-80"
        style={{ backgroundColor: "var(--primary-500)" }}
        animate={{
          y: [0, -10, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default IntroSection;
