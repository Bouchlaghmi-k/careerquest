import { Link } from "react-router-dom";
import { getProfile } from "../utils/profileStorage";

function Navbar() {
  const profile = getProfile();

  return (
    <nav className="navbar">
      <div className="logo">CareerQuest</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/quests">Quests</Link>
        <Link to="/skills">Skill Tree</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {profile && (
        <div className="nav-profile">
          <img src={profile.avatar_url} alt={profile.username} className="nav-avatar" />
          <span>@{profile.username}</span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;