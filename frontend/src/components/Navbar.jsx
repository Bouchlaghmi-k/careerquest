import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProfile,
  subscribeToProfileUpdates,
} from "../utils/profileStorage";
import logo from "../assets/logo_careerquest_clean.png";

function Navbar() {
  const [profile, setProfile] = useState(getProfile());

  useEffect(() => {
    const unsubscribe = subscribeToProfileUpdates((updatedProfile) => {
      setProfile(updatedProfile);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar clean-navbar">
      <div className="navbar-inner clean-navbar-inner">
        <Link to="/" className="brand-wrap clean-brand-wrap">
          <div className="brand-logo-box">
            <img
              src={logo}
              alt="Logo CareerQuest"
              className="brand-logo-img clean-brand-logo"
            />
          </div>

          <div className="brand-copy">
            <span className="brand-title">CareerQuest</span>
            <span className="brand-subtitle">
              Faites évoluer votre carrière en relevant des défis
            </span>
          </div>
        </Link>

        <div className="nav-links clean-nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/dashboard">Tableau de bord</Link>
          <Link to="/quests">Défis</Link>
          <Link to="/skills">Compétences</Link>
          <Link to="/leaderboard">Classement</Link>
          <Link to="/profile">Profil</Link>
        </div>

        <div className="nav-right clean-nav-right">
          {profile && (
            <div className="nav-mini-profile">
              <img
                src={profile.avatar_url}
                alt={profile.username}
                className="nav-mini-avatar"
              />
              <div className="nav-mini-copy">
                <span>@{profile.username}</span>
                <small>Niveau {profile.level}</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;