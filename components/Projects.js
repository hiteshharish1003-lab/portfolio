"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../lib/data";
import ProjectImages from "./ProjectImages";

gsap.registerPlugin(ScrollTrigger);

function LinkBtn({ href, children }) {
  return href ? (
    <a className="btn" href={href} target="_blank" rel="noreferrer">{children} ↗</a>
  ) : (
    <span className="btn disabled">{children} · soon</span>
  );
}

export default function Projects() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".proj");
      cards.forEach((card, i) => {
        gsap.from(card.querySelectorAll(".proj-title .ch"), {
          yPercent: 110, stagger: 0.015, duration: 0.8, ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 70%" },
        });
        gsap.to(card.querySelector(".proj-img .slides"), {
          yPercent: -10, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
        if (cards[i + 1]) {
          gsap.to(card.querySelector(".proj-inner"), {
            scale: 0.92, opacity: 0.35, ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 12%", scrub: true },
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section work" id="work" ref={root}>
      <div className="label">( 02 ) Selected Work</div>
      <h2 className="big">Projects<span className="accent">.</span></h2>

      <div className="proj-stack">
        {projects.map((p) => (
          <article className="proj" key={p.n}>
            <div className="proj-inner">
              <div className="proj-top">
                <span className="proj-n">{p.n}</span>
                <span className="proj-years">{p.years}</span>
              </div>
              <h3 className="proj-title" aria-label={p.title}>
                {p.title.split(" ").map((word, wi) => (
                  <span className="word" key={wi}>
                    {word.split("").map((c, ci) => (
                      <span className="mask" key={ci}><span className="ch">{c}</span></span>
                    ))}
                    {" "}
                  </span>
                ))}
              </h3>
              <div className="proj-body">
                <div className="proj-img" data-hover>
                  <div className="slides">
                  <ProjectImages images={p.images || [p.image]} alt={p.title} label={p.n} />
                  </div>
                </div>
                <div className="proj-info">
                  <div className="tags">
                    <span className="tag solid">{p.type}</span>
                    <span className="tag">{p.role}</span>
                  </div>
                  <ul>{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                  <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                  <div className="proj-links">
                    <LinkBtn href={p.github}>GitHub</LinkBtn>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
