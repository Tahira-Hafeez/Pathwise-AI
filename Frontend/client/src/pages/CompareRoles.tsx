import { ArrowLeft, ArrowRight, Check, LoaderCircle, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import { profileSkills } from "@/components/ProfilePanel";

const API_URL = "http://127.0.0.1:8000";

type RoleComparison = {
  target_role: string;
  readiness_pct: number;
  missing_skills: string[];
};

type CompareResponse = {
  comparisons: RoleComparison[];
  recommended_role: string | null;
};

function isCompareResponse(value: unknown): value is CompareResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<CompareResponse>;
  return Array.isArray(response.comparisons)
    && response.comparisons.every((role) => (
      role
      && typeof role.target_role === "string"
      && typeof role.readiness_pct === "number"
      && Array.isArray(role.missing_skills)
      && role.missing_skills.every((skill) => typeof skill === "string")
    ))
    && (response.recommended_role === null || typeof response.recommended_role === "string");
}

export default function CompareRoles() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [results, setResults] = useState<CompareResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) => current.includes(skill)
      ? current.filter((item) => item !== skill)
      : [...current, skill]);
  };

  async function compareFit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResults(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/compare-roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_skills: selectedSkills }),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error("We couldn’t compare your fit right now. Please try again.");
      }
      if (!isCompareResponse(payload)) {
        throw new Error("The comparison response was not in the expected format.");
      }

      setResults(payload);
    } catch (compareError) {
      setError(compareError instanceof Error ? compareError.message : "Unable to compare your fit.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="compare-page">
      <header className="compare-nav">
        <BrandMark />
        <Link className="compare-back-link" to="/">
          <ArrowLeft size={15} /> Back to PathWise
        </Link>
      </header>

      <main className="compare-main">
        <section className="compare-intro" aria-labelledby="compare-title">
          <p className="eyebrow">Compare your next move</p>
          <h1 id="compare-title">Which role fits<br /><em>where you are now?</em></h1>
          <p>Choose the skills you already feel comfortable using. We’ll show you the roles where you’re closest, and what would open the next door.</p>
        </section>

        <form className="compare-workbench" onSubmit={compareFit}>
          <div className="compare-selection">
            <div className="compare-section-heading">
              <span className="compare-step">01</span>
              <div>
                <h2>Your current skills</h2>
                <p>Select everything you could use this week.</p>
              </div>
            </div>
            <div className="compare-skill-list" role="group" aria-label="Current skills">
              {profileSkills.map((skill) => {
                const chosen = selectedSkills.includes(skill);
                return (
                  <button
                    className={`skill-choice ${chosen ? "chosen" : ""}`}
                    onClick={() => toggleSkill(skill)}
                    type="button"
                    aria-pressed={chosen}
                    key={skill}
                  >
                    {chosen && <Check size={13} strokeWidth={2.5} />}
                    {skill}
                  </button>
                );
              })}
            </div>
            <div className="compare-submit-row">
              <p>{selectedSkills.length === 0 ? "No skills selected yet" : `${selectedSkills.length} skill${selectedSkills.length === 1 ? "" : "s"} selected`}</p>
              <button className="button button-moss" type="submit" disabled={isLoading}>
                {isLoading ? <><LoaderCircle size={17} className="spin" /> Comparing...</> : <>Compare My Fit <ArrowRight size={17} /></>}
              </button>
            </div>
          </div>

          <div className="compare-results" aria-live="polite">
            {!results && !isLoading && !error && (
              <div className="compare-empty">
                <Sparkles size={20} />
                <h2>Your clearest next step will appear here.</h2>
                <p>Pick a few skills, then compare your fit across four roles.</p>
              </div>
            )}
            {isLoading && (
              <div className="compare-empty"><LoaderCircle size={24} className="spin" /><p>Mapping your skills to the roles...</p></div>
            )}
            {error && <p className="compare-error" role="alert">{error}</p>}
            {results && (
              <>
                <div className="results-heading">
                  <div>
                    <p className="eyebrow">Your ranked matches</p>
                    <h2>Where you stand</h2>
                  </div>
                  <span>{results.comparisons.length} roles compared</span>
                </div>
                <div className="role-list">
                  {results.comparisons.map((role, index) => {
                    const recommended = role.target_role === results.recommended_role;
                    const readiness = Math.max(0, Math.min(100, role.readiness_pct));
                    return (
                      <article className={`role-result ${recommended ? "recommended" : ""}`} key={role.target_role}>
                        <div className="role-rank">{String(index + 1).padStart(2, "0")}</div>
                        <div className="role-details">
                          <div className="role-title-row">
                            <h3>{role.target_role}</h3>
                            {recommended && <span className="best-match">Best match</span>}
                            <strong>{readiness}%</strong>
                          </div>
                          <div className="readiness-track" aria-label={`${readiness}% readiness`}>
                            <span style={{ width: `${readiness}%` }} />
                          </div>
                          <div className="missing-skills">
                            <span>Next to learn</span>
                            {role.missing_skills.length > 0
                              ? role.missing_skills.map((skill) => <span className="missing-skill" key={skill}>{skill}</span>)
                              : <span className="missing-skill complete">You’re ready to begin</span>}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
