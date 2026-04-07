import { getProfile, clearProfile } from "../utils/profileStorage";
import { useNavigate } from "react-router-dom";

function Profile() {
  const profile = getProfile();
  const navigate = useNavigate();

  const handleReset = () => {
    clearProfile();
    navigate("/");
  };

  if (!profile) {
    return (
      <div className="page">
        <h1>Profile</h1>
        <div className="card">
          <p>No profile loaded yet. Go to Home and enter a GitHub username.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Profile</h1>

      <div className="profile-header card">
        <img src={profile.avatar_url} alt={profile.username} className="avatar-img" />
        <div>
          <h2>{profile.name || profile.username}</h2>
          <p>@{profile.username}</p>
          <p>{profile.xp} XP • Level {profile.level} • {profile.avatar_stage}</p>
          <a href={profile.profile_url} target="_blank" rel="noreferrer">
            Open GitHub Profile
          </a>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Repositories</h2>
          <p>{profile.repo_count}</p>
        </div>

        <div className="card">
          <h2>Followers</h2>
          <p>{profile.followers}</p>
        </div>

        <div className="card">
          <h2>Following</h2>
          <p>{profile.following}</p>
        </div>

        <div className="card">
          <h2>Stars</h2>
          <p>{profile.stars}</p>
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
          <h2>Languages</h2>
          <ul>
            {profile.top_languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      </div>

      <button className="primary-btn" onClick={handleReset}>
        Analyze Another Profile
      </button>
    </div>
  );
}

export default Profile;