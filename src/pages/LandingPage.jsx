import MainNavigation from "../components/MainNavigation";
import HeroSection from "../components/HeroSection";

function LandingPage() {
  return (
    <div className="items-center justify-center">
      <MainNavigation />
      <div className="max-w-5xl mx-auto pt-20 px-6">
        <HeroSection />
      </div>
    </div>
  );
}

export default LandingPage;
