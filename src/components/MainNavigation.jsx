import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Logo from "../../public/icon.svg";

function MainNavigation() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  function toggleNavBar() {
    setMobileDrawerOpen((prevState) => !prevState);
  }

  return (
    <nav className="sticky top-0 z-50 py-3 bakdrop-blur-sm bg-apple-grey/90 border-b">
      <div className="container px-5 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="text-lg font-semibold tracking-tight">
              <Link to={"/"} className="flex flex-row text-xl">
                <img src={Logo} alt="Your SVG" className="w-8 h-8 mr-1" />
                whisperingwallet
              </Link>
            </span>
          </div>
          <div className="hidden lg:flex justify-center font-medium space-x-12 items-center">
            <Link to={"/login"} className="py-2 px-3">
              Login
            </Link>
            <Button colorScheme="messenger" size="md">
              <Link to={"/register"} className="py-2 px-3 font-medium">
                Register
              </Link>
            </Button>
          </div>
          <div className="lg:hidden md_flex flex-col justify-end">
            <button onClick={toggleNavBar}>
              {mobileDrawerOpen ? <RxCross1 /> : <MdMenu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="bakdrop-blur-sm bg-apple-grey/90  fixed right-0 z-20 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <div className="flex space-x-6">
              <Link to={"/login"} className="py-2 px-3 font-medium">
                Login
              </Link>
              <Button colorScheme="messenger" size="md">
                <Link to={"/register"} className="py-2 px-3">
                  Register
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNavigation;
