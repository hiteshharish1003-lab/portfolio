"use client";
import { useState } from "react";

export default function Photo({ src, alt, label, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`}>
      {!failed && <img src={src} alt={alt} onError={() => setFailed(true)} loading="lazy" />}
      {failed && <span className="photo-fallback">{label}</span>}
    </div>
  );
}
