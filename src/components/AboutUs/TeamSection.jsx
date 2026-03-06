import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useI18n } from "../../i18n/useI18n";

const IntroSection = () => {
  const { controls, ref, isInView } = useScrollAnimation({ amount: 0.3 });
  const { t } = useI18n();

  const teamMembers = [
    {
      id: 1,
      color: "var(--primary-500)",
      name: "John Doe",
      role: "Founder & Writer",
    },
    {
      id: 2,
      color: "var(--text-secondary)",
      name: "Jane Smith",
      role: "Content Lead",
    },
    {
      id: 3,
      color: "var(--text-primary)",
      name: "Mike Johnson",
      role: "Tech Editor",
    },
  ];

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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.3 + i * 0.1,
      },
    }),
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
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
          className="relative order-2 lg:order-1 mt-8 lg:mt-0"
          variants={itemVariants}
        >
          {/* Large Abstract Background Blob */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl"
            style={{ backgroundColor: "var(--primary-500)", opacity: 0.1 }}
            variants={blobVariants}
            initial="hidden"
            animate={["visible", "animate"]}
          />

          <motion.div
            className="relative z-10 rounded-xl shadow-xl p-4 sm:p-5 md:p-6"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.h3
              className="text-center font-bold text-base sm:text-lg md:text-xl tracking-widest mb-4 sm:mb-6 uppercase"
              style={{ color: "var(--text-secondary)" }}
              variants={itemVariants}
            >
              {t("about.team.cardTitle")}
            </motion.h3>

            {/* Horizontal Line Placeholders */}
            <motion.div
              className="space-y-1 sm:space-y-2 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <motion.div
                className="h-0.5 sm:h-1 w-full rounded-full"
                style={{ backgroundColor: "var(--text-primary)", opacity: 0.8 }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.div
                className="h-0.5 sm:h-1 w-full rounded-full"
                style={{ backgroundColor: "var(--text-primary)", opacity: 0.8 }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
              <motion.div
                className="h-0.5 sm:h-1 w-2/3 rounded-full"
                style={{ backgroundColor: "var(--text-primary)", opacity: 0.8 }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "66.666667%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
            </motion.div>

            {/* Team Cards Grid */}
            <motion.div
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              variants={containerVariants}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="rounded-lg overflow-hidden flex flex-col cursor-pointer"
                  style={{
                    borderColor: "var(--border-color)",
                  }}
                  variants={cardVariants}
                  custom={index}
                  whileHover="hover"
                >
                  {/* Avatar Placeholder */}
                  <motion.div
                    className="h-28 xs:h-32 sm:h-36 md:h-40 flex items-end justify-center relative overflow-hidden"
                    style={{ backgroundColor: member.color }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="w-12 xs:w-14 sm:w-16 h-16 xs:h-20 sm:h-24 rounded-t-full"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />

                    {/* Floating particles for hover effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                            opacity: 0,
                          }}
                          animate={{
                            x: ["50%", `${30 + i * 20}%`],
                            y: ["50%", `${20 + i * 15}%`],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Card Bottom Text Placeholder */}
                  <motion.div
                    className="p-2 sm:p-3 space-y-1.5 sm:space-y-2"
                    style={{ backgroundColor: "var(--text-primary)" }}
                    whileHover={{ backgroundColor: "var(--primary-500)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="h-0.5 sm:h-1 w-full rounded"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                      animate={{
                        width: ["100%", "80%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    />
                    <motion.div
                      className="h-0.5 sm:h-1 w-2/3 rounded"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                    />
                    <div className="flex justify-end pt-0.5 sm:pt-1">
                      <motion.div
                        className="h-0.5 sm:h-1 w-3 sm:w-4 rounded"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.2,
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
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
