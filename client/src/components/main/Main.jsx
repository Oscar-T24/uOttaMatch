import React from "react";
import styles from "../../modules/main/Main.module.css";
import { FaArrowDown } from "react-icons/fa";

const Main = () => {
  return (
    <div className={styles.screenContainer}>
      <div className={styles.screen}>
        <h1>HackMate</h1>
      </div>
      <div className={styles.arrowDown}>
        <FaArrowDown fontSize={30} />
      </div>
    </div>
  );
};

export default Main;
