import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../modules/Navbar/Navbar.module.css";
import { Link } from "react-router-dom";
import authStore from "../../store/authStore";

const hackathons = [
  { id: 1, name: "Hackathon 2025" },
  { id: 2, name: "uOttaHack" },
  { id: 3, name: "TechCrunch Hackathon" },
  { id: 4, name: "MLH Global Hackathon" },
  { id: 5, name: "Code for Good Hackathon" },
  { id: 6, name: "HackMIT" },
  { id: 7, name: "DevPost Hackathon" },
  { id: 8, name: "NASA Space Apps Challenge" },
  { id: 9, name: "Facebook Hackathon" },
  { id: 10, name: "Google AI Hackathon" },
  { id: 11, name: "HackTheNorth" },
  { id: 12, name: "GitHub Universe Hackathon" },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHackathons, setFilteredHackathons] = useState([]);

  const authState = authStore((state) => state);
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

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <span>HackMate</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            placeholder="Search for a hackathon you're attending"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className={styles.iconWrapper}>
            <FaSearch />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={logoutWithFirebase}>Logout</button>
        </div>
      </nav>

      {displayedHackathons.length > 0 && (
        <ul className={styles.resultsList}>
          {displayedHackathons.map((hackathon) => (
            <li key={hackathon.id}>
              <Link to={`/hackathons/${hackathon.id}`}>{hackathon.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
