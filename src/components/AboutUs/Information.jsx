import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, animationVariants, blobAnimation } from './hooks/useScrollAnimation';

const AboutSection = () => {
  const { controls, ref, isInView } = useScrollAnimation({ amount: 0.3 });

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
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: {
        delay: 0.5 + i * 0.1,
        type: 'spring',
        stiffness: 200,
      },
    }),
  };

  return (
    <section
      className="relative w-full py-12 px-4 sm:py-16 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      ref={ref}
    >
      {/* Decorative Background Circles */}
      <motion.div
        className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"
        style={{ backgroundColor: 'var(--primary-500)' }}
        animate={blobAnimation}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-20 -ml-32 -mb-32"
        style={{ backgroundColor: 'var(--primary-700)' }}
        animate={{ ...blobAnimation, scale: [1, 1.3, 1] }}
      />

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Left Content Column */}
        <motion.div className="z-10 order-2 lg:order-1" variants={containerVariants}>
          <motion.h2
            className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6"
            style={{ color: 'var(--primary-500)' }}
            variants={animationVariants.fadeInUp}
          >
            About Us
          </motion.h2>
          <motion.h1
            className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-6"
            style={{ color: 'var(--text-primary)' }}
            variants={animationVariants.fadeInUp}
          >
            A Community of{' '}
            <motion.span
              style={{ color: 'var(--primary-500)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Writers
            </motion.span>
            , <br className="hidden sm:block" />
            Thinkers &{' '}
            <motion.span
              style={{ color: 'var(--primary-500)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Curious Minds
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
            variants={animationVariants.fadeInUp}
          >
            At DailyWrite, we believe that ideas have the power to inspire change and spark
            meaningful conversations. Our platform is built to provide an open space where
            writers can share insights, readers can explore diverse perspectives, and
            communities can grow through thoughtful discussion. Whether you're passionate
            about technology, daily life, or general topics, DailyWrite empowers every voice
            to be heard.
          </motion.p>
          <motion.button
            className="font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg text-white"
            style={{ backgroundColor: 'var(--primary-500)' }}
            variants={animationVariants.fadeInUp}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'var(--primary-700)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Right Illustration Column */}
        <motion.div
          className="relative flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
          variants={illustrationVariants}
        >
          {/* Main "Browser" Container */}
          <motion.div
            className="relative p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Header Dots */}
            <motion.div className="flex space-x-2 mb-4 sm:mb-6">
              {['#ef4444', '#f59e0b', '#10b981'].map((color, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                  variants={dotVariants}
                  custom={i}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </motion.div>

            {/* Placeholder Content for Illustration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <motion.div
                className="space-y-3 sm:space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
              >
                <motion.div
                  className="h-6 sm:h-8 w-3/4 rounded"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                  variants={animationVariants.fadeInUp}
                />
                <motion.div
                  className="h-3 sm:h-4 w-full rounded"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                  variants={animationVariants.fadeInUp}
                />
                <motion.div
                  className="h-3 sm:h-4 w-5/6 rounded"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                  variants={animationVariants.fadeInUp}
                />
                <motion.div
                  className="h-8 sm:h-10 w-20 sm:w-24 rounded mt-2 sm:mt-4"
                  style={{ backgroundColor: 'var(--primary-500)', opacity: 0.2 }}
                  variants={animationVariants.fadeInUp}
                />
              </motion.div>

              {/* Character Illustration Area */}
              <motion.div
                className="rounded-lg h-48 sm:h-56 md:h-64 flex items-center justify-center border-2 border-dashed"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--primary-500)',
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'var(--primary-700)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.span
                  className="font-medium text-sm sm:text-base"
                  style={{ color: 'var(--primary-500)' }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Character Illustration
                </motion.span>
              </motion.div>
            </div>

            {/* Decorative Plant - Hidden on mobile, visible on md and up */}
            <motion.div
              className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-16 sm:w-20 md:w-24 h-24 sm:h-28 md:h-32 rounded-t-full hidden md:block"
              style={{ backgroundColor: 'var(--primary-700)' }}
              animate={{
                y: [0, -5, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute -top-8 sm:-top-10 md:-top-12 left-2 sm:left-3 md:left-4 w-3 sm:w-3.5 md:w-4 h-8 sm:h-10 md:h-12 rounded-full"
                style={{ backgroundColor: 'var(--primary-500)' }}
                animate={{
                  rotate: [12, 15, 12],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -top-6 sm:-top-8 md:-top-10 left-6 sm:left-8 md:left-10 w-3 sm:w-3.5 md:w-4 h-8 sm:h-10 md:h-12 rounded-full"
                style={{ backgroundColor: 'var(--primary-600)' }}
                animate={{
                  rotate: [-12, -15, -12],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Floating Elements - Hidden on mobile */}
          <motion.div
            className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-opacity-20 hidden md:block"
            style={{ backgroundColor: 'var(--primary-500)' }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-opacity-20 hidden md:block"
            style={{ backgroundColor: 'var(--primary-700)' }}
            animate={{
              y: [0, 10, 0],
              x: [0, -5, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
