"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "../lib/data";
import Photo from "./Photo";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".cert").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section certs" id="certs" ref={root}>
      <div className="label">( 05 ) Certifications</div>
      <h2 className="big">Certified<span className="accent">.</span></h2>
      <div className="cert-grid">
        {certifications.map((c, i) => (
          <a className="cert" key={c.file} href={`/certificates/${c.file}.pdf`} target="_blank" rel="noreferrer" data-hover>
            <div className="cert-img">
              <Photo src={`/certificates/${c.file}.jpg`} alt={c.title} label={`0${i + 1}`} />
            </div>
            <div className="cert-info">
              <span className="cert-issuer">{c.issuer}</span>
              <h4>{c.title}</h4>
              <p>{c.note}</p>
              <span className="cert-foot"><em>{c.date}</em><i>View certificate ↗</i></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
