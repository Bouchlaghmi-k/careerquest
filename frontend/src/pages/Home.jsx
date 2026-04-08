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
    <div className="page home-page">
      <section className="hero-v2">
        <div className="hero-bg-glow hero-bg-glow-1"></div>
        <div className="hero-bg-glow hero-bg-glow-2"></div>

        <div className="hero-v2-content">
          <div className="hero-badge">Gamified Career Growth Platform</div>

          <h1 className="hero-v2-title">
            Turn your <span>GitHub journey</span> into XP, levels, quests and real progression.
          </h1>

          <p className="hero-v2-text">
            CareerQuest transforms public GitHub activity into a modern career dashboard.
            Analyze repositories, unlock skills, earn achievements, track quests, and compare
            your progress through a real leaderboard.
          </p>

          <div className="search-panel">
            <div className="search-panel-top">
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

            <div className="search-panel-hint">
              Try usernames like <span>octocat</span>, <span>torvalds</span>, or your own.
            </div>
          </div>

          {loading && <p className="status-text">Loading profile...</p>}
          {error && <p className="error-text">{error}</p>}

          <div className="hero-stats">
            <div className="hero-stat-card">
              <span className="hero-stat-value">XP</span>
              <span className="hero-stat-label">Gamified progression</span>
            </div>

            <div className="hero-stat-card">
              <span className="hero-stat-value">Skills</span>
              <span className="hero-stat-label">Unlocked from tech stack</span>
            </div>

            <div className="hero-stat-card">
              <span className="hero-stat-value">Leaderboard</span>
              <span className="hero-stat-label">Compare real profiles</span>
            </div>
          </div>
        </div>

        <div className="hero-v2-preview">
          <div className="preview-shell">
            <div className="preview-topbar">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="preview-grid">
              <div className="preview-card preview-main-card">
                <p className="preview-label">Career Score</p>
                <h3>Level Up Your Profile</h3>
                <div className="preview-meter">
                  <div className="preview-meter-fill"></div>
                </div>
                <p className="preview-subtext">XP, skills, achievements and growth in one place.</p>
              </div>

              <div className="preview-card">
                <p className="preview-label">Achievements</p>
                <ul className="preview-list">
                  <li>Project Explorer</li>
                  <li>JavaScript Builder</li>
                  <li>Tech Explorer</li>
                </ul>
              </div>

              <div className="preview-card">
                <p className="preview-label">Quests</p>
                <ul className="preview-list">
                  <li>Reach 3 repositories</li>
                  <li>Use Python in a project</li>
                  <li>Unlock new skills</li>
                </ul>
              </div>

              <div className="preview-card">
                <p className="preview-label">Leaderboard</p>
                <ul className="preview-list">
                  <li>#1 Linus Torvalds</li>
                  <li>#2 The Octocat</li>
                  <li>#3 Your Future Profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {profile && (
        <section className="profile-showcase">
          <div className="profile-showcase-header">
            <div>
              <p className="section-kicker">Analysis Ready</p>
              <h2>Your CareerQuest profile has been generated</h2>
            </div>

            <button className="primary-btn" onClick={goToDashboard}>
              Open Dashboard
            </button>
          </div>

          <div className="profile-result-v2">
            <div className="card profile-result-main">
              <div className="profile-result-user">
                <img src={profile.avatar_url} alt={profile.username} className="avatar-img large-avatar" />
                <div>
                  <h3>{profile.name || profile.username}</h3>
                  <p>@{profile.username}</p>
                  <p>
                    {profile.xp} XP • Level {profile.level} • {profile.avatar_stage}
                  </p>
                  <a href={profile.profile_url} target="_blank" rel="noreferrer">
                    View GitHub Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="card-grid compact-grid">
              <div className="card stat-card-v2">
                <p className="stat-mini-label">Repositories</p>
                <h3>{profile.repo_count}</h3>
              </div>

              <div className="card stat-card-v2">
                <p className="stat-mini-label">Followers</p>
                <h3>{profile.followers}</h3>
              </div>

              <div className="card stat-card-v2">
                <p className="stat-mini-label">Stars</p>
                <h3>{profile.stars}</h3>
              </div>

              <div className="card stat-card-v2">
                <p className="stat-mini-label">Achievements</p>
                <h3>{profile.achievements.length}</h3>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;