import { getProfile } from "../utils/profileStorage";

function Quests() {
  const profile = getProfile();

  if (!profile) {
    return (
      <div className="page">
        <h1>Défis</h1>
        <div className="card">
          <p>Aucun profil n’a encore été chargé. Allez dans l’accueil et saisissez un nom d’utilisateur GitHub.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Défis</h1>

      <div className="card-grid">
        {profile.quests.map((quest, index) => (
          <div className={`card quest-card ${quest.completed ? "quest-done" : "quest-pending"}`} key={index}>
            <h2>{quest.title}</h2>
            <p>{quest.completed ? "Terminé" : "En cours"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quests;