import { heroThoughts } from "../data/mockData";

export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="head-shape"></div>
      {heroThoughts.map((t, i) => (
        <div key={i} className={`thought ${t.dim ? "dim" : ""} t${i + 1}`}>
          {t.text}
        </div>
      ))}
    </div>
  );
}
