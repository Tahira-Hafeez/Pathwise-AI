/**
 * Revised editorial style: an anonymous illustrated head opens on scroll, then
 * releases calm, symbolic career possibilities instead of showing any real face.
 */
import { Braces, ChartNoAxesColumnIncreasing, Cloud, MousePointer2, Palette, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import openingHead from "../assets/pathwise-opening-head_6e530f6c.webp";

const careerSymbols = [
  { label: "Engineering", icon: Braces, className: "symbol-code" },
  { label: "Data", icon: ChartNoAxesColumnIncreasing, className: "symbol-data" },
  { label: "Design", icon: Palette, className: "symbol-design" },
  { label: "Security", icon: ShieldCheck, className: "symbol-security" },
  { label: "Cloud", icon: Cloud, className: "symbol-cloud" },
  { label: "Product", icon: MousePointer2, className: "symbol-product" },
];

export default function ThoughtCloud() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const openWithScroll = () => {
      if (window.scrollY > 38) setOpened(true);
    };
    window.addEventListener("scroll", openWithScroll, { passive: true });
    return () => window.removeEventListener("scroll", openWithScroll);
  }, []);

  return (
    <div className={`thought-cloud ${opened ? "head-opened" : ""}`} aria-label="An illustrated head opening to reveal career possibilities as the visitor scrolls">
      <p className="open-prompt"><span />Scroll to open a possibility</p>
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-illustration-shell">
        <img className="hero-illustration" src={openingHead} alt="Sketch-style illustration of an anonymous head opened to career possibilities" />
        <div className="sketch-head-lid" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <div className="career-symbol-cloud" aria-hidden="true">
        {careerSymbols.map(({ label, icon: Icon, className }) => (
          <div className={`career-symbol ${className}`} key={label}>
            <Icon size={17} strokeWidth={2.2} />
            <span>{label}</span>
          </div>
        ))}
        <div className="confusion-mark mark-one">?</div>
        <div className="confusion-mark mark-two">?</div>
        <div className="confusion-mark mark-three">?</div>
      </div>
      <div className="hero-waypoint waypoint-a" />
      <div className="hero-waypoint waypoint-b" />
    </div>
  );
}
