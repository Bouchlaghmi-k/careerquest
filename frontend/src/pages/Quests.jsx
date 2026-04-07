import { getProfile } from "../utils/profileStorage";

function Quests() {
  const profile = getProfile();

  if (!profile) {
    return (
      <div className="page">
        <h1>Quests</h1>
        <div className="card">
          <p>No profile loaded yet. Go to Home and enter a GitHub username.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Quests</h1>

      <div className="card-grid">
        {profile.quests.map((quest, index) => (
          <div className="card" key={index}>
            <h2>{quest.title}</h2>
            <p>{quest.completed ? "Completed" : "Not completed yet"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quests;