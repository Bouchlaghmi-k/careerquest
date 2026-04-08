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

  const topThree = players.slice(0, 3);
  const others = players.slice(3);

  const getRankBadge = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    return "🥉";
  };

  return (
    <div className="page leaderboard-page">
      <div className="leaderboard-hero">
        <p className="section-kicker">Real Ranking</p>
        <h1>Leaderboard</h1>
        <p className="leaderboard-intro">
          Discover the most advanced CareerQuest profiles based on GitHub-powered XP.
        </p>
      </div>

      {loading && <p className="status-text">Loading leaderboard...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && players.length > 0 && (
        <>
          <div className="podium-grid">
            {topThree.map((player, index) => (
              <div
                key={player.id}
                className={`podium-card podium-rank-${index + 1}`}
              >
                <div className="podium-rank-badge">{getRankBadge(index)}</div>

                <img
                  src={player.avatar_url}
                  alt={player.username}
                  className="podium-avatar"
                />

                <h2>{player.name || player.username}</h2>
                <p className="podium-username">@{player.username}</p>

                <div className="podium-stats">
                  <span>{player.xp} XP</span>
                  <span>Level {player.level}</span>
                </div>

                <div className="podium-meta">
                  <span>{player.repo_count} repos</span>
                  <span>{player.followers} followers</span>
                </div>
              </div>
            ))}
          </div>

          <div className="leaderboard-table card">
            <div className="leaderboard-table-head">
              <span>Rank</span>
              <span>Player</span>
              <span>XP</span>
              <span>Level</span>
            </div>

            <div className="leaderboard-table-body">
              {players.map((player, index) => (
                <div className="leaderboard-row" key={player.id}>
                  <span className="rank-cell">#{index + 1}</span>

                  <span className="player-cell">
                    <img
                      src={player.avatar_url}
                      alt={player.username}
                      className="leaderboard-avatar"
                    />
                    <div>
                      <strong>{player.name || player.username}</strong>
                      <small>@{player.username}</small>
                    </div>
                  </span>

                  <span>{player.xp}</span>
                  <span>{player.level}</span>
                </div>
              ))}
            </div>
          </div>

          {others.length > 0 && (
            <div className="card leaderboard-note">
              <p>
                The leaderboard is generated from saved GitHub analyses stored in the backend.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Leaderboard;