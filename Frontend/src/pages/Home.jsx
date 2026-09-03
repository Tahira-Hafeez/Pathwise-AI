import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroVisual from "../components/HeroVisual";
import Button from "../components/Button";
import ThoughtCard from "../components/ThoughtCard";
import ProcessCard from "../components/ProcessCard";
import ModeCard from "../components/ModeCard";
import { stuckThoughts, processSteps, careerModes } from "../data/mockData";

export default function Home() {
  const rootRef = useRef(null);

  // Scroll-reveal animation for anything with the .reveal class
  useEffect(() => {
    const els = rootRef.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in"), idx * 60);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">You're not behind</div>
          <h1>
            Too many paths.
            <br />
            No idea which
            <br />
            one is <span className="accent">yours?</span>
          </h1>
          <p>
            Tell us where you are, where you want to go, and we'll help you
            figure out what comes next — one clear step at a time.
          </p>
          <div className="hero-cta">
            <Button variant="primary">Find My Path →</Button>
            <Button variant="ghost">I'm just exploring</Button>
          </div>
        </div>
        <HeroVisual />
      </section>

      {/* NOT BEHIND */}
      <section>
        <div className="stuck-head">
          <div className="eyebrow">You're not behind</div>
          <h2>
            Feeling stuck doesn't mean
            <span className="soft">you're behind. You just need direction.</span>
          </h2>
        </div>
        <div className="thought-grid">
          {stuckThoughts.map((t, i) => (
            <ThoughtCard key={i} text={t} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="section-head">
          <div className="eyebrow">How it works</div>
          <h2>Let's figure out where you actually stand.</h2>
          <p>Four steps. No guesswork.</p>
        </div>
        <div className="process-grid">
          {processSteps.map((s) => (
            <ProcessCard key={s.num} {...s} />
          ))}
        </div>
      </section>

      {/* CAREER MODES */}
      <section>
        <div className="section-head">
          <div className="eyebrow">Choose your starting point</div>
          <h2>Wherever you're coming from, there's a path.</h2>
        </div>
        <div className="modes-grid">
          {careerModes.map((m) => (
            <ModeCard key={m.tag} {...m} onClick={() => console.log("Selected mode:", m.tag)} />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>
          Ready when you are
        </div>
        <h2>
          Okay. Maybe you <span className="accent">can</span> figure this out.
        </h2>
        <p>It takes about two minutes to see your first path.</p>
        <Button variant="primary">Find My Path →</Button>
      </section>

      <footer>PathWise AI</footer>
    </div>
  );
}
