import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../assets/about/Get in touch-cuate.svg"
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  X,
} from "lucide-react";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import { useI18n } from "../../i18n/useI18n";

const ContactSection = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { controls, ref } = useScrollAnimation({ amount: 0.2 });
  const { t } = useI18n();

  const contactDetails = [
    {
      icon: <MessageCircle size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: t("about.contact.chatTitle"),
      text: t("about.contact.chatText"),
      link: "ratanaksaren3@gmail.com",
      href: "mailto:ratanaksaren3@gmail.com",
    },
    {
      icon: <Phone size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: t("about.contact.callTitle"),
      text: t("about.contact.callText"),
      link: "+855 114 194 70",
      href: "tel:+85511419470",
    },
    {
      icon: <MapPin size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: t("about.contact.addressTitle"),
      text: t("about.contact.addressText"),
      link: t("about.contact.addressValue"),
      href: "#",
    },
    {
      icon: <Clock size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: t("about.contact.availableTitle"),
      text: t("about.contact.availableText"),
      link: t("about.contact.contactUs"),
      href: "#",
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
    hidden: { y: 20, opacity: 0 },
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

  const formVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const illustrationVariants = {
    hidden: { x: 30, opacity: 0, scale: 0.9 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
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
        delay: 0.5 + i * 0.1,
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "var(--primary-500)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const floatingBlobVariants = {
    animate: {
      scale: [1, 1.2, 1],
      x: [0, 20, 0],
      y: [0, -20, 0],
      rotate: [0, 30, 0],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section
      className="relative py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
      ref={ref}
    >
      {/* Decorative Background Blobs */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: "var(--primary-500)" }}
        variants={floatingBlobVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: "var(--primary-700)" }}
        variants={floatingBlobVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6"
            style={{ color: "var(--primary-500)" }}
          >
            {t("about.contact.getInTouch")}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("about.contact.description")}
          </motion.p>
        </motion.div>

        {/* Top Section: Form and Illustration */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20 items-center"
          variants={containerVariants}
        >
          {/* Left: Contact Form */}
          <motion.div
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
              borderWidth: "1px",
            }}
            variants={formVariants}
          >
            <motion.form
              className="space-y-4 sm:space-y-5 md:space-y-6"
              variants={containerVariants}
              onSubmit={handleSubmit}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("about.contact.firstName")}
                  </label>
                  <motion.input
                    type="text"
                    placeholder={t("about.contact.firstName")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    whileFocus="focus"
                    variants={inputVariants}
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("about.contact.lastName")}
                  </label>
                  <motion.input
                    type="text"
                    placeholder={t("about.contact.lastName")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    whileFocus="focus"
                    variants={inputVariants}
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("about.contact.email")}
                </label>
                <motion.input
                  type="email"
                  placeholder={t("about.contact.email")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("about.contact.subject")}
                </label>
                <motion.input
                  type="text"
                  placeholder={t("about.contact.subject")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("about.contact.message")}
                </label>
                <motion.textarea
                  rows="4"
                  placeholder={t("about.contact.message")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm resize-none"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--primary-500)" }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "var(--primary-700)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                {t("about.contact.submit")}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            className="flex justify-center items-center"
            variants={illustrationVariants}
          >
            {/* Illustration Area */}
            <motion.div
              className="relative mx-auto lg:mx-0 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mb-4 sm:mb-6 md:mb-8"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src={image}
                alt="Contact Illustration"
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
          
        </motion.div>

        {/* Bottom Section: Info Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          variants={containerVariants}
        >
          {contactDetails.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl flex flex-col items-start cursor-pointer border"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
              variants={cardVariants}
              custom={idx}
              whileHover="hover"
            >
              <motion.div
                className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4"
                style={{ backgroundColor: "var(--bg-secondary)" }}
                variants={iconVariants}
                whileHover="hover"
              >
                <motion.div style={{ color: "var(--primary-500)" }}>
                  {item.icon}
                </motion.div>
              </motion.div>

              <motion.h3
                className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </motion.h3>

              <motion.p
                className="text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.text}
              </motion.p>

              <motion.a
                href={item.href}
                className="font-semibold text-xs sm:text-sm underline flex items-center gap-1"
                style={{ color: "var(--primary-500)" }}
                whileHover={{
                  scale: 1.05,
                  color: "var(--primary-700)",
                  x: 2,
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.link}
                <motion.span
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Message Popup */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
              style={{ backgroundColor: "var(--primary-500)" }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Check size={18} className="text-white" />
              <span className="text-white text-sm font-medium">
                {t("about.contact.success")}
              </span>
              <button
                onClick={() => setShowSuccess(false)}
                className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ContactSection;
