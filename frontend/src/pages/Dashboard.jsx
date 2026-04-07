import { getProfile } from "../utils/profileStorage";
import AvatarCard from "../components/AvatarCard";
import XPBar from "../components/XPBar";

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

  const completedQuests = profile.quests.filter((quest) => quest.completed).length;
  const unlockedSkills = profile.skills.filter((skill) => skill.unlocked).length;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="card-grid">
        <AvatarCard avatarStage={profile.avatar_stage} level={profile.level} />
        <XPBar xp={profile.xp} />
      </div>

      <div className="profile-header card">
        <img src={profile.avatar_url} alt={profile.username} className="avatar-img" />
        <div>
          <h2>{profile.name || profile.username}</h2>
          <p>@{profile.username}</p>
          <p>{profile.repo_count} repositories • {profile.followers} followers</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Level</h2>
          <p>{profile.level}</p>
        </div>

        <div className="card">
          <h2>Achievements</h2>
          <p>{profile.achievements.length}</p>
        </div>

        <div className="card">
          <h2>Completed Quests</h2>
          <p>{completedQuests} / {profile.quests.length}</p>
        </div>

        <div className="card">
          <h2>Unlocked Skills</h2>
          <p>{unlockedSkills} / {profile.skills.length}</p>
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