import React from "react";
import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";
import { Toaster } from "react-hot-toast";
import Footer from "./sections/Footer";
import Experience from "./sections/Experience";
import HeroText from "./components/heroText";
const App = () => {
  return (
    <div className="min-w-7xl mx-auto">
      <Toaster position="top-right" />

      <NavBar />
      <Hero />
      <About />
      <Projects />
      {/* <Clients /> */}
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
