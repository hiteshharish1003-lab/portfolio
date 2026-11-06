"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../lib/data";
import Photo from "./Photo";
import Marquee from "./Marquee";
import PortraitFragments from "./PortraitFragments";

gsap.registerPlugin(ScrollTrigger);

const CUTOUT = "/images/profile-cutout.png";

const split = (s) =>
  s.split("").map((c, i) => (
    <span className="mask" key={i}><span className="ch">{c === " " ? " " : c}</span></span>
  ));

export default function Hero() {
  const root = useRef(null);
  const [mode, setMode] = useState(null); // "cut" | "card"
  const cutRef = useRef(null);

  // pick layout: transparent cutout if it exists, otherwise framed photo
  useEffect(() => {
    const img = new Image();
    img.onload = () => setMode("cut");
    img.onerror = () => setMode("card");
    img.src = CUTOUT;
  }, []);

  useEffect(() => {
    if (!mode) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ paused: true });
      if (mode === "cut") {
        intro
          .from(".hero-glow", { opacity: 0, scale: 0.6, duration: 1.6, ease: "power2.out" }, 0)
          .from(".hero-back .ch", { yPercent: 120, stagger: 0.07, duration: 1.2, ease: "power4.out" }, 0)
          .from(".cut-img", { yPercent: 25, scale: 1.12, opacity: 0, filter: "blur(18px)", duration: 1.5, ease: "expo.out" }, 0.25)
          .from(".hero-fade", { y: 30, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }, 0.7);
      } else {
        intro
          .from(".hero-name .ch", { yPercent: 120, rotate: 4, stagger: 0.05, duration: 1.1, ease: "power4.out" })
          .from(".hero-photo", { clipPath: "inset(100% 0 0 0)", duration: 1.2, ease: "expo.out" }, 0.1)
          .from(".hero-photo .photo", { scale: 1.4, duration: 1.6, ease: "expo.out" }, 0.1)
          .from(".hero-fade", { y: 30, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" }, 0.5);
      }
      const play = () => intro.play();
      if (window.__introDone) play();
      else window.addEventListener("intro:done", play);

      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      if (mode === "cut") {
        gsap.to(".hero-back", { yPercent: -45, scale: 1.12, ease: "none", scrollTrigger: st });
        gsap.to(".cut-wrap", { yPercent: -6, ease: "none", scrollTrigger: st });
        gsap.to(".hero-glow", { opacity: 0, ease: "none", scrollTrigger: st });
        gsap.to(".hero-ui", { opacity: 0, ease: "none", scrollTrigger: { ...st, start: "20% top" } });

        // mouse-driven depth (desktop only)
        if (!window.matchMedia("(hover: none)").matches) {
          const q = (sel, prop, d) => gsap.quickTo(sel, prop, { duration: d, ease: "power3" });
          const bx = q(".hero-back-in", "x", 1.2), by = q(".hero-back-in", "y", 1.2);
          const px = q(".cut-img", "x", 0.9), py = q(".cut-img", "y", 0.9);
          const gx = q(".hero-glow", "x", 1.6), gy = q(".hero-glow", "y", 1.6);
          const move = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            bx(nx * -60); by(ny * -30);
            px(nx * 28); py(ny * 14);
            gx(nx * 140); gy(ny * 90);
          };
          window.addEventListener("mousemove", move);
          return () => { window.removeEventListener("mousemove", move); window.removeEventListener("intro:done", play); };
        }
      } else {
        gsap.to(".hero-name", { yPercent: -35, ease: "none", scrollTrigger: st });
        gsap.to(".hero-photo", { yPercent: 18, ease: "none", scrollTrigger: st });
        gsap.to(".hero-content", { opacity: 0, ease: "none", scrollTrigger: { ...st, start: "30% top" } });
      }
      return () => window.removeEventListener("intro:done", play);
    }, root);
    return () => ctx.revert();
  }, [mode]);

  if (!mode) return <section className="hero" id="top" ref={root} />;

  if (mode === "cut") {
    return (
      <section className="hero cut" id="top" ref={root}>
        <div className="hero-stage">
          <div className="hero-grid" />
          <div className="hero-contours" />
          <div className="hero-glow" />
          <h1 className="hero-back" aria-label={profile.name}>
            <span className="hero-back-in">{split("HITESH")}</span>
          </h1>
          <div className="cut-wrap">
            <img className="cut-img" src={CUTOUT} alt="Hitesh H" ref={cutRef} />
            <PortraitFragments imgRef={cutRef} />
          </div>
          <div className="hero-ui">
            <p className="hero-fade eyebrow"><b className="dot" /> {profile.status}</p>
            <div className="hero-fade ui-left">
              <p className="serif-line">Software, <em>AI</em> &amp; security,</p>
              <p className="serif-sub">built to last.</p>
            </div>
            <a href="#work" className="hero-fade now-card" data-hover>
              <span className="now-label">Now building</span>
              <svg viewBox="0 0 120 60" aria-hidden><path d="M8 40 C20 10 40 12 52 30 S84 54 98 24 L112 14" /><circle cx="112" cy="14" r="4" /></svg>
              <b>REAGENT</b>
              <small>Verified research assistant</small>
              <span className="now-foot">Full-stack · AI · 2026</span>
            </a>
            <div className="hero-fade ui-right">
              <span>CS Engineer</span><span>Class of 2027</span><span>{profile.location}</span>
              <span className="scroll-hint">Scroll ↓</span>
            </div>
          </div>
        </div>
        <div className="hero-fade hero-marquee">
          <Marquee items={["Software", "AI / ML", "Full-Stack", "Cybersecurity"]} outline speed={26} />
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-content">
        <p className="hero-fade eyebrow"><b className="dot" /> {profile.status}</p>
        <h1 className="hero-name" aria-label={profile.name}>
          <span className="line">{split("HITESH")}</span>
          <span className="line accent">{split("H.")}</span>
        </h1>
        <div className="hero-photo"><Photo src={profile.photo} alt="Hitesh H" label="HH" /></div>
        <p className="hero-fade hero-tag">{profile.tagline}</p>
        <div className="hero-fade hero-meta">
          <span>CS Engineer · Class of 2027</span>
          <span>{profile.location}</span>
          <span className="scroll-hint">Scroll ↓</span>
        </div>
      </div>
      <div className="hero-fade hero-marquee">
        <Marquee items={["Software", "AI / ML", "Full-Stack", "Cybersecurity"]} outline speed={26} />
      </div>
    </section>
  );
}
