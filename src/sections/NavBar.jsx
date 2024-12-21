import { useState, React } from "react";
import { navLinks } from "../constants";
import { useEffect, useRef } from "react"; // Add these imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const NavBar = () => {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down
          gsap.to(navRef.current, {
            duration: 0.5,
            yPercent: -100,
            ease: "power4.out",
          });
        } else {
          // Scrolling up
          gsap.to(navRef.current, {
            duration: 0.5,
            yPercent: 0,
            ease: "power4.out",
          });
        }

        lastScrollY.current = currentScrollY;
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const NavItems = () => {
    return (
      <ul className="nav-ul">
        {navLinks.map(({ id, name, href }) => (
          <li key={id} className="nave-li">
            <a href={href} className="nav-li_a">
              {name}
            </a>
          </li>
        ))}
      </ul>
    );
  };
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => {
    setToggle((prev) => !prev);
  };
  return (
    <header
      ref={navRef}
      className="text-white fixed top-0 left-0 right-0 z-50 bg-black/90"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-5 mx-auto c-space">
          <a
            href="/"
            className="text-neutral-400 font-bold text-xl hover:text-white transition-colors"
          >
            {
              <img
                width={"75px"}
                src="/assets/bYAHAV_logo1.svg"
                alt="logo"
              ></img>
            }
          </a>
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white transition-colors focus:outline-none sm:hidden flex"
            aria-label="toggle menu"
          >
            <img
              src={toggle ? "assets/close.svg" : "assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>
          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
        </div>
      </div>
      <div className={`nav-sidebar ${toggle ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
