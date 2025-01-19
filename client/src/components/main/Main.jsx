import React from "react";
import styles from "../../modules/main/Main.module.css";
import { FaArrowDown } from "react-icons/fa";

const Main = () => {
  return (
    <div className={styles.screenContainer}>
      <div className={styles.screen}>
        <h1>HackMate</h1>
        <div className={styles.cube}>
          <div className={`${styles.front} ${styles.side}`}></div>
          <div className={`${styles.back} ${styles.side}`}></div>
          <div className={`${styles.left} ${styles.side}`}></div>
          <div className={`${styles.right} ${styles.side}`}></div>
          <div className={`${styles.top} ${styles.side}`}></div>
          <div className={`${styles.bottom} ${styles.side}`}></div>
        </div>
      </div>
      {/* <div className={styles.arrowDown}>
        <FaArrowDown fontSize={30} />
      </div> */}
    </div>
  );
};

export default Main;
