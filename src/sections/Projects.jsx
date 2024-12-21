import React, { Suspense, useState } from "react";
import { myProjects } from "../constants";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader";
import DemoComputer from "../components/DemoComputer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Projects = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const handleNavigation = (direction, event) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);

    switch (direction) {
      case (direction = "previous"):
        setSelectedProject(selectedProject === 0 ? 3 : (prev) => prev - 1);
        break;
      case (direction = "next"):
        setSelectedProject(selectedProject === 3 ? 0 : (prev) => prev + 1);
        break;
    }
  };
  const currentProject = myProjects[selectedProject];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#work",
        start: "top center",
      },
    });

    tl.from("#spotlight, #logo", {
      opacity: 0,
      ease: "power1.inOut",
    })
      .from("#title, #desc, #subdesc", {
        opacity: 0,
        x: -50,
        ease: "power3.inOut",
        stagger: 0.2,
      })
      .from(
        ".tech-logo",
        {
          opacity: 0,
          rotate: -90,
          x: -50,
          ease: "power2.inOut",
          stagger: 0.2,
        },
        "-=0.2"
      );
  }, [selectedProject]);

  return (
    <section className="c-space my-20" id="work">
      <p className="head-text">My Work</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 w-full gap-5">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 ">
          <div className="absolute top-0 right-0" id="spotlight">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            id="logo"
            style={currentProject.logoStyle}
          >
            <img src={currentProject.logo} className="w-10 h-10 shadow-sm" />
          </div>
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold" id="title">
              {currentProject.title}
            </p>
            <p className="animatedText" id="desc">
              {currentProject.desc}
            </p>
            <p className="animatedText" id="subdesc">
              {currentProject.subdesc}
            </p>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo" id={tag.name}>
                  <img src={tag.path} alt={tag.name}></img>
                </div>
              ))}
            </div>
            <a
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 cursor-pointer text-white-600"
            >
              <p>Check Live Site</p>
              <img src="/assets/arrow-up.png" className="w-3 h-3" alt="arrow" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              disabled={isDisabled}
              className="arrow-btn"
              onClick={(event) => handleNavigation("previous", event)}
            >
              <img src="/assets/left-arrow.png" alt="previous-button" />
            </button>
            <button
              disabled={isDisabled}
              className="arrow-btn"
              onClick={(event) => handleNavigation("next", event)}
            >
              <img src="/assets/right-arrow.png" alt="next-button" />
            </button>
          </div>
        </div>
        <div className="border-black-300 border bg-black-200 rounded-lg md:h-full">
          <Canvas>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer
                    texture={currentProject.texture}
                    currentProject={currentProject}
                  />
                </group>
              </Suspense>
            </Center>
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
            ></OrbitControls>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
