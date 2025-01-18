import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../modules/profile/Profile.module.css";

const Profile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    console.log({ ...data, skills });
    reset();
    setSkills([]);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
    
      </header>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>University:</label>
            <input
              type="text"
              placeholder="Enter your university"
              {...register("university", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Skill Sets:</label>
            <div className={styles.skillInputContainer}>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter a skill and press 'Add'"
              />
              <button
                type="button"
                onClick={addSkill}
                className={styles.addSkillBtn}
              >
                Add
              </button>
            </div>
            <div className={styles.skillTags}>
              {skills.map((skill, index) => (
                <div key={index} className={styles.tag}>
                  {skill}
                  <span
                    className={styles.removeTag}
                    onClick={() => removeSkill(index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Age:</label>
            <input
              type="number"
              placeholder="Enter your age"
              min="1"
              {...register("age", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Gender:</label>
            <select {...register("gender", { required: true })}>
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Major (select one or more):</label>
            <select multiple {...register("major", { required: true })}>
              <option value="computer-science">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="arts">Arts</option>
              <option value="mathematics">Mathematics</option>
              <option value="biology">Biology</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Minor (select one or more):</label>
            <select multiple {...register("minor", { required: true })}>
              <option value="computer-science">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="arts">Arts</option>
              <option value="mathematics">Mathematics</option>
              <option value="biology">Biology</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
