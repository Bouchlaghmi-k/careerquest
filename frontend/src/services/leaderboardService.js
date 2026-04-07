import API_BASE_URL from "./api";

export async function getLeaderboard() {
  const response = await fetch(`${API_BASE_URL}/api/leaderboard/`);

  if (!response.ok) {
    throw new Error("Unable to fetch leaderboard");
  }

  return response.json();
}