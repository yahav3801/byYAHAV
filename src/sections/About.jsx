import React, { useState, useRef } from "react";
import Globe from "react-globe.gl";
import Button from "../components/Button";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const globeRef = useRef();
  const globeContainerRef = useRef();

  useGSAP(() => {
    gsap.set(globeContainerRef.current, { opacity: 0, y: 50 });

    gsap.to(globeContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: globeContainerRef.current,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.5;
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("ybh00790@gmail.com");
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  useGSAP(() => {
    const gridItems = gsap.utils.toArray(".gridItem");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    gridItems.map((item, index) => {
      let fromVars = {
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      };

      switch (index) {
        case 0:
          fromVars.x = -100;
          break;
        case 1:
          fromVars.y = -100;
          break;
        case 2:
          fromVars.x = 100;
          break;
        case 3:
          fromVars.y = 100;
          break;
        case 4:
          fromVars.x = 100;
          break;
      }

      tl.from(item, fromVars, "-=0.5");
    });
  }, []);

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-col-2 grid-col-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3 gridItem">
          <div className="grid-container">
            <img
              src="/assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Hi, I'm Yahav</p>
              <p className="grid-subtext">
                I have honed my skills in frontend and backend development, with
                a focus on animated 3D websites.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3 gridItem">
          <div className="grid-container">
            <img
              src="/assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in JavaScript/TypeScript with a focus on React and
                Next.js ecosystems.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4 gridItem">
          <div className="grid-container">
            <div
              ref={globeContainerRef}
              className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center"
            >
              <Globe
                ref={globeRef}
                height={326}
                width={326}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 32,
                    lng: 35,
                    text: "I'm here!",
                    color: "white",
                  },
                ]}
                enablePointerInteraction={false}
              />
            </div>
            <div>
              <p className="grid-headtext">
                I work remotly across most timezones
              </p>
              <p className="grid-subtext">
                I'm based in Israel, with remote work availble.
              </p>
              <a href="#contact">
                <Button
                  name="Contact Me"
                  isBeam
                  containerClass={"w-full mt-10"}
                ></Button>
              </a>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3 gridItem">
          <div className="grid-container">
            <img
              src="/assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Coding
                isn't just my profession - it is my passion.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2 gridItem">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[266px] h-fit object-contain"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Email me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="grid-4"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray-gradient text-white">
                  ybh00790@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;