import React from "react";
import styles from "../../modules/map/Map.module.css";

const Map = () => {
  return (
    <div className={styles.mapWrapper}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.130435129262!2d-122.41941568468196!3d37.774929779759325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c22a035b5%3A0xa6a3bc99e70f6df7!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1654784738221!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: "none", borderRadius: "20px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
