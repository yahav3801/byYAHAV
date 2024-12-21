import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroText = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const maskedTextRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const updateMousePosition = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };
  const tl = gsap.timeline();

  useGSAP(() => {
    tl.from(titleRef.current, {
      x: -50,
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
    tl.from(textRef.current, {
      x: -50,
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const maskSize = isHovered ? 240 : 40;

  return (
    <div className="w-full h-screen relative z-10" ref={containerRef}>
      <div className="h-full flex flex-col md:items-start items-center justify-center">
        {/* Title */}
        <div ref={titleRef} className="overflow-hidden">
          <p className="sm:text-3xl text-xl font-medium text-white md:text-left text-center font-generalsans">
            Hi, I am Yahav <span className="waving-hand">👋</span>
          </p>
        </div>

        {/* Main Text */}
        <div
          ref={textRef}
          className="w-full relative flex md:justify-start justify-center mt-6 overflow-hidden"
        >
          <p
            className="hero_tag text-gray_gradient max-w-md md:text-left text-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            A Web designer with skills that haven't been replaced by A.I (yet)
            making good stuff only if the paycheck is as good.
          </p>
        </div>

        {/* Masked Text */}
        <motion.div
          className="font-generalsans absolute inset-0 flex items-center md:justify-start justify-center pointer-events-none"
          style={{
            maskImage: 'url("/assets/mask3.svg")',
            WebkitMaskImage: `url("/assets/mask3.svg")`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            filter: "brightness(1.3)",
            backgroundColor: "#E0DDCA",
          }}
          animate={{
            maskSize: `${maskSize}px`,
            WebkitMaskSize: `${maskSize}px`,
            maskPosition: `${mousePosition.x - maskSize / 2}px ${
              mousePosition.y - maskSize / 2
            }px`,
            WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${
              mousePosition.y - maskSize / 2
            }px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        >
          <div className="flex flex-col md:items-start items-center justify-center h-full">
            <p className="sm:text-3xl text-xl font-medium !text-black-300 md:text-left text-center font-generalsans mb-6">
              <span className="waving-hand">🤫</span>
            </p>
            <div className="overflow-hidden">
              <p
                ref={maskedTextRef}
                className="hero_tag !text-black-300 font-generalsans max-w-md md:text-left text-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                I'm a selectively skilled developer with strong focus on
                producing high quality & impactful digital experiences.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
