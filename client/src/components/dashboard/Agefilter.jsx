import React, { useState } from 'react';
import styles from "../../modules/main/Main.module.css";


function Agefilter() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");

  return (
    <div>

      <div className="filterBar">
        <select
          value={selectedAgeGroup}
          onChange={(e) => setSelectedAgeGroup(e.target.value)}
          className="dropdown"
        >
          <option value="">Select Age Group</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          <option value="50+">50+</option>
        </select>
      </div>

      <style jsx>{`
        .dashboardlink {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .filterBar {
          margin-bottom: 20px;
        }

        .dropdown {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        .selectedAge {
          margin-top: 20px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}

export default Agefilter;
