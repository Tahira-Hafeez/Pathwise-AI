/**
 * North Star Studio style: a signature amber-to-moss route turns skills into a
 * visible sequence of movement, with expandable node details rather than a flat list.
 */
import { Check, Clock3, Lightbulb, Play } from "lucide-react";
import { useState } from "react";

type Skill = {
  id: string;
  name: string;
  state: "done" | "current" | "next";
  pos: string;
  time: string;
  why: string;
  project: string;
};

const skills: Skill[] = [
  { id: "excel", name: "Excel", state: "done", pos: "node-1", time: "Complete", why: "You already have a practical foundation for organizing data.", project: "Use your current work sheets as raw material." },
  { id: "stats", name: "Basic statistics", state: "done", pos: "node-2", time: "Complete", why: "You can already reason about patterns before you query them.", project: "Practice explaining one chart in plain language." },
  { id: "sql", name: "SQL foundations", state: "current", pos: "node-3", time: "10 hours", why: "SQL is how most Data Analyst teams explore the source of a question.", project: "Write five useful queries for a tiny sales database." },
  { id: "python", name: "Python + Pandas", state: "next", pos: "node-4", time: "16 hours", why: "Pandas helps you clean and explore information that is too large for a spreadsheet.", project: "Clean a public dataset and document three findings." },
  { id: "story", name: "Tell the story", state: "next", pos: "node-5", time: "8 hours", why: "Analysis earns impact when others can understand the decision it supports.", project: "Turn your findings into a one-page data story." },
];

export default function SkillPath() {
  const [selected, setSelected] = useState(skills[2]);
  const statusLabel = selected.state === "done" ? "You already have this" : selected.state === "current" ? "Your most useful next step" : "Coming up on your route";

  return (
    <div className="skill-path-layout">
      <div className="journey-map" aria-label="Interactive path from Excel through storytelling">
        <svg className="journey-route" viewBox="0 0 700 430" preserveAspectRatio="none" aria-hidden="true">
          <path className="route-underlay" d="M 64 328 C 125 298, 102 177, 198 185 S 282 361, 367 285 S 445 80, 545 126 S 610 286, 660 126" />
          <path className="route-progress" d="M 64 328 C 125 298, 102 177, 198 185 S 282 361, 367 285" />
        </svg>
        {skills.map((skill) => (
          <button type="button" className={`journey-node ${skill.pos} ${skill.state} ${selected.id === skill.id ? "selected" : ""}`} onClick={() => setSelected(skill)} aria-pressed={selected.id === skill.id} key={skill.id}>
            <span className="node-disc">{skill.state === "done" ? <Check size={17} strokeWidth={3} /> : skill.state === "current" ? <Play size={14} fill="currentColor" /> : <span />}</span>
            <span className="node-label">{skill.name}</span>
          </button>
        ))}
      </div>
      <aside className={`skill-detail skill-detail-${selected.state}`}>
        <span className="detail-status">{statusLabel}</span>
        <h3>{selected.name}</h3>
        <div className="detail-meta"><span><Clock3 size={14} /> {selected.time}</span><span><Lightbulb size={14} /> Why it matters</span></div>
        <p>{selected.why}</p>
        <div className="mini-project"><span>Small proof of progress</span><strong>{selected.project}</strong></div>
        <button className="detail-link" type="button" onClick={() => setSelected(selected)}>{selected.state === "done" ? "See your foundation" : selected.state === "current" ? "Start this skill" : "Save for later"} <span>→</span></button>
      </aside>
    </div>
  );
}
