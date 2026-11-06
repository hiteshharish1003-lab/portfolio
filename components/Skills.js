"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../lib/data";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", { y: 60, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".skill-grid", start: "top 80%" } });
      gsap.to(".m1 .marquee-track", { xPercent: -8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section skills" id="skills" ref={root}>
      <div className="label">( 03 ) Toolkit</div>
      <h2 className="big">Skills<span className="accent">.</span></h2>
      <div className="skill-grid">
        {skills.map((g) => (
          <div className={`skill-card ${g.accent ? "exploring" : ""}`} key={g.group} data-hover>
            <h4>{g.group}</h4>
            <div>{g.items.map((i) => <span key={i}>{i}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="m1">
        <Marquee items={["Python", "PyTorch", "React", "FastAPI", "Next.js", "Docker", "Java", "SQL"]} outline reverse speed={40} />
      </div>
    </section>
  );
}
