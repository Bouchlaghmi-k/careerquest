import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setPlayers(data);
      } catch (err) {
        setError("Unable to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="page">
      <h1>Leaderboard</h1>

      {loading && <p className="status-text">Loading leaderboard...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="card">
          <ul>
            {players.map((player, index) => (
              <li key={player.id}>
                #{index + 1} — {player.name || player.username} : {player.xp} XP
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;