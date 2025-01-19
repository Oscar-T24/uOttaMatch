import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../modules/profile/Profile.module.css";
import authStore from "../../store/authStore";

const Profile = ({ children }) => {
  const { register, handleSubmit, reset } = useForm();
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const authState = authStore((state) => state);
  const { userProfileCompleted } = authState;
  const { setUserProfileCompleted } = authState.actions;

  const addItemToList = (input, setInput, list, setList) => {
    const normalizedInput = input.trim().toLowerCase();
    if (normalizedInput && !list.includes(normalizedInput)) {
      setList([...list, normalizedInput]);
      setInput("");
    }
  };

  const removeItemFromList = (index, list, setList) => {
    setList(list.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    window.scrollTo({
      top: 0,
    });
    setUserProfileCompleted(true);

    const setData = {
      ...data,
      skills,
      languages,
    };

    console.log("Profile data being sent to backend:", setData);

    fetch("http://localhost:5000/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(setData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    reset();
    setSkills([]);
    setLanguages([]);
  };

  if (userProfileCompleted) return children;

  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Create Your Profile</h1>
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
            <label>Bio:</label>
            <textarea
              placeholder="Tell us something about yourself"
              {...register("bio")}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Programming Languages:</label>
            <div className={styles.languageInputContainer}>
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder="Enter a programming language and press 'Add'"
              />
              <button
                type="button"
                onClick={() =>
                  addItemToList(
                    languageInput,
                    setLanguageInput,
                    languages,
                    setLanguages
                  )
                }
                className={styles.addSkillBtn}
              >
                Add
              </button>
            </div>
            <div className={styles.skillTags}>
              {languages.map((language, index) => (
                <div key={index} className={styles.tag}>
                  {language}
                  <span
                    className={styles.removeTag}
                    onClick={() =>
                      removeItemFromList(index, languages, setLanguages)
                    }
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Skills:</label>
            <div className={styles.skillInputContainer}>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter a skill and press 'Add'"
              />
              <button
                type="button"
                onClick={() =>
                  addItemToList(skillInput, setSkillInput, skills, setSkills)
                }
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
                    onClick={() => removeItemFromList(index, skills, setSkills)}
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
            <label>Major (select):</label>
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
            <label>Minor (select):</label>
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
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
