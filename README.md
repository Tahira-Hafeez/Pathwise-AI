# PathWise AI — RAG Pipeline (Atiqa's part)

Skill-gap analysis + personalized roadmap generator. Fully free to run —
local embeddings (HuggingFace) + local vector store (ChromaDB) + Gemini's
free API tier for the roadmap text.

## Setup

1. Create a virtual environment:
   ```
   python3 -m venv venv
   source venv/bin/activate      # Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Get a free Gemini API key: https://aistudio.google.com/app/apikey
   Copy `.env.example` to `.env` and paste your key in.

## Usage

Run these in order:

```
python data_prep.py   # converts the Excel knowledge base -> data/skills.json
python embed.py        # embeds skills into local vector store (data/chroma_store/)
python generate.py     # test run: sample user -> roadmap
```

## Files

- `data_prep.py` — reads Khadija's Excel knowledge base, outputs clean JSON
- `embed.py` — embeds skill data with a free local model, stores in ChromaDB
- `retrieve.py` — given user skills + target role, finds the skill gap
- `generate.py` — turns the skill gap into a personalized roadmap via Gemini

## Notes

- Re-run `data_prep.py` + `embed.py` whenever Khadija sends updated data.
- `.env` is gitignored — never commit API keys.
- Next step: wrap `generate_roadmap()` in `generate.py` as a function Tahira's
  FastAPI backend can call directly.
