import SmoothScroll from "../components/SmoothScroll";
import Loader from "../components/Loader";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Journey from "../components/Journey";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Certifications />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
