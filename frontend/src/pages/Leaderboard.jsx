import { getProfile } from "../utils/profileStorage";

function Leaderboard() {
  const profile = getProfile();

  const leaderboardData = [
    { name: "Alex", xp: 720 },
    { name: "Sarah", xp: 680 },
    { name: "Yassine", xp: 590 },
    { name: "Abir", xp: 540 },
  ];

  if (profile) {
    leaderboardData.push({
      name: profile.name || profile.username,
      xp: profile.xp,
    });
  }

  const sortedLeaderboard = leaderboardData.sort((a, b) => b.xp - a.xp);

  return (
    <div className="page">
      <h1>Leaderboard</h1>

      <div className="card">
        <ul>
          {sortedLeaderboard.map((player, index) => (
            <li key={index}>
              #{index + 1} — {player.name} : {player.xp} XP
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;