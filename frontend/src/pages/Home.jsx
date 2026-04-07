import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../utils/profileStorage";
import API_BASE_URL from "../services/api";

function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setProfile(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/github/${username}/`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "GitHub user not found");
      }

      setProfile(data);
      saveProfile(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const goToDashboard = () => {
    if (profile) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="page hero">
      <h1>Level up your career</h1>
      <p>
        CareerQuest transforms GitHub activity into a gamified professional journey.
        Enter a GitHub username to discover XP, level, achievements, quests, and skills.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="primary-btn" onClick={handleSearch}>
          Analyze Profile
        </button>
      </div>

      {loading && <p className="status-text">Loading profile...</p>}
      {error && <p className="error-text">{error}</p>}

      {profile && (
        <div className="profile-result">
          <div className="profile-header card">
            <img src={profile.avatar_url} alt={profile.username} className="avatar-img" />
            <div>
              <h2>{profile.name || profile.username}</h2>
              <p>@{profile.username}</p>
              <p>Level {profile.level} • {profile.avatar_stage}</p>
              <p>{profile.xp} XP</p>
              <a href={profile.profile_url} target="_blank" rel="noreferrer">
                View GitHub Profile
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
              <h2>Stars</h2>
              <p>{profile.stars}</p>
            </div>
          </div>

          <div className="action-row">
  <button className="primary-btn" onClick={goToDashboard}>
    Open Dashboard
  </button>
</div>
        </div>
      )}
    </div>
  );
}

export default Home;