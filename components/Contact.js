"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".c-line .ch", { yPercent: 115, stagger: 0.03, duration: 1, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 60%" } });
      gsap.from(".c-fade", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".c-mail", start: "top 90%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  const split = (s) => s.split("").map((c, i) => <span className="mask" key={i}><span className="ch">{c === " " ? " " : c}</span></span>);

  return (
    <section className="section contact" id="contact" ref={root}>
      <div className="label">( 06 ) Contact</div>
      <h2 className="c-big" aria-label="Let's build something">
        <span className="c-line">{split("LET'S BUILD")}</span>
        <span className="c-line accent">{split("SOMETHING.")}</span>
      </h2>
      <p className="c-fade c-sub">Open to internships and full-time roles. Say hello.</p>
      <a className="c-mail c-fade" href={`mailto:${profile.email}`}>{profile.email}</a>
      <div className="c-links c-fade">
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="btn solid" href={profile.resume} target="_blank" rel="noreferrer">Download Resume ↓</a>
      </div>
      <footer>
        <span>© {new Date().getFullYear()} Hitesh H</span>
        <span>{profile.location}</span>
        <button onClick={() => window.__lenis?.scrollTo(0, { duration: 2 })}>Back to top ↑</button>
      </footer>
    </section>
  );
}
