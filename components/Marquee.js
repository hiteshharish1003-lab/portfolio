export default function Marquee({ items, outline = false, reverse = false, speed = 30 }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${outline ? "outline" : ""}`}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {row.map((t, i) => (
          <span key={i}>{t}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}
