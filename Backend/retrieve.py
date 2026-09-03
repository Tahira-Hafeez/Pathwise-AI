

import chromadb
from sentence_transformers import SentenceTransformer

CHROMA_DIR = "../data/chroma_store"
COLLECTION_NAME = "skills"
EMBEDDING_MODEL = "all-MiniLM-L6-v2"


def get_collection():
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    return client.get_collection(COLLECTION_NAME)


def retrieve_role_skills(target_role: str, top_k: int = 15):
    collection = get_collection()
    model = SentenceTransformer(EMBEDDING_MODEL)

    query_embedding = model.encode([f"Skills required for {target_role}"]).tolist()

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=top_k,
    )

    skills = []
    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        skills.append(meta)
    return skills


def find_skill_gap(current_skills: list[str], target_role: str):
    
    required_skills = retrieve_role_skills(target_role)

    current_lower = [s.strip().lower() for s in current_skills]

    known = []
    missing = []
    for skill in required_skills:
        skill_name = skill["skill"].lower()
        matched = any(cs in skill_name or skill_name in cs for cs in current_lower)
        if matched:
            known.append(skill)
        else:
            missing.append(skill)

    return {
        "target_role": target_role,
        "known_skills": known,
        "missing_skills": missing,
    }


if __name__ == "__main__":
    sample_user_skills = ["Python Programming", "SQL"]
    sample_target_role = "AI Engineer"

    gap = find_skill_gap(sample_user_skills, sample_target_role)
    print(f"Target role: {gap['target_role']}")
    print(f"Known skills: {[s['skill'] for s in gap['known_skills']]}")
    print(f"Missing skills: {[s['skill'] for s in gap['missing_skills']]}")
