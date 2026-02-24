import Button from "../../Button/Button";

export default function Information() {
  return (
    <div className="max-w-2xl text-center lg:text-left order-2 lg:order-1">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-text-main leading-tight animate-fade-in-up">
        <span className="text-primary-orange inline-block animate-wave">A</span>{" "}
        Community-Driven
        <span className="text-primary-orange block mt-1 sm:mt-2 animate-slide-in-right text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
          Platform for Sharing Ideas, Engaging in Discussion
        </span>
      </h1>

      <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-text-sub leading-relaxed animate-fade-in-up-delay animate-slide-in-bottom max-w-xl mx-auto lg:mx-0">
        DailyWrite is an open blogging platform where users share insights on
        technology, daily life, and general topics while engaging in thoughtful
        discussion and meaningful interaction.
      </p>

      <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up-delay-2">
        <div className="transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
          <Button
            link="blogs"
            title="Explore Blogs"
            backgroundColor="bg-primary-orange"
            hoverColor="bg-primary-orange-dark"
            textColor="text-white"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          />
        </div>
        <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 border-2 border-border-main bg-white text-text-sub font-bold rounded-lg hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all duration-300 hover:shadow-lg hover:shadow-primary-orange/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transform hover:-translate-y-1 text-sm sm:text-base">
          Learn More
        </button>
      </div>
    </div>
  );
}
