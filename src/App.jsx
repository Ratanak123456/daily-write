import "./App.css";
import ImageSide from "./components/homepage/HeroSection/ImageSide";
import Information from "./components/homepage/HeroSection/Information";

function App() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#FFF8ED] dark:bg-black relative overflow-hidden py-12 lg:py-0 ">
        <div className="absolute -top-40 -left-40 md:-top-80 md:-left-80 w-100 h-100 md:w-200 md:h-200 rounded-full opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 md:top-20 md:right-20 w-2 h-2 md:w-4 md:h-4 bg-primary-orange/20 rounded-full animate-float-slow" />
          <div className="absolute bottom-20 left-10 md:bottom-40 md:left-20 w-3 h-3 md:w-6 md:h-6 bg-primary-orange/10 rounded-full animate-float-delayed" />
          <div className="absolute top-20 left-1/4 md:top-40 w-2 h-2 md:w-3 md:h-3 bg-primary-orange/15 rounded-full animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
          <Information />
          <ImageSide />
        </div>
        <div className="absolute -bottom-100 -right-50 w-100 h-100 md:w-200 md:h-200 rounded-full opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />
      </section>
    </main>
  );
}

export default App;
