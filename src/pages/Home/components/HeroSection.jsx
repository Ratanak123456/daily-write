import heropic from "../../../assets/homepage/hero-illustration.svg";
import Button from "../../../components/Button/Button";
import { motion } from "framer-motion";
import { useScrollAnimation, animationVariants } from "../../../hooks/useScrollAnimation";

export default function HeroSection() {
  const { controls, ref, isInView } = useScrollAnimation({ amount: 0.1, id: 'home-hero' });

  return (
    <section ref={ref} className="bg-bg-main relative min-h-screen overflow-hidden flex items-center">
      {/* Animated background orb */}
      <div className="absolute -top-80 -left-80 w-200 h-200 rounded-full opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />

      {/* Floating particles for background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-4 h-4 bg-primary-orange/20 rounded-full" />
        <div className="absolute bottom-40 left-20 w-6 h-6 bg-primary-orange/10 rounded-full" />
        <div className="absolute top-40 left-1/4 w-3 h-3 bg-primary-orange/15 rounded-full animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-start relative z-10 pt-0">
        {/* Left Content */}
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={animationVariants.staggerContainer}
          className="max-w-2xl"
        >
          <motion.h1 
            variants={animationVariants.fadeInUp}
            className="text-4xl lg:text-6xl font-extrabold text-text-main leading-tight"
          >
            <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
              <span className="text-primary-orange">A</span>
              <span>Community-Driven</span>
            </span>
            <span className="text-primary-orange block mt-2">
              Platform for Sharing Ideas, Engaging in Discussion
            </span>
          </motion.h1>

          <motion.p 
            variants={animationVariants.fadeInUp}
            className="mt-6 text-text-sub text-lg leading-relaxed"
          >
            DailyWrite is an open blogging platform where users share insights
            on technology, daily life, and general topics while engaging in
            thoughtful discussion and meaningful interaction.
          </motion.p>

          <motion.div 
            variants={animationVariants.fadeInUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Button
                title="Explore Blogs"
                backgroundColor="bg-primary-orange"
                hoverColor="hover:bg-primary-orange-dark"
                textColor="text-white"
              />
            </div>
            <button className="px-8 py-3 border-2 border-border-main bg-white text-text-sub font-bold rounded-lg hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transform hover:-translate-y-1">
              Explore Blogs
            </button>
          </motion.div>
        </motion.div>

        {/* Right Content - Image with Cards */}
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={animationVariants.fadeInScale}
          className="relative flex items-center justify-center"
        >
          <div className="relative group">
            {/* Main Image Container */}
            <div className="relative z-0 bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)] rounded-full w-150 h-150 flex items-center justify-center p-8">
              <img
                src={heropic}
                alt="Blogging Illustration"
                className="w-full h-full object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 dark:shadow-gray-800 animate-pulse-glow"
              />
            </div>

            {/* Rating Card */}
            <motion.div 
              variants={animationVariants.fadeInUp}
              className="absolute -top-6 right-4 lg:right-10 bg-bg-main p-4 rounded-2xl shadow-xl flex items-center gap-3 shadow-orange-100 dark:shadow-gray-800 dark:bg-gray-800 dark:border dark:border-gray-700 z-10 hover:scale-110 transition-transform duration-300"
            >
              <div className="text-yellow-400 text-xl animate-pulse-slow">
                ★
              </div>
              <div>
                <p className="text-sm font-bold text-text-main dark:text-white">
                  4.8
                </p>
                <p className="text-[10px] text-text-sub dark:text-gray-400">
                  Satisfaction
                </p>
              </div>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute w-[120%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(255,237,213,1)_0%,rgba(255,251,247,0)_70%)] blur-2xl opacity-80 -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-[radial-gradient(circle,rgba(55,65,81,0.8)_0%,rgba(31,41,55,0)_70%)] animate-pulse-slow"></div>

            {/* Learners Card */}
            <motion.div 
              variants={animationVariants.fadeInUp}
              className="absolute -bottom-8 left-4 lg:-left-6 bg-bg-main p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-border-main dark:bg-gray-800 dark:border-gray-700 z-10 hover:scale-110 transition-transform duration-300"
            >
              <div className="w-10 h-10 bg-primary-orange rounded-xl flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-sub dark:text-gray-400">
                  Learners
                </p>
                <p className="text-sm font-bold text-text-main dark:text-white">
                  500 +
                </p>
              </div>
            </motion.div>

            {/* Courses Card */}
            <motion.div 
              variants={animationVariants.fadeInUp}
              className="absolute bottom-10 -right-4 lg:-right-8 bg-bg-main p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-border-main dark:bg-gray-800 dark:border-gray-700 z-10 hover:scale-110 transition-transform duration-300"
            >
              <div className="w-10 h-10 bg-text-sub rounded-xl flex items-center justify-center text-white dark:bg-gray-600 animate-spin-slow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-text-main dark:text-white">
                  100+
                </p>
                <p className="text-[10px] text-text-sub dark:text-gray-400">
                  Courses
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
