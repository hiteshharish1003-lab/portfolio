"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { signature } from "../lib/signature";

export default function Loader() {
  const root = useRef(null);
  const num = useRef(null);

  useEffect(() => {
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.__introDone = true;
          window.dispatchEvent(new Event("intro:done"));
          if (root.current) root.current.style.display = "none";
        },
      });
      tl.from(".ld-card", { scale: 0.7, opacity: 0, duration: 1, ease: "expo.out" })
        .from(".ld-row-a", { xPercent: 12, duration: 3.2, ease: "power2.out" }, 0)
        .from(".ld-row-b", { xPercent: -12, duration: 3.2, ease: "power2.out" }, 0)
        .from(".ld-row", { opacity: 0, duration: 0.8 }, 0)
        .from(".ld-cut", { yPercent: 12, duration: 1.2, ease: "power3.out" }, 0.2)
        .fromTo(".sig-reveal", { attr: { width: 0 } }, { attr: { width: signature.w + 20 }, duration: 1.9, ease: "power1.inOut" }, 0.9)
        .to(counter, {
          v: 100, duration: 2.4, ease: "power2.inOut",
          onUpdate: () => num.current && (num.current.textContent = String(Math.round(counter.v)).padStart(3, "0")),
        }, 0.2)
        .to(".ld-card", { scale: 1.06, duration: 0.5, ease: "power2.in" }, ">0.1")
        .to(".ld-inner", { opacity: 0, duration: 0.35 }, "<0.1")
        .to(root.current, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.1");
    }, root);
    return () => ctx.revert();
  }, []);

  const A = "ENGINEERING SOFTWARE THAT'S ✦ ";
  const B = "SMART, SCALABLE & SECURE ✦ ";
  return (
    <div className="loader" ref={root}>
      <div className="ld-row ld-row-a"><span>{A.repeat(3)}</span></div>
      <div className="ld-row ld-row-b"><span>{B.repeat(3)}</span></div>
      <div className="ld-card">
        <img className="ld-cut" src="/images/profile-cutout.png" alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
        <svg className="ld-sig" viewBox={`-10 -10 ${signature.w + 20} ${signature.h + 20}`} aria-hidden>
          <defs>
            <mask id="sigMask" maskUnits="userSpaceOnUse" x="-10" y="-10" width={signature.w + 20} height={signature.h + 20}>
              <rect className="sig-reveal" x="-10" y="-10" width={signature.w + 20} height={signature.h + 20} fill="#fff" />
            </mask>
          </defs>
          <path d={signature.d} fillRule="evenodd" mask="url(#sigMask)" />
        </svg>
      </div>
      <div className="ld-inner ld-meta">
        <span>Hitesh H · Portfolio {new Date().getFullYear()}</span>
        <span ref={num}>000</span>
      </div>
    </div>
  );
}
