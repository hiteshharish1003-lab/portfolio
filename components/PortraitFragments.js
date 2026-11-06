"use client";
import { useEffect, useRef } from "react";

/*
  Portrait glitch: hovering ANY opaque part of the photo separates it into layers —
  horizontal slices that tear sideways, RGB channel layers pulled apart, jittering blocks and a
  lime scan line, all centred on the cursor and fading with distance. One rAF loop that only runs
  while the effect is visible/settling. Same public API as before (imgRef).
*/
const NW = 960, NH = 1280, LIME = "#c8ff00", PAD = 40;
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// horizontal bands of irregular height (stable)
const bands = []; for (let y = 0, i = 0; y < NH; i++) { const h = 5 + Math.floor(hash(i + 1) * hash(i + 9) * 70) + 3; bands.push({ y, h: Math.min(h, NH - y), i }); y += h; }

export default function PortraitFragments({ imgRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current, canvas = canvasRef.current;
    if (!img || !canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const touchOnly = window.matchMedia("(hover: none)").matches;
    const ctx = canvas.getContext("2d");
    let L = null, G = null, O = 0, dpr = 1, raf = 0, last = 0, t = 0;
    let env = 0, target = 0, sticky = false, cx = NW / 2, cy = NH / 4, tx = cx, ty = cy, bx = cx, by = cy, dwell = 0;

    const geom = () => {
      const r = img.getBoundingClientRect();
      if (!r.width || !img.naturalWidth) return null;
      const s = Math.min(r.width / NW, r.height / NH), w = NW * s, h = NH * s;
      return { left: r.left + (r.width - w) / 2, top: r.bottom - h, w, h };
    };
    const ready = () => img.complete && img.naturalWidth && parseFloat(getComputedStyle(img).opacity) > 0.97;
    const layer = (src, fn) => { const c = document.createElement("canvas"); c.width = src.width; c.height = src.height; const g = c.getContext("2d"); g.drawImage(src, 0, 0); fn && fn(g, c); return c; };
    const ensure = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const S = Math.round(G.w * dpr) / NW;
      if (L && Math.abs(L.S - S) / S < 0.004) return;
      const lw = Math.round(NW * S), lh = Math.round(NH * S);
      const base = document.createElement("canvas"); base.width = lw; base.height = lh; base.getContext("2d").drawImage(img, 0, 0, lw, lh);
      const fill = (col) => layer(base, (g) => { g.globalCompositeOperation = "source-atop"; g.fillStyle = col; g.fillRect(0, 0, lw, lh); });
      const chan = (col) => layer(base, (g) => { g.globalCompositeOperation = "multiply"; g.fillStyle = col; g.fillRect(0, 0, lw, lh); g.globalCompositeOperation = "destination-in"; g.drawImage(base, 0, 0); });
      const mc = document.createElement("canvas"); mc.width = lw; mc.height = lh;
      L = { S, lw, lh, mc, base, bctx: base.getContext("2d"), dark: fill("#000"), lime: fill(LIME), red: chan("#ff2a00"), cyan: chan("#00f0ff") };
      O = Math.round(PAD * dpr);
      canvas.width = lw + 2 * O; canvas.height = lh + 2 * O;
      canvas.style.width = canvas.width / dpr + "px"; canvas.style.height = canvas.height / dpr + "px";
    };

    const draw = () => {
      const S = L.S, W = L.lw;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (env < 0.01) return;
      const step = Math.floor(t * 11); // stepped time => digital, not smooth

      // 4b) biometric wireframe wrapped around the head, point cloud, orbit ring, data bars
      {
        const hx = 445, hy = 255, rx = 120, ry = 172, m = L.mc.getContext("2d"), P = Math.PI / 180;
        m.globalCompositeOperation = "source-over"; m.clearRect(0, 0, W, L.lh);
        m.strokeStyle = LIME; m.lineWidth = Math.max(1, dpr * 0.7); m.globalAlpha = 0.9; m.beginPath();
        for (let a = -80; a <= 80; a += 16) for (let j = 0; j <= 24; j++) {
          const v = -1 + j / 12, x = hx + rx * Math.sin(a * P) * Math.sqrt(Math.max(0, 1 - v * v)), y = hy + ry * v;
          j ? m.lineTo(x * S, y * S) : m.moveTo(x * S, y * S);
        }
        for (let b = -80; b <= 80; b += 16) for (let j = 0; j <= 20; j++) {
          const u = -1 + j / 10, x = hx + rx * Math.cos(b * P) * u, y = hy + ry * Math.sin(b * P) + 16 * (1 - u * u) * Math.cos(b * P);
          j ? m.lineTo(x * S, y * S) : m.moveTo(x * S, y * S);
        }
        m.stroke();
        m.globalCompositeOperation = "destination-in"; m.drawImage(L.base, 0, 0); // keep only on the person
        const rg = m.createRadialGradient(cx * S, cy * S, 0, cx * S, cy * S, 460 * S);
        rg.addColorStop(0, "rgba(0,0,0,1)"); rg.addColorStop(0.6, "rgba(0,0,0,.7)"); rg.addColorStop(1, "rgba(0,0,0,0)");
        m.fillStyle = rg; m.fillRect(0, 0, W, L.lh);
        ctx.save(); ctx.globalAlpha = 0.6 * env; ctx.drawImage(L.mc, O, O); ctx.restore();

        ctx.save(); ctx.fillStyle = LIME;
        for (let i = 0; i < 70; i++) { // drifting point cloud
          const ang = hash(i) * 6.283, d = (8 + hash(i + 3) * 80) * env * (0.55 + 0.45 * Math.sin(t * 1.5 + i));
          const px = hx + (rx * 1.04 + d) * Math.cos(ang), py = hy + (ry * 1.04 + d) * Math.sin(ang), sz = (hash(i + 5) < 0.2 ? 2.6 : 1.5) * dpr;
          ctx.globalAlpha = (0.35 + 0.6 * hash(i + 7)) * env; ctx.fillStyle = hash(i + 9) < 0.7 ? LIME : "#f2f2ee";
          ctx.fillRect(O + px * S, O + py * S, sz, sz);
        }
        for (let i = 0; i < 7; i++) { // data bars
          const k = i * 13 + step, side = hash(k) > 0.5 ? 1 : -1;
          ctx.globalAlpha = 0.85 * env; ctx.fillStyle = hash(k + 1) > 0.4 ? LIME : "#f2f2ee";
          ctx.fillRect(O + (hx + side * (rx + 6 + hash(k + 2) * 90)) * S, O + (hy + (hash(k + 3) - 0.5) * ry * 1.8) * S, (16 + hash(k + 4) * 60) * S, Math.max(1, (2 + hash(k + 5) * 2) * S));
        }
        ctx.strokeStyle = LIME; ctx.lineWidth = dpr; ctx.setLineDash([5 * dpr, 6 * dpr]); ctx.lineDashOffset = -t * 20 * dpr;
        for (const [ex, ey, w, a] of [[250, 50, 0.35, 0.5], [290, 70, -0.2, 0.3]]) { // orbit rings
          ctx.globalAlpha = a * env; ctx.beginPath(); ctx.ellipse(O + hx * S, O + (hy + 70) * S, ex * S, ey * S, w, 0, 6.283); ctx.stroke();
        }
        ctx.restore();
      }
    };

    const tick = (now) => {
      raf = 0; const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      G = geom(); if (!G) { canvas.style.display = "none"; return; }
      ensure();
      const w = canvas.parentElement.getBoundingClientRect();
      canvas.style.transform = `translate3d(${G.left - O / dpr - w.left}px, ${G.top - O / dpr - w.top}px, 0)`;
      if (sticky) { tx = bx + Math.sin(t * 0.8) * 70; ty = by + Math.cos(t * 1.15) * 80; }
      env += (target - env) * (1 - Math.exp(-dt * (target > env ? 12 : 6)));
      if (target > 0.5) dwell += dt; else if (env < 0.05) dwell = 0;
      const f = 1 - Math.exp(-dt * 12); cx += (tx - cx) * f; cy += (ty - cy) * f;
      if (env > 0.004 || target > 0) { canvas.style.display = "block"; draw(); raf = requestAnimationFrame(tick); }
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = "none"; }
    };
    const run = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };

    // is the pixel under the pointer part of the person (opaque)?
    const hit = (px, py) => {
      const g = geom(); if (!g) return null;
      const u = (px - g.left) / g.w, v = (py - g.top) / g.h;
      if (u < 0 || u > 1 || v < 0 || v > 1) return { u, v, on: false };
      if (!ready()) return null;
      G = g; ensure();
      const a = L.bctx.getImageData(Math.min(L.lw - 1, Math.floor(u * L.lw)), Math.min(L.lh - 1, Math.floor(v * L.lh)), 1, 1).data[3];
      return { u, v, on: a > 40 };
    };
    const snap = (p) => { bx = tx = p.u * NW; by = ty = p.v * NH; if (env < 0.02) { cx = tx; cy = ty; } };
    const onMove = (e) => {
      if (touchOnly || sticky) return;
      const p = hit(e.clientX, e.clientY); if (!p) return;
      if (p.on) { if (target === 0) snap(p); tx = p.u * NW; ty = p.v * NH; target = 1; run(); }
      else if (target) { target = 0; run(); }
    };
    const release = () => { sticky = false; target = 0; run(); };
    const onDown = (e) => {
      if (e.pointerType === "mouse") return;
      if (sticky) return release();
      const p = hit(e.clientX, e.clientY);
      if (p && p.on) { snap(p); sticky = true; target = 1; run(); }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseleave", release);
    window.addEventListener("blur", release);
    const io = new IntersectionObserver(([en]) => { if (!en.isIntersecting && (target || env)) release(); }, { threshold: 0.1 });
    io.observe(img);
    return () => {
      cancelAnimationFrame(raf); raf = 0;
      window.removeEventListener("mousemove", onMove); window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", release); window.removeEventListener("blur", release); io.disconnect();
    };
  }, [imgRef]);

  return <canvas ref={canvasRef} className="frag-canvas" aria-hidden="true" />;
}
