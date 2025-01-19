import React from "react";
import { useParams } from "react-router-dom";
import hackathonStore from "../../store/hackathonStore";
import styles from "../../modules/hackathons/Hackathon.module.css";
import Map from "../map/Map";
import { useNavigate } from "react-router-dom";

const Hackathon = () => {
  const params = useParams();
  const { id } = params;

  const hackStore = hackathonStore((state) => state);
  const { hackathons } = hackStore;

  const filteredHackathon = hackathons.filter(
    (hackathon) => hackathon.id === parseInt(id)
  );

  const navigate = useNavigate();

  return (
    <div className={styles["hackathon-container"]}>
      {filteredHackathon.map((hackathon) => (
        <div key={hackathon.id} className={styles["hackathon-card"]}>
          <h1 className={styles["hackathon-title"]}>{hackathon.name}</h1>
          <p className={styles["hackathon-date"]}>
            <strong>Date:</strong> {hackathon.date}
          </p>
          <p className={styles["hackathon-location"]}>
            <strong>Location:</strong> {hackathon.location}
          </p>
          <p className={styles["hackathon-description"]}>
            {hackathon.description}
          </p>
          <p className={styles["hackathon-prizes"]}>
            <strong>Prizes:</strong> {hackathon.prizes}
          </p>
          <div className={styles["hackathon-categories"]}>
            <strong>Categories:</strong>
            <ul>
              {hackathon.categories.map((category, index) => (
                <li key={index} className={styles["hackathon-category"]}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <a
            onClick={() => navigate("/dashboard")}
            className={styles["hackathon-register"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Your Team!
          </a>
          <Map />
        </div>
      ))}
    </div>
  );
};

export default Hackathon;
