import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Resume from "../components/Resume.jsx";
import Skill from "../components/Skill.jsx";
import Project from "../components/Project.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Resume />
      <Skill />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
