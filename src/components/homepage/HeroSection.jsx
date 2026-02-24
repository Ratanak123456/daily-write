import heropic from "../../assets/homepage/Untitled design.svg";
import Button from "../Button/Button";

export default function HeroSection() {
  return (
    <section className="bg-[#FFF8ED] dark:bg-black relative min-h-screen overflow-hidden flex items-center">
      {/* Animated background orb */}
      <div className="absolute -top-80 -left-80 w-200 h-200 rounded-full opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />

      {/* Floating particles for background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-4 h-4 bg-primary-orange/20 rounded-full animate-float-slow" />
        <div className="absolute bottom-40 left-20 w-6 h-6 bg-primary-orange/10 rounded-full animate-float-delayed" />
        <div className="absolute top-40 left-1/4 w-3 h-3 bg-primary-orange/15 rounded-full animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-start relative z-10 pt-0">
        {/* Left Content */}
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-text-main leading-tight animate-fade-in-up">
            <span className="text-primary-orange inline-block animate-wave">A</span> Community-Driven
            <span className="text-primary-orange block mt-2 animate-slide-in-right">
              {" "}
              Platform for Sharing Ideas, Engaging in Discussion
            </span>
          </h1>
          
          <p className="mt-6 text-text-sub text-lg leading-relaxed animate-fade-in-up-delay animate-slide-in-bottom">
            DailyWrite is an open blogging platform where users share insights
            on technology, daily life, and general topics while engaging in
            thoughtful discussion and meaningful interaction.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up-delay-2">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Button
                title="Explore Blogs"
                backgroundColor="bg-primary-orange"
                hoverColor="bg-primary-orange-dark"
                textColor="text-white"
              />
            </div>
            <button className="px-8 py-3 border-2 border-border-main bg-white text-text-sub font-bold rounded-lg hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transform hover:-translate-y-1">
              Explore Blogs
            </button>
          </div>
        </div>

        {/* Right Content - Image with Cards */}
        <div className="relative flex items-center justify-center">
          <div className="relative group">
            {/* Main Image Container */}
            <div className="relative z-0 bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)] rounded-full w-150 h-150 flex items-center justify-center p-8 animate-float-slow">
              <img
                src={heropic}
                alt="Blogging Illustration"
                className="w-full h-full object-contain transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 dark:shadow-gray-800 animate-pulse-glow"
              />
            </div>

            {/* Rating Card */}
            <div className="absolute -top-6 right-4 lg:right-10 bg-bg-main p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-in shadow-orange-100 dark:shadow-gray-800 dark:bg-gray-800 dark:border dark:border-gray-700 z-10 hover:scale-110 transition-transform duration-300">
              <div className="text-yellow-400 text-xl animate-pulse-slow">★</div>
              <div>
                <p className="text-sm font-bold text-text-main dark:text-white">
                  4.8
                </p>
                <p className="text-[10px] text-text-sub dark:text-gray-400">
                  Satisfaction
                </p>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute w-[120%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(255,237,213,1)_0%,rgba(255,251,247,0)_70%)] blur-2xl opacity-80 -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-[radial-gradient(circle,rgba(55,65,81,0.8)_0%,rgba(31,41,55,0)_70%)] animate-pulse-slow"></div>

            {/* Learners Card */}
            <div className="absolute -bottom-8 left-4 lg:-left-6 bg-bg-main p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-border-main dark:bg-gray-800 dark:border-gray-700 z-10 animate-slide-in-left hover:scale-110 transition-transform duration-300">
              <div className="w-10 h-10 bg-primary-orange rounded-xl flex items-center justify-center text-white animate-bounce-subtle">
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
            </div>

            {/* Courses Card */}
            <div className="absolute bottom-10 -right-4 lg:-right-8 bg-bg-main p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-border-main dark:bg-gray-800 dark:border-gray-700 z-10 animate-slide-in-right hover:scale-110 transition-transform duration-300">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}