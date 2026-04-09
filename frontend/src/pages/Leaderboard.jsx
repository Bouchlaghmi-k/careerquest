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
        setError("Impossible de charger le classement");
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
        <p className="section-kicker">Classement réel</p>
        <h1>Classement</h1>
        <p className="leaderboard-intro">
          Découvrez les profils CareerQuest les plus avancés, classés à partir des XP générés via GitHub.
        </p>
      </div>

      {loading && <p className="status-text">Chargement du classement...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && players.length === 0 && (
        <div className="card leaderboard-note">
          <p>Aucun profil n’a encore été enregistré dans le classement.</p>
        </div>
      )}

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
                  <span>Niveau {player.level}</span>
                </div>

                <div className="podium-meta">
                  <span>{player.repo_count} dépôts</span>
                  <span>{player.followers} abonnés</span>
                </div>
              </div>
            ))}
          </div>

          <div className="leaderboard-table card">
            <div className="leaderboard-table-head">
              <span>Rang</span>
              <span>Joueur</span>
              <span>XP</span>
              <span>Niveau</span>
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
                Le classement est généré à partir des analyses GitHub enregistrées dans le backend.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Leaderboard;