import { Link } from "react-router-dom";
import ListCard, { SideBar } from "./components/homepage/BlogSection/ListCard";
import EncourageSection from "./components/homepage/EncourageSection/EncourageSection";
import ImageSide from "./components/homepage/HeroSection/ImageSide";
import Information from "./components/homepage/HeroSection/Information";
import FAQ from "./components/homepage/FAQ/FAQ";
import ReviewSection from "./components/homepage/ReviewSection/ReviewSection";
import ShareFeedback from "./components/homepage/ShareFeedBack/ShareFeedback";
import { useI18n } from "./i18n/useI18n";

function App() {
  const { t } = useI18n();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#FFF8ED] dark:bg-black relative overflow-hidden min-h-screen lg:min-h-0 py-12 lg:py-0 flex items-center">
        {/* Animated background elements - optimized for mobile */}
        <div className="absolute -top-20 -left-20 sm:-top-40 sm:-left-40 md:-top-80 md:-left-80 w-64 h-64 sm:w-100 sm:h-100 md:w-200 md:h-200 rounded-full opacity-30 sm:opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-5 right-5 sm:top-10 sm:right-10 md:top-20 md:right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-4 md:h-4 bg-primary-orange/20 rounded-full animate-float-slow" />
          <div className="absolute bottom-10 left-5 sm:bottom-20 sm:left-10 md:bottom-40 md:left-20 w-2 h-2 sm:w-3 sm:h-3 md:w-6 md:h-6 bg-primary-orange/10 rounded-full animate-float-delayed" />
          <div className="absolute top-10 left-1/4 sm:top-20 md:top-40 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-primary-orange/15 rounded-full animate-pulse-slow" />
        </div>

        {/* Main content grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            <Information />
            <ImageSide />
          </div>
        </div>

        {/* Bottom gradient element - optimized for mobile */}
        <div className="absolute -bottom-20 -right-20 sm:-bottom-50 sm:-right-50 md:-bottom-100 md:-right-50 w-64 h-64 sm:w-100 sm:h-100 md:w-200 md:h-200 rounded-full opacity-30 sm:opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto p-6 text-text-main font-sans h-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold whitespace-nowrap text-text-main">
                {t("home.topStory")}
              </h2>
              <div className="h-0.5 w-full bg-primary-orange"></div>
            </div>
            <ListCard />
          </div>
          <aside className="lg:w-1/3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 w-full">
                <h2 className="text-2xl font-bold text-text-main">
                  {t("home.latest")}
                </h2>
                <div className="h-0.5 grow bg-primary-orange"></div>
              </div>
              <Link to="/blogs" className="text-primary-orange font-bold ml-4">
                {t("home.viewAll")}
              </Link>
            </div>
            <SideBar />
          </aside>
        </div>
      </section>

      {/* EncourageSection */}
      <section className="relative pb-20 lg:pb-10 overflow-hidden">
        <EncourageSection />
      </section>

      {/* FAQ Section*/}
      <section className="py-20 lg:py-10">
        <FAQ />
      </section>

      {/*Review Section*/}
      <section className="py-20 lg:py-10 overflow-hidden">
        <ReviewSection />
      </section>
      <ShareFeedback />
      <section className="py-20 px-6 lg:px-20"></section>
    </main>
  );
}

export default App;
