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
        <h1>Profil</h1>
        <div className="card">
          <p>Aucun profil n’a encore été chargé. Allez dans l’accueil et saisissez un nom d’utilisateur GitHub.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Profil</h1>

      <div className="profile-header card">
        <img src={profile.avatar_url} alt={profile.username} className="avatar-img" />
        <div>
          <h2>{profile.name || profile.username}</h2>
          <p>@{profile.username}</p>
          <p>{profile.xp} XP • Niveau {profile.level} • {profile.avatar_stage}</p>
          <a href={profile.profile_url} target="_blank" rel="noreferrer">
            Voir le profil GitHub
          </a>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Dépôts</h2>
          <p>{profile.repo_count}</p>
        </div>

        <div className="card">
          <h2>Abonnés</h2>
          <p>{profile.followers}</p>
        </div>

        <div className="card">
          <h2>Abonnements</h2>
          <p>{profile.following}</p>
        </div>

        <div className="card">
          <h2>Étoiles</h2>
          <p>{profile.stars}</p>
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
          <h2>Langages</h2>
          <ul>
            {profile.top_languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      </div>

      <button className="primary-btn" onClick={handleReset}>
        Analyser un autre profil
      </button>
    </div>
  );
}

export default Profile;