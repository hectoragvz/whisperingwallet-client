import MainNavigation from "../components/MainNavigation";
import HeroSection from "../components/HeroSection";
import { IoLogoGithub } from "react-icons/io";

function LandingPage() {
  return (
    <div>
      <MainNavigation />
      <div className="flex flex-col min-h-screen items-center">
        <div className="max-w-5xl mx-auto pt-20 px-6">
          <HeroSection />
        </div>
        <div className="flex items-center pb-10 mt-auto shrink-0 text-center text-neutral-500 text-base italic">
          <p className="pr-2">
            Powered by{" "}
            <a
              className="underline "
              href="https://www.bytescale.com/"
              target="_blank"
            >
              Bytescale
            </a>
            ,{" "}
            <a
              className="underline "
              href="https://replicate.com/"
              target="_blank"
            >
              Replicate
            </a>
            , and{" "}
            <a
              className="underline "
              href="https://mistral.ai/"
              target="_blank"
            >
              Mistral AI.
            </a>
          </p>
          <a
            href="https://github.com/hectoragvz/whisperingwallet-client"
            target="_blank"
          >
            <IoLogoGithub />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
