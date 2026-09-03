import axios from "axios";
import { sampleRoadmap } from "../data/mockData";

// Point this at your real backend once it's deployed/running locally.
// For local dev against Tahira's FastAPI backend, it's usually:
const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// TEMPORARY: returns mock data so frontend work isn't blocked on the backend/RAG pipeline.
// Swap the body of this function to the real call (commented below) once Ateeka's RAG
// endpoint is confirmed working — you should NOT need to touch any component when you do this.
export async function generateRoadmap(userProfile) {
  console.log("Mock roadmap generated for:", userProfile);
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleRoadmap), 600); // fake network delay so loading states are visible
  });

  // REAL VERSION — uncomment once backend is ready, delete the mock code above:
  // const response = await api.post("/generate-roadmap", userProfile);
  // return response.data;
}

export async function saveProfile(userProfile) {
  // const response = await api.post("/profile", userProfile);
  // return response.data;
  console.log("Mock profile saved:", userProfile);
  return { success: true };
}

export default api;
