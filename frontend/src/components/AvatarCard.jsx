function AvatarCard({ avatarStage, level }) {
  const getAvatarEmoji = () => {
    if (avatarStage === "Beginner") return "🧑‍💻";
    if (avatarStage === "Intermediate") return "🦸";
    return "👑";
  };

  const getAvatarText = () => {
    if (avatarStage === "Beginner") return "Starter Explorer";
    if (avatarStage === "Intermediate") return "Skill Hunter";
    return "Career Master";
  };

  return (
    <div className="card avatar-card">
      <div className="avatar-visual">{getAvatarEmoji()}</div>
      <h2>{getAvatarText()}</h2>
      <p>Stage: {avatarStage}</p>
      <p>Level {level}</p>
    </div>
  );
}

export default AvatarCard;