import { getProfile } from "../utils/profileStorage";

function Dashboard() {
  const profile = getProfile();

  if (!profile) {
    return (
      <div className="page">
        <h1>Dashboard</h1>
        <div className="card">
          <p>No profile loaded yet. Go to Home and enter a GitHub username.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="profile-header card">
        <img src={profile.avatar_url} alt={profile.username} className="avatar-img" />
        <div>
          <h2>{profile.name || profile.username}</h2>
          <p>@{profile.username}</p>
          <p>Avatar Stage: {profile.avatar_stage}</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>XP</h2>
          <p>{profile.xp}</p>
        </div>

        <div className="card">
          <h2>Level</h2>
          <p>{profile.level}</p>
        </div>

        <div className="card">
          <h2>Repositories</h2>
          <p>{profile.repo_count}</p>
        </div>

        <div className="card">
          <h2>Followers</h2>
          <p>{profile.followers}</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Achievements</h2>
          <ul>
            {profile.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Top Languages</h2>
          <ul>
            {profile.top_languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;