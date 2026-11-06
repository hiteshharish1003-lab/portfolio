"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // always start at the top on reload (the browser would otherwise restore the old scroll position)
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const bar = document.querySelector(".progress");
    const onScroll = ({ progress }) => bar && (bar.style.transform = `scaleX(${progress})`);
    lenis.on("scroll", onScroll);

    // lock scroll (at the top) until intro finishes
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("intro:done", start);

    return () => {
      window.removeEventListener("intro:done", start);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="progress" />
      {children}
    </>
  );
}
