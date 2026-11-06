"use client";
import { useEffect, useState } from "react";
import { profile } from "../lib/data";

const links = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["Journey", "#journey"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    window.__lenis?.scrollTo(href, { offset: 0, duration: 1.6 });
  };
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) window.__lenis?.stop();
    else if (window.__introDone) window.__lenis?.start();
  }, [open]);

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo" onClick={(e) => go(e, "#top")} aria-label="Home">
          <span className="logo-s">Hitesh</span>
          <span className="logo-b">H<i>.</i></span>
        </a>
        <div className="nav-right">
          <a className="nav-cta" href={profile.resume} target="_blank" rel="noreferrer">Resume ↓</a>
          <button className={`menu-btn ${open ? "is-open" : ""}`} aria-label="Menu" onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </header>
      <div className={`menu ${open ? "open" : ""}`}>
        <nav>
          {links.map(([l, h], i) => (
            <a key={h} href={h} onClick={(e) => go(e, h)}><em>0{i + 1}</em>{l}</a>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
    </>
  );
}
