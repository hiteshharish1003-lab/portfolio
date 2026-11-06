"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.body.classList.add("has-cursor");
    const xd = gsap.quickTo(dot.current, "x", { duration: 0.1 });
    const yd = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    const xr = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yr = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const move = (e) => { xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY); };
    const over = (e) => {
      const hot = e.target.closest("a, button, [data-hover]");
      ring.current.classList.toggle("hot", !!hot);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ring} />
      <div className="cursor-dot" ref={dot} />
    </>
  );
}
