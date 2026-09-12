import axios from "axios";

export async function generateRoadmap(userProfile: unknown) {
  const response = await axios.post("http://localhost:8000/generate-roadmap", userProfile);
  return response.data;
}