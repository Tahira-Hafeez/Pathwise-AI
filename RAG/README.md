# PathWise AI — Knowledge Base Documentation

**Owner:** Khadija Aftab (Knowledge Base & Career Data)
**File:** `PathWise_AI_Knowledge_Base_Milestone1.xlsx` (in `/RAG` folder)
**Last updated:** Milestone 1 + expansion (UX Designer, Product Manager added)

---

## 1. Purpose

This file is the structured dataset that powers PathWise AI's skill-gap analysis and roadmap recommendations. Ateeka's RAG pipeline uses it as the source of truth for what skills exist per role, in what order to learn them, where to learn them, and how long each one takes.

## 2. File Structure (sheets)

| Sheet | Contents |
|---|---|
| **AI Engineer** | 10 skills, ordered easiest → hardest, with prerequisites, resources, time estimates |
| **Data Analyst** | 8 skills, same format |
| **UX Designer** | 10 skills, same format |
| **Product Manager** | 10 skills, same format |
| **Job Postings** | Two parts: (a) aggregate stats from published job-market reports, (b) individually logged real job postings per role |

Each role sheet uses the same 6 columns:

`Skill ID | Skill | Prerequisite(s) | Why it matters | Recommended Resource | Est. Time`

`Skill ID` (e.g. `AI-01`, `DA-03`, `UX-05`, `PM-07`) lets the RAG pipeline reference a skill directly instead of matching on free text.

## 3. Data Sources (all real, no placeholders)

**A. Skill lists, resources, and time estimates** were built from:
- Real, currently-available free/low-cost courses (Google UX Design Certificate, Google Product Management Certificate, DeepLearning.AI short courses, freeCodeCamp, Khan Academy, Atlassian Agile Coach, Figma's own tutorials, AWS Skill Builder, Microsoft Learn, Coursera's Google Data Analytics Certificate). Every resource listed actually exists and is currently accessible.

**B. Aggregate job-market grounding data** — published 2026 analyses of real job postings:
- 365 Data Science — "AI Engineer Job Outlook 2026" (analysis of 1,000 postings)
- AccioJob — analysis of 328 real Data Analytics job descriptions
- Jobright — "Data Analyst Job Strategy 2026" (LinkedIn/Indeed/Levels.fyi postings)

**C. Individually logged real job postings** — two collection methods:
- **Manually screenshotted** postings from LinkedIn and job-search apps (ibex, Devsinc, Edge, Zones IT Solutions, US Mobile, and others) — skills extracted directly from each posting's "Requirements" section.
- **Live-pulled via the Indeed API** for UX Designer and Product Manager roles — real, currently-open Islamabad postings (Red Star Technologies, a senior UX role, Usermaven/ContentStudio.io, Hiro Talent Solutions), each with a working link back to the original listing.

No skill, resource, or job requirement in this file was invented — everything traces back to a real course page, a real published report, or a real job posting.

## 4. How to Extend This File

To add a new target role:
1. Duplicate an existing role sheet (same 6 columns, same `Skill ID` prefix convention, e.g. `MK-01` for Marketing).
2. Pull the skill list and resources from real, currently-available sources — not assumptions.
3. Log at least 2 real job postings for that role in the "Job Postings" sheet (with working links).

## 5. Known Limitations

- Job-posting data reflects a snapshot in time (2026) and Islamabad/Pakistan + remote-friendly listings mostly — hiring requirements shift, so this should be refreshed periodically.
- Time estimates are approximate (based on stated course durations), not guaranteed learning speed for every individual.
