import { getProfile } from "../utils/profileStorage";
import AvatarCard from "../components/AvatarCard";
import XPBar from "../components/XPBar";

function Dashboard() {
  const profile = getProfile();

  if (!profile) {
    return (
      <div className="page">
        <h1>Tableau de bord</h1>
        <div className="card">
          <p>Aucun profil n’a encore été chargé. Allez dans l’accueil et saisissez un nom d’utilisateur GitHub.</p>
        </div>
      </div>
    );
  }

  const completedQuests = profile.quests.filter((quest) => quest.completed).length;
  const unlockedSkills = profile.skills.filter((skill) => skill.unlocked).length;

  return (
    <div className="page">
      <h1>Tableau de bord</h1>

      <div className="card-grid">
        <AvatarCard avatarStage={profile.avatar_stage} level={profile.level} />
        <XPBar xp={profile.xp} />
      </div>

      <div className="profile-header card">
        <img src={profile.avatar_url} alt={profile.username} className="avatar-img" />
        <div>
          <h2>{profile.name || profile.username}</h2>
          <p>@{profile.username}</p>
          <p>{profile.repo_count} dépôts • {profile.followers} abonnés</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Niveau</h2>
          <p>{profile.level}</p>
        </div>

        <div className="card">
          <h2>Succès</h2>
          <p>{profile.achievements.length}</p>
        </div>

        <div className="card">
          <h2>Défis terminés</h2>
          <p>{completedQuests} / {profile.quests.length}</p>
        </div>

        <div className="card">
          <h2>Compétences débloquées</h2>
          <p>{unlockedSkills} / {profile.skills.length}</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Succès</h2>
          <ul>
            {profile.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Langages principaux</h2>
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