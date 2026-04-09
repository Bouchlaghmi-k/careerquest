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
        throw new Error(data.error || "Utilisateur GitHub introuvable");
      }

      setProfile(data);
      saveProfile(data);
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
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
          <div className="hero-badge">Plateforme de progression professionnelle gamifiée</div>

          <h1 className="hero-v2-title">
            Transformez votre <span>parcours GitHub</span> en XP, niveaux, défis et progression concrète.
          </h1>

          <p className="hero-v2-text">
            CareerQuest transforme votre activité publique GitHub en un tableau de bord de carrière moderne.
            Analysez vos dépôts, débloquez des compétences, gagnez des succès, suivez vos défis et comparez
            votre progression grâce à un véritable classement.
          </p>

          <div className="search-panel">
            <div className="search-panel-top">
              <input
                type="text"
                placeholder="Entrez un nom d’utilisateur GitHub..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="primary-btn" onClick={handleSearch}>
                Analyser le profil
              </button>
            </div>

            <div className="search-panel-hint">
  Saisissez votre nom d’utilisateur GitHub pour commencer l’analyse.
</div>
          </div>

          {loading && <p className="status-text">Chargement du profil...</p>}
          {error && <p className="error-text">{error}</p>}

          <div className="hero-stats">
            <div className="hero-stat-card">
              <span className="hero-stat-value">XP</span>
              <span className="hero-stat-label">Une progression motivante</span>
            </div>

            <div className="hero-stat-card">
              <span className="hero-stat-value">Compétences</span>
              <span className="hero-stat-label">Révélées à partir de votre stack</span>
            </div>

            <div className="hero-stat-card">
              <span className="hero-stat-value">Classement</span>
              <span className="hero-stat-label">Comparez de vrais profils</span>
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
                <p className="preview-label">Score carrière</p>
                <h3>Faites évoluer votre profil</h3>
                <div className="preview-meter">
                  <div className="preview-meter-fill"></div>
                </div>
                <p className="preview-subtext">XP, compétences, succès et progression réunis au même endroit.</p>
              </div>

              <div className="preview-card">
                <p className="preview-label">Succès</p>
                <ul className="preview-list">
                  <li>Explorateur de projets</li>
                  <li>Bâtisseur JavaScript</li>
                  <li>Explorateur technologique</li>
                </ul>
              </div>

              <div className="preview-card">
                <p className="preview-label">Défis</p>
                <ul className="preview-list">
                  <li>Atteindre 3 dépôts</li>
                  <li>Utiliser Python dans un projet</li>
                  <li>Débloquer de nouvelles compétences</li>
                </ul>
              </div>

              <div className="preview-card">
  <p className="preview-label">Classement</p>
  <ul className="preview-list">
    <li>Classement mondial en temps réel</li>
    <li>Profils analysés enregistrés</li>
    <li>Votre profil peut apparaître ici</li>
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
              <p className="section-kicker">Analyse prête</p>
              <h2>Votre profil CareerQuest a bien été généré</h2>
            </div>

            <button className="primary-btn" onClick={goToDashboard}>
              Ouvrir le tableau de bord
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
                    {profile.xp} XP • Niveau {profile.level} • {profile.avatar_stage}
                  </p>
                  <a href={profile.profile_url} target="_blank" rel="noreferrer">
                    Voir le profil GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="card-grid compact-grid">
              <div className="card stat-card-v2">
                <p className="stat-mini-label">Dépôts</p>
                <h3>{profile.repo_count}</h3>
              </div>

              <div className="card stat-card-v2">
                <p className="stat-mini-label">Abonnés</p>
                <h3>{profile.followers}</h3>
              </div>

              <div className="card stat-card-v2">
                <p className="stat-mini-label">Étoiles</p>
                <h3>{profile.stars}</h3>
              </div>

              <div className="card stat-card-v2">
                <p className="stat-mini-label">Succès</p>
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