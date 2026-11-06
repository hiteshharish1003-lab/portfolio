"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, education } from "../lib/data";
import Photo from "./Photo";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bio .w",
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".bio", start: "top 80%", end: "bottom 45%", scrub: true } }
      );
      gsap.from(".about-photo", { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".about-photo", start: "top 85%" } });
      gsap.to(".about-photo .photo", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".about-photo", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".stat", { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".stats", start: "top 85%" } });
      gsap.from(".chip-i", { scale: 0.6, opacity: 0, stagger: 0.07, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: ".interests", start: "top 90%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={root}>
      <div className="label">( 01 ) About</div>
      <div className="about-grid">
        <p className="bio">
          {profile.bio.split(" ").map((w, i) => (
            <span className="w" key={i}>{w} </span>
          ))}
        </p>
        <div className="about-photo"><Photo src={profile.photo2} alt="Hitesh at work" label="PHOTO" /></div>
      </div>

      <div className="stats">
        <div className="stat"><b>{education.cgpa}</b><span>CGPA</span></div>
        <div className="stat"><b>03</b><span>Major projects</span></div>
        <div className="stat"><b>2027</b><span>Graduating</span></div>
        <div className="stat"><b>{education.degree.replace("B.E. in ", "")}</b><span>{education.school}</span></div>
      </div>

      <div className="interests">
        <span className="small-label">Off the keyboard</span>
        <div>
          {profile.interests.map((t) => (
            <span className="chip-i" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
