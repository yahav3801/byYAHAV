import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "../components/HackerRoom";
import CanvasLoader from "../components/CanvasLoader";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import { PerspectiveCamera } from "@react-three/drei";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";
import HeroText from "../components/heroText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section
      className="min-h-screen w-full flex flex-col md:flex-row relative"
      id="home"
    >
      {/* Left side - Canvas */}
      <div
        className="md:w-1/2 w-full md:h-screen h-[45vh] order-2 md:order-1 relative"
        id="canvas-container"
      >
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 20]} />
          <Suspense fallback={<CanvasLoader />}>
            <HeroCamera
              isMobile={isMobile}
              isTablet={isTablet}
              isSmall={isSmall}
            >
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0.2, 3.5, 0]}
              />
            </HeroCamera>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.3} position={[10, 10, 10]} />
          </Suspense>
        </Canvas>
      </div>

      {/* Right side - Hero Text */}
      <div className="md:w-1/2 w-full md:h-screen h-[55vh] flex flex-col justify-center md:items-start items-center px-8 relative z-10 order-1 md:order-2">
        <HeroText />
      </div>

      {/* Button - Centered on all screen sizes */}
      <div className="absolute z-10 bottom-10 left-1/2 transform -translate-x-1/2 w-auto">
        <a href="#contact" className="w-full">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-full w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
