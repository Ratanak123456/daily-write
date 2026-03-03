import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Clock, Send, Check, X } from 'lucide-react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const ContactSection = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { controls, ref } = useScrollAnimation({ amount: 0.2 });

  const contactDetails = [
    {
      icon: <MessageCircle size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: "Chat to discuss",
      text: "Have a question? Chat with us live — we're here to help!",
      link: "ratanaksaren3@gmail.com",
      href: "mailto:ratanaksaren3@gmail.com",
    },
    {
      icon: <Phone size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: "Call to Talk",
      text: "Got a question? Call us — we're here to help!",
      link: "+855 114 194 70",
      href: "tel:+85511419470",
    },
    {
      icon: <MapPin size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: "Address",
      text: "Visit us at our office — we'd love to meet you!",
      link: "Phnom Penh - Cambodia",
      href: "#",
    },
    {
      icon: <Clock size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      title: "Available",
      text: "We're available Monday to Friday, 9 AM to 6 PM.",
      link: "Contact us",
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
        type: 'spring',
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
        type: 'spring',
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
        type: 'spring',
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
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay: 0.5 + i * 0.1,
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
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
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: 'var(--primary-500)',
      transition: {
        type: 'spring',
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
        ease: 'easeInOut',
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
      style={{ backgroundColor: 'var(--bg-primary)' }}
      ref={ref}
    >
      {/* Decorative Background Blobs */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: 'var(--primary-500)' }}
        variants={floatingBlobVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: 'var(--primary-700)' }}
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
        {/* Top Section: Form and Illustration */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20 items-center"
          variants={containerVariants}
        >
          {/* Left: Contact Form */}
          <motion.div
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              borderWidth: '1px',
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
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                    First name
                  </label>
                  <motion.input
                    type="text"
                    placeholder="First name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    whileFocus="focus"
                    variants={inputVariants}
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                    Last name
                  </label>
                  <motion.input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    whileFocus="focus"
                    variants={inputVariants}
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                  Email
                </label>
                <motion.input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                  Subject
                </label>
                <motion.input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                  Message
                </label>
                <motion.textarea
                  rows="4"
                  placeholder="Message"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none transition-all text-sm resize-none"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--primary-500)' }}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'var(--primary-700)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                Submit
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Right: Illustration and Text */}
          <motion.div
            className="text-center lg:text-left"
            variants={illustrationVariants}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 md:mb-8"
              style={{ color: 'var(--primary-500)' }}
              variants={itemVariants}
            >
              Get in touch
            </motion.h2>

            {/* Illustration Area */}
            <motion.div
              className="relative mx-auto lg:mx-0 w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 sm:mb-6 md:mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-4504060-3736970.png"
                alt="Contact Illustration"
                className="w-full h-auto drop-shadow-2xl"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                style={{ backgroundColor: 'var(--primary-500)', opacity: 0.2 }}
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                style={{ backgroundColor: 'var(--primary-700)', opacity: 0.2 }}
                animate={{
                  scale: [1, 1.4, 1],
                  x: [0, -5, 0],
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
              style={{ color: 'var(--text-secondary)' }}
              variants={itemVariants}
            >
              Looking to make a deal or start a collaboration? We're excited to
              hear from you! Get in touch with us today, and let's discuss how we
              can work together to achieve great things.
            </motion.p>
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
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
              }}
              variants={cardVariants}
              custom={idx}
              whileHover="hover"
            >
              <motion.div
                className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
                variants={iconVariants}
                whileHover="hover"
              >
                <motion.div style={{ color: 'var(--primary-500)' }}>
                  {item.icon}
                </motion.div>
              </motion.div>

              <motion.h3
                className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </motion.h3>

              <motion.p
                className="text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.text}
              </motion.p>

              <motion.a
                href={item.href}
                className="font-semibold text-xs sm:text-sm underline flex items-center gap-1"
                style={{ color: 'var(--primary-500)' }}
                whileHover={{
                  scale: 1.05,
                  color: 'var(--primary-700)',
                  x: 2,
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {item.link}
                <motion.span
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
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
              style={{ backgroundColor: 'var(--primary-500)' }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Check size={18} className="text-white" />
              <span className="text-white text-sm font-medium">Message sent successfully!</span>
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
