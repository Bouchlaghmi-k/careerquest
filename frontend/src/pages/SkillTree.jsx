import { getProfile } from "../utils/profileStorage";

function SkillTree() {
  const profile = getProfile();

  if (!profile) {
    return (
      <div className="page">
        <h1>Skill Tree</h1>
        <div className="card">
          <p>No profile loaded yet. Go to Home and enter a GitHub username.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Skill Tree</h1>

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