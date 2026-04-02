import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">CareerQuest</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/quests">Quests</Link>
        <Link to="/skills">Skill Tree</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;