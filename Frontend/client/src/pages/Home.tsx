/**
 * North Star Studio style: the landing page moves from an asymmetrical cloud of
 * career uncertainty toward ordered route artifacts, using navy, bone, moss, and amber.
 */
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import routeDetail from "../assets/pathwise-route-detail_5792ea04.webp";
import BrandMark from "@/components/BrandMark";
import ProfilePanel from "@/components/ProfilePanel";
import SkillPath from "@/components/SkillPath";
import ThoughtCloud from "@/components/ThoughtCloud";
import { generateRoadmap } from "@/lib/api";

const commonThoughts = [
  "Should I switch fields?",
  "Am I learning the right things?",
  "There are 100 courses. Which one do I actually need?",
  "What skills am I missing?",
  "Everyone seems ahead of me.",
];

const process = [
  ["01", "Where are you now?", "Tell us the skills you already have — no résumé required."],
  ["02", "Where do you want to go?", "Pick a target role, or tell us you are still deciding."],
  ["03", "What is missing?", "We map the actual distance, not a generic list of courses."],
  ["04", "What is the next step?", "One clear, sequenced route you can begin this week."],
];

const roadmap = [
  ["01", "Strengthen the foundations", "Excel · Statistics", "complete"],
  ["02", "Build technical skills", "SQL · Python + Pandas", "current"],
  ["03", "Learn to communicate data", "Data visualization", "upcoming"],
  ["04", "Prove you can do it", "Portfolio project", "upcoming"],
];

const defaultUserProfile = {
  current_skills: ["Excel", "Basic statistics"],
  target_role: "Data Analyst",
};

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [roadmapData, setRoadmapData] = useState(roadmap);
  const [roadmapLoading, setRoadmapLoading] = useState(true);

  useEffect(() => {
    let active = true;

    generateRoadmap(defaultUserProfile)
      .then((data) => {
        if (!active || typeof data?.roadmap !== "string") return;

        const generatedRoadmap = data.roadmap
          .split("\n")
          .map((line: string) => line.replace(/^\s*\d+[.)]\s*/, "").trim())
          .filter(Boolean)
          .map((line: string, index: number) => [
            String(index + 1).padStart(2, "0"),
            line,
            "",
            index === 0 ? "current" : "upcoming",
          ]);

        if (generatedRoadmap.length > 0) setRoadmapData(generatedRoadmap);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setRoadmapLoading(false);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    const observe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("in-view"); });
    }, { threshold: 0.14 });
    document.querySelectorAll(".reveal-on-scroll").forEach((element) => observe.observe(element));
    return () => observe.disconnect();
  }, []);

  const goToStart = () => {
    setNavOpen(false);
    document.querySelector("#start")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="top" className="pathwise-site">
      <header className="site-nav">
        <BrandMark />
        <nav className={navOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a onClick={() => setNavOpen(false)} href="#how-it-works">How it works</a>
          <a onClick={() => setNavOpen(false)} href="#skill-gap">See a path</a>
          <a onClick={() => setNavOpen(false)} href="/compare">Compare Roles</a>
          <a onClick={() => setNavOpen(false)} href="/auth">Sign In</a>
          <button type="button" className="nav-cta" onClick={goToStart}>Find my path <ArrowRight size={14} /></button>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setNavOpen(!navOpen)} aria-label={navOpen ? "Close menu" : "Open menu"}>{navOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal">FOR THE "I DON'T KNOW WHAT I'M DOING" PHASE</p>
            <h1 id="hero-title" className="hero-reveal delay-1">Too many paths.<br />No idea which<br />one is <em>yours?</em></h1>
            <p className="hero-subcopy hero-reveal delay-2">PathWise looks at what you already know, where you're trying to go, and what's actually missing then turns the mess into a roadmap you can follow.</p>
            <div className="hero-actions hero-reveal delay-3">
              <button className="button button-moss" type="button" onClick={goToStart}>Find my path <ArrowRight size={17} /></button>
              <a className="button button-ghost" href="#how-it-works">I’m just exploring <ChevronDown size={16} /></a>
            </div>
            <div className="hero-proof hero-reveal delay-4"><span className="proof-pip" /> Your route begins with a 2-minute reflection</div>
          </div>
          <ThoughtCloud />
        </section>

        <section className="recognition-section" aria-labelledby="recognition-title">
          <div className="section-intro centered reveal-on-scroll">
            <p className="eyebrow">A familiar feeling</p>
            <h2 id="recognition-title">Feeling stuck does not mean<br /><span>you are behind.</span></h2>
            <p className="intro-body">It usually means you have too many directions and no clear way 
to compare them</p>
          </div>
          <div className="thoughts-row reveal-on-scroll">
            {commonThoughts.map((thought, index) => <div className={`common-thought common-thought-${index + 1}`} key={thought}><span>“</span>{thought}</div>)}
          </div>
        </section>

        <section id="how-it-works" className="process-section" aria-labelledby="process-title">
          <div className="section-intro process-intro reveal-on-scroll">
            <p className="eyebrow">A route, not a rabbit hole</p>
            <h2 id="process-title">Let’s find where you<br /><span>actually stand.</span></h2>
            <p className="intro-body">Four thoughtful prompts. No test to pass. No guesswork to carry around.</p>
          </div>
          <div className="process-grid">
            {process.map(([number, title, copy], index) => (
              <article className={`process-card reveal-on-scroll stagger-${index + 1}`} key={number}>
                <span className="process-number">{number}</span>
                <div className="process-line" />
                <h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="start" className="profile-section" aria-labelledby="profile-title">
          <div className="section-intro profile-intro reveal-on-scroll">
            <p className="eyebrow">Start with what is true</p>
            <h2 id="profile-title">A few honest answers.<br /><span>A clearer starting point.</span></h2>
          </div>
          <div className="reveal-on-scroll"><ProfilePanel /></div>
        </section>

        <section id="skill-gap" className="skill-gap-section" aria-labelledby="gap-title">
          <div className="skill-gap-heading reveal-on-scroll">
            <div>
              <p className="eyebrow">Your next sensible step</p>
              <h2 id="gap-title">You have more than<br /><span>a blank slate.</span></h2>
            </div>
            <p>PathWise separates the skills you bring, the one that will open the next door, and the skills that can wait their turn.</p>
          </div>
          <div className="reveal-on-scroll"><SkillPath /></div>
        </section>

        <section className="roadmap-section" aria-labelledby="roadmap-title">
          <div className="roadmap-art reveal-on-scroll"><img src={routeDetail} alt="Abstract Pathwise route with connected learning milestones" /></div>
          <div className="roadmap-content reveal-on-scroll">
            <p className="eyebrow">Not another answer in a chat window</p>
            <h2 id="roadmap-title">This is your<br /><span>career map.</span></h2>
            <p className="intro-body">A personal sequence of work that respects your starting point and the time you actually have.</p>
            {roadmapLoading ? <p className="roadmap-loading" aria-live="polite">Building your route...</p> : <div className="roadmap-list">
              {roadmapData.map(([number, title, skills, status]) => <div className={`roadmap-row ${status}`} key={number}><span>{number}</span><div><strong>{title}</strong>{skills && <p>{skills}</p>}</div><i /></div>)}
            </div>}
          </div>
        </section>

        <section className="modes-section" aria-labelledby="modes-title">
          <div className="section-intro centered reveal-on-scroll">
            <p className="eyebrow">However you arrived here</p>
            <h2 id="modes-title">There is a path<br /><span>from where you are.</span></h2>
          </div>
          <div className="modes-grid">
            {[['New Path', 'Just figuring things out', 'You are curious and open. Let’s find a direction before you commit to one.'], ['Career Switch', 'Moving into something new', 'You bring experience. We’ll identify what transfers and what deserves focus.'], ['Growth Mode', 'Moving forward from here', 'Go deeper into your craft or explore a related role with more intention.']].map(([label, title, copy], index) => <article className={`mode-card reveal-on-scroll stagger-${index + 1}`} key={label}><span>{label}</span><h3>{title}</h3><p>{copy}</p><a href="#start" onClick={(event) => { event.preventDefault(); goToStart(); }}>Explore this route <ArrowRight size={15} /></a></article>)}
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-route" aria-hidden="true"><span /><span /><span /></div>
          <p className="eyebrow reveal-on-scroll">Ready when you are</p>
          <h2 id="closing-title" className="reveal-on-scroll">Okay. Maybe you <em>can</em><br />figure this out.</h2>
          <p className="closing-copy reveal-on-scroll">It takes about two minutes to see your first path.</p>
          <button className="button button-moss reveal-on-scroll" onClick={goToStart} type="button">Find my path <ArrowRight size={17} /></button>
        </section>
      </main>

      <footer className="site-footer"><BrandMark /><p>Clarity for career moves that matter.</p><span>© 2026 PathWise AI</span></footer>
    </div>
  );
}
