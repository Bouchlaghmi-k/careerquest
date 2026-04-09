import { getProfile } from "../utils/profileStorage";

function SkillTree() {
  const profile = getProfile();

  if (!profile) {
    return (
      <div className="page">
        <h1>Compétences</h1>
        <div className="card">
          <p>Aucun profil n’a encore été chargé. Allez dans l’accueil et saisissez un nom d’utilisateur GitHub.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Compétences</h1>

      <div className="card">
        <div className="skills-list">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className={skill.unlocked ? "skill-badge unlocked" : "skill-badge locked"}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillTree;