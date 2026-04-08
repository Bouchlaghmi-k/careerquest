import { Link } from "react-router-dom";
import { getProfile } from "../utils/profileStorage";
import logo from "../assets/logo_careerquest_clean.png";

function Navbar() {
  const profile = getProfile();

  return (
    <nav className="navbar clean-navbar">
      <div className="navbar-inner clean-navbar-inner">
        <Link to="/" className="brand-wrap clean-brand-wrap">
          <img src={logo} alt="CareerQuest logo" className="brand-logo-img clean-brand-logo" />

          <div className="brand-copy">
            <span className="brand-title">CareerQuest</span>
            <span className="brand-subtitle">Gamified career growth</span>
          </div>
        </Link>

        <div className="nav-links clean-nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/quests">Quests</Link>
          <Link to="/skills">Skill Tree</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="nav-right clean-nav-right">
          {profile ? (
            <div className="nav-mini-profile">
              <img src={profile.avatar_url} alt={profile.username} className="nav-mini-avatar" />
              <div className="nav-mini-copy">
                <span>@{profile.username}</span>
                <small>Lvl {profile.level}</small>
              </div>
            </div>
          ) : (
            <div className="nav-status-pill">Demo Mode</div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;