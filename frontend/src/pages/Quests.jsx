import { getProfile } from "../utils/profileStorage";

function Quests() {
  const profile = getProfile();

  if (!profile) {
    return (
      <div className="page">
        <h1>Défis</h1>
        <div className="card">
          <p>Aucun profil chargé pour le moment. Retournez à l’accueil et saisissez un nom d’utilisateur GitHub.</p>
        </div>
      </div>
    );
  }

  const quests = Array.isArray(profile.quests) ? profile.quests : [];

  const groupedQuests = quests.reduce((acc, quest) => {
    const unit = quest.unit || "default";
    const unitLabel = quest.unit_label || "Défis";

    if (!acc[unit]) {
      acc[unit] = {
        unit,
        unitLabel,
        items: [],
      };
    }

    acc[unit].items.push(quest);
    return acc;
  }, {});

  const questGroups = Object.values(groupedQuests).map((group) => ({
    ...group,
    items: group.items.sort((a, b) => a.level - b.level),
  }));

  return (
    <div className="page">
      <h1>Défis</h1>

      {questGroups.length === 0 ? (
        <div className="card">
          <p>Aucun défi disponible pour ce profil.</p>
        </div>
      ) : (
        <div className="quest-units">
          {questGroups.map((group) => (
            <div className="card quest-unit-card" key={group.unit}>
              <div className="quest-unit-header">
                <h2>{group.unitLabel}</h2>
              </div>

              <div className="quest-tree">
                {group.items.map((quest, index) => (
                  <div
                    className={`quest-node ${quest.completed ? "done" : "todo"}`}
                    key={quest.id || `${group.unit}-${index}`}
                  >
                    <div className="quest-node-line"></div>
                    <div className="quest-node-dot">
                      {quest.completed ? "✓" : quest.level}
                    </div>

                    <div className="quest-node-content">
                      <p className="quest-node-level">Niveau {quest.level}</p>
                      <h3>{quest.title}</h3>
                      <p className="quest-node-progress">
                        Progression : {quest.current} / {quest.target}
                      </p>
                      <p className="quest-node-status">
                        {quest.completed ? "Terminé" : "En cours"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quests;