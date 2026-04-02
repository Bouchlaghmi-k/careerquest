function SkillTree() {
  return (
    <div className="page">
      <h1>Skill Tree</h1>
      <div className="card-grid">
        <div className="card">
          <h2>Frontend</h2>
          <p>HTML, CSS, React</p>
        </div>

        <div className="card">
          <h2>Backend</h2>
          <p>Django, APIs, Authentication</p>
        </div>

        <div className="card">
          <h2>DevOps</h2>
          <p>Docker, CI/CD, Deployment</p>
        </div>
      </div>
    </div>
  );
}

export default SkillTree;