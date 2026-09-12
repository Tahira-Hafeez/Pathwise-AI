

import json
import chromadb
from sentence_transformers import SentenceTransformer

SKILLS_FILE = "data/skills.json"
CHROMA_DIR = "data/chroma_store"
COLLECTION_NAME = "skills"
EMBEDDING_MODEL = "all-MiniLM-L6-v2"  


def build_document_text(skill: dict) -> str:
    """Turn a skill record into a single text blob for embedding."""
    return (
        f"Role: {skill['role']}. Skill: {skill['skill']}. "
        f"Prerequisites: {skill['prerequisites']}. "
        f"Why it matters: {skill['why_it_matters']}"
    )


def main():
    with open(SKILLS_FILE, "r", encoding="utf-8") as f:
        skills = json.load(f)

    print(f"Loading embedding model: {EMBEDDING_MODEL} ...")
    model = SentenceTransformer(EMBEDDING_MODEL)

    documents = [build_document_text(s) for s in skills]
    ids = [s["skill_id"] for s in skills]
    metadatas = [
        {
            "role": s["role"],
            "skill": s["skill"],
            "prerequisites": s["prerequisites"],
            "resource": s["resource"],
            "est_time": s["est_time"],
        }
        for s in skills
    ]

    print("Generating embeddings...")
    embeddings = model.encode(documents).tolist()

    client = chromadb.PersistentClient(path=CHROMA_DIR)
    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.create_collection(COLLECTION_NAME)

    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=documents,
        metadatas=metadatas,
    )

    print(f"Stored {len(ids)} skill embeddings in '{CHROMA_DIR}'")


if __name__ == "__main__":
    main()
