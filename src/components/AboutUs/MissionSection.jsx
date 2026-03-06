import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  MessageSquare,
  Lightbulb,
  FileText,
  Users,
  ShieldCheck,
} from "lucide-react";
import {
  useScrollAnimation,
  animationVariants,
  iconVariants,
  blobAnimation,
} from "./hooks/useScrollAnimation";
import { useI18n } from "../../i18n/useI18n";

const MissionSection = () => {
  const { controls, ref, isInView } = useScrollAnimation({ amount: 0.2 });
  const { t } = useI18n();

  const missions = [
    {
      title: t("about.mission.qualityTitle"),
      description: t("about.mission.qualityDesc"),
      icon: <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    },
    {
      title: t("about.mission.communityTitle"),
      description: t("about.mission.communityDesc"),
      icon: <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    },
    {
      title: t("about.mission.freshTitle"),
      description: t("about.mission.freshDesc"),
      icon: <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    },
    {
      title: t("about.mission.regularTitle"),
      description: t("about.mission.regularDesc"),
      icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    },
    {
      title: t("about.mission.diverseTitle"),
      description: t("about.mission.diverseDesc"),
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    },
    {
      title: t("about.mission.trustedTitle"),
      description: t("about.mission.trustedDesc"),
      icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    },
  ];

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 30 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <section
      className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-6 lg:px-8"
      style={{ backgroundColor: "var(--bg-primary)" }}
      ref={ref}
    >
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: "var(--primary-500)" }}
        animate={{
          ...blobAnimation,
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: "var(--primary-700)" }}
        animate={{
          ...blobAnimation,
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          variants={animationVariants.staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            style={{ color: "var(--text-primary)" }}
            variants={animationVariants.fadeInUp}
          >
            {t("about.mission.headingPrefix")}{" "}
            <motion.span
              className="relative inline-block"
              style={{ color: "var(--primary-500)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("about.mission.headingHighlight")}
              <motion.div
                className="absolute -bottom-1 left-0 h-1 rounded-full"
                style={{ backgroundColor: "var(--primary-500)" }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4"
            style={{ color: "var(--text-secondary)" }}
            variants={animationVariants.fadeInUp}
          >
            {t("about.mission.intro")}
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
          variants={animationVariants.staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {missions.map((item, index) => (
            <motion.div
              key={index}
              className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-col items-center text-center cursor-pointer"
              style={{
                backgroundColor: "var(--bg-secondary)",
              }}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              {/* Icon Container */}
              <motion.div
                className="w-12 h-12 sm:h-14 md:w-14 sm:w-16 md:h-16 rounded-full flex items-center justify-center shadow-sm mb-4 sm:mb-5 md:mb-6"
                style={{
                  backgroundColor: "var(--bg-primary)",
                }}
                variants={iconVariants}
                whileHover="hover"
              >
                <motion.div style={{ color: "var(--primary-500)" }}>
                  {item.icon}
                </motion.div>
              </motion.div>

              <motion.h3
                className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4"
                style={{ color: "var(--primary-500)" }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.title}
              </motion.h3>

              <motion.p
                className="text-xs sm:text-sm md:text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {item.description}
              </motion.p>

              {/* Decorative corner accent on hover */}
              <motion.div
                className="absolute top-0 right-0 w-0 h-0 rounded-tr-xl"
                style={{
                  borderTop: "3px solid var(--primary-500)",
                  borderRight: "3px solid var(--primary-500)",
                }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                whileHover={{
                  width: "20px",
                  height: "20px",
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0 rounded-bl-xl"
                style={{
                  borderBottom: "3px solid var(--primary-500)",
                  borderLeft: "3px solid var(--primary-500)",
                }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                whileHover={{
                  width: "20px",
                  height: "20px",
                  opacity: 1,
                  transition: { duration: 0.2, delay: 0.1 },
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { value: "500+", label: t("about.mission.statArticles") },
            { value: "10k+", label: t("about.mission.statReaders") },
            { value: "50+", label: t("about.mission.statWriters") },
            { value: "4.8", label: t("about.mission.statRating") },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-3 sm:p-4 rounded-lg"
              style={{ backgroundColor: "var(--bg-secondary)" }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ color: "var(--primary-500)" }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 1.2 + index * 0.1,
                }}
              >
                {stat.value}
              </motion.div>
              <motion.div
                className="text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
