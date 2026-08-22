export const heroThoughts = [
  { text: "AI Engineer" },
  { text: "UX Designer" },
  { text: "Should I learn Python?", dim: true },
  { text: "Am I too late?", dim: true },
  { text: "Data Analyst" },
  { text: "Cybersecurity" },
  { text: "Where do I start?", dim: true },
  { text: "Do I need a Master's?", dim: true },
  { text: "Product" },
];

export const stuckThoughts = [
  "Should I switch fields?",
  "Am I learning the right things?",
  "There are 100 courses. Which one do I actually need?",
  "What skills am I missing?",
  "Everyone seems ahead of me.",
];

export const processSteps = [
  { num: "01", title: "Where are you now?", desc: "Tell us the skills you already have — no résumé required." },
  { num: "02", title: "Where do you want to go?", desc: "Pick a target role, or tell us you're still deciding." },
  { num: "03", title: "What's missing?", desc: "We map the exact gap between where you are and where you're headed." },
  { num: "04", title: "What's the next step?", desc: "One clear, sequenced roadmap — not a wall of course links." },
];

export const careerModes = [
  { tag: "New Path", title: "Just figuring things out", desc: "You're early, curious, and open. We'll help you find direction before committing to anything." },
  { tag: "Career Switch", title: "Moving into something new", desc: "You have experience — just not in the field you're aiming for. We'll map what transfers and what doesn't." },
  { tag: "Growth Mode", title: "Moving forward from here", desc: "Already in the field? Go deeper (Junior → Senior) or sideways into a related role." },
];

// Sample roadmap shape — matches the team's data model doc.
// Replace this with a real API response once the RAG pipeline is live (see services/api.js)
export const sampleRoadmap = {
  target_role: "Data Analyst",
  sequenced_skills: [
    { skill_id: "skl_da_01", skill_name: "Excel", status: "complete", estimated_hours: 8 },
    { skill_id: "skl_da_02", skill_name: "Basic Statistics", status: "complete", estimated_hours: 10 },
    { skill_id: "skl_da_03", skill_name: "SQL Basics", status: "in_progress", estimated_hours: 10 },
    { skill_id: "skl_da_04", skill_name: "Python + Pandas", status: "not_started", estimated_hours: 14 },
    { skill_id: "skl_da_05", skill_name: "Data Visualization", status: "not_started", estimated_hours: 8 },
    { skill_id: "skl_da_06", skill_name: "Portfolio Project", status: "not_started", estimated_hours: 16 },
  ],
};
