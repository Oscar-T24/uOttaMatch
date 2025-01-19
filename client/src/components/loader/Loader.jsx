import React from "react";
import styles from "../../modules/loader/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.cube}>
        <div className={`${styles.front} ${styles.side}`}></div>
        <div className={`${styles.back} ${styles.side}`}></div>
        <div className={`${styles.left} ${styles.side}`}></div>
        <div className={`${styles.right} ${styles.side}`}></div>
        <div className={`${styles.top} ${styles.side}`}></div>
        <div className={`${styles.bottom} ${styles.side}`}></div>
      </div>
    </div>
  );
};

export default Loader;
