/**
 * North Star Studio style: profile setup is framed as a calm conversation with
 * tangible selection chips, not an impersonal data-entry form.
 */
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import profileCompass from "../assets/pathwise-profile-compass_33583083.webp";

export const profileSkills = ["Excel", "Basic statistics", "Writing", "Figma", "Customer research", "Python"];
const roles = ["Data Analyst", "UX Designer", "Product Manager"];
const modes = [
  { id: "new", eyebrow: "New Path", title: "I'm figuring it out" },
  { id: "switch", eyebrow: "Career Switch", title: "I'm moving into something new" },
  { id: "growth", eyebrow: "Growth Mode", title: "I'm growing from here" },
];

export default function ProfilePanel() {
  const [selectedSkills, setSelectedSkills] = useState(["Excel", "Basic statistics"]);
  const [role, setRole] = useState("Data Analyst");
  const [mode, setMode] = useState("new");
  const [hours, setHours] = useState("6–8");
  const [ready, setReady] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) => current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill]);
  };

  const showPath = () => {
    setReady(true);
    document.querySelector("#skill-gap")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="profile-workbench">
      <div className="profile-art-panel" aria-hidden="true">
        <div className="profile-art-caption"><Sparkles size={14} /> A useful starting point</div>
        <img src={profileCompass} alt="" />
        <p>Start where you are.<br />We’ll take it from there.</p>
      </div>
      <div className="profile-fields">
        <div className="profile-question">
          <span className="question-count">01</span>
          <div>
            <p className="question-title">What do you already know?</p>
            <p className="question-help">Pick the things you would feel comfortable using this week.</p>
          </div>
          <div className="skill-chip-list">
            {profileSkills.map((skill) => {
              const chosen = selectedSkills.includes(skill);
              return (
                <button className={`skill-choice ${chosen ? "chosen" : ""}`} onClick={() => toggleSkill(skill)} type="button" aria-pressed={chosen} key={skill}>
                  {chosen && <Check size={13} strokeWidth={2.5} />}{skill}
                </button>
              );
            })}
          </div>
        </div>

        <div className="profile-question split-question">
          <span className="question-count">02</span>
          <div>
            <p className="question-title">Where do you want to go?</p>
            <div className="choice-row" role="group" aria-label="Target career">
              {roles.map((item) => <button key={item} className={`compact-choice ${role === item ? "active" : ""}`} onClick={() => setRole(item)} type="button" aria-pressed={role === item}>{item}</button>)}
            </div>
          </div>
          <div>
            <p className="question-title">What time is realistic?</p>
            <div className="choice-row" role="group" aria-label="Hours each week">
              {["2–4", "6–8", "10+"] .map((item) => <button key={item} className={`compact-choice ${hours === item ? "active" : ""}`} onClick={() => setHours(item)} type="button" aria-pressed={hours === item}>{item} hrs</button>)}
            </div>
          </div>
        </div>

        <div className="profile-question mode-question">
          <span className="question-count">03</span>
          <div>
            <p className="question-title">What kind of move are you making?</p>
            <div className="mode-picks" role="group" aria-label="Career mode">
              {modes.map((item) => (
                <button key={item.id} className={`mode-pick ${mode === item.id ? "active" : ""}`} onClick={() => setMode(item.id)} type="button" aria-pressed={mode === item.id}>
                  <span>{item.eyebrow}</span><strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="profile-action-row">
          <p>{ready ? "Your starting point is sketched. Take a look at the route ahead." : "A first path only takes a moment."}</p>
          <button className="button button-moss" onClick={showPath} type="button">Sketch my path <ArrowRight size={17} /></button>
        </div>
      </div>
    </div>
  );
}
