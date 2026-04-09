function XPBar({ xp }) {
  const maxXp = 1000;
  const percentage = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="card">
      <h2>Progression XP</h2>
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <p>{xp} XP</p>
    </div>
  );
}

export default XPBar;