"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Photo from "./Photo";

export default function ProjectImages({ images, alt, label }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const many = images.length > 1;

  // auto-advance (paused while the lightbox is open)
  useEffect(() => {
    if (!many || open) return;
    const t = setInterval(() => setI((v) => (v + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [many, open, images.length]);

  const step = useCallback((d) => setI((v) => (v + d + images.length) % images.length), [images.length]);

  // lightbox: lock scroll, keyboard controls
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const key = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      window.__lenis?.start();
    };
  }, [open, step]);

  return (
    <>
      <div className="slides-click" onClick={() => setOpen(true)} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)} aria-label="Open screenshot full size">
        {images.map((src, k) => (
          <div key={src} className={`slide ${k === i ? "on" : ""}`}>
            <Photo src={src} alt={alt} label={label} />
          </div>
        ))}
        <span className="enlarge">View full size ↗</span>
      </div>
      {many && (
        <div className="slide-dots">
          {images.map((_, k) => (
            <button key={k} aria-label={`Image ${k + 1}`} className={k === i ? "on" : ""} onClick={() => setI(k)} />
          ))}
        </div>
      )}
      {open &&
        createPortal(
          <div className="lightbox" onClick={() => setOpen(false)}>
            <button className="lb-close" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
            {many && <button className="lb-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}>←</button>}
            <img src={images[i]} alt={alt} onClick={(e) => e.stopPropagation()} />
            {many && <button className="lb-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}>→</button>}
            <div className="lb-cap" onClick={(e) => e.stopPropagation()}>{alt} · {i + 1} / {images.length}</div>
          </div>,
          document.body
        )}
    </>
  );
}
