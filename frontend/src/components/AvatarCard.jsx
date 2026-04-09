function AvatarCard({ avatarStage, level }) {
  const getAvatarEmoji = () => {
    if (avatarStage === "Beginner") return "🧑‍💻";
    if (avatarStage === "Intermediate") return "🦸";
    return "👑";
  };

  const getAvatarText = () => {
    if (avatarStage === "Beginner") return "Explorateur débutant";
    if (avatarStage === "Intermediate") return "Chasseur de compétences";
    return "Maître de carrière";
  };

  return (
    <div className="card avatar-card">
      <div className="avatar-visual">{getAvatarEmoji()}</div>
      <h2>{getAvatarText()}</h2>
      <p>Palier : {avatarStage}</p>
      <p>Niveau {level}</p>
    </div>
  );
}

export default AvatarCard;