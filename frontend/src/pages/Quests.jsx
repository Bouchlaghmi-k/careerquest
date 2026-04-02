function Quests() {
  return (
    <div className="page">
      <h1>Quests</h1>
      <div className="card-grid">
        <div className="card">
          <h2>Complete GitHub Profile</h2>
          <p>Reward: 100 XP</p>
        </div>

        <div className="card">
          <h2>Publish a Project</h2>
          <p>Reward: 150 XP</p>
        </div>

        <div className="card">
          <h2>Unlock Docker Skill</h2>
          <p>Reward: Skill Badge</p>
        </div>
      </div>
    </div>
  );
}

export default Quests;