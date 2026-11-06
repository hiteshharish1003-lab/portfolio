"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education, activities } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tl-item", { x: -40, opacity: 0, stagger: 0.18, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".timeline", start: "top 80%" } });
      gsap.fromTo(".tl-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 70%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const items = [
    { when: education.year, title: education.degree, org: education.school, text: `CGPA ${education.cgpa}. Focused on software engineering, AI and machine learning.` },
    ...activities,
  ];

  return (
    <section className="section journey" id="journey" ref={root}>
      <div className="label">( 04 ) Journey</div>
      <h2 className="big">Education &amp; <br />Activities<span className="accent">.</span></h2>
      <div className="timeline">
        <div className="tl-line" />
        {items.map((it) => (
          <div className="tl-item" key={it.title}>
            <span className="tl-dot" />
            <span className="tl-when">{it.when}</span>
            <h3>{it.title}</h3>
            <p className="tl-org">{it.org}</p>
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
