import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../modules/Navbar/Navbar.module.css";
import { Link } from "react-router-dom";
import authStore from "../../store/authStore";
import hackathonStore from "../../store/hackathonStore";

const Navbar = () => {
  const hackStore = hackathonStore((state) => state);
  const { hackathons } = hackStore;

  console.log(hackathons);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHackathons, setFilteredHackathons] = useState([]);

  const authState = authStore((state) => state);
  const { setShowRegister } = authState;
  const { logoutWithFirebase } = authState.actions;

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredHackathons([]);
    } else {
      const filtered = hackathons.filter((hackathon) =>
        hackathon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHackathons(filtered);
    }
  };

  const displayedHackathons = filteredHackathons.slice(0, 10);

  const handleOnClickLogout = () => {
    logoutWithFirebase();
    setShowRegister(true);
  };

  const onHackathonClick = () => {
    setSearchQuery("");
    setFilteredHackathons([]);
  };

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <Link to="/">
            <span>HackMate</span>
          </Link>
        </div>
        <div className={styles.inputWrapper}>
          <input
            placeholder="Search for a hackathon you're attending"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => handleOnClickLogout()}>Logout</button>
        </div>
      </nav>

      {displayedHackathons.length > 0 && (
        <ul className={styles.resultsList}>
          {displayedHackathons.map((hackathon) => (
            <li key={hackathon.id}>
              <Link
                onClick={onHackathonClick}
                to={`/hackathons/${hackathon.id}`}
              >
                {hackathon.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
