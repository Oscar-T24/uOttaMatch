import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../api/firebaseConfig";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import styles from "../../modules/auth/Auth.module.css";
import authStore from "../../store/authStore";
import Loader from "../loader/Loader";

const Auth = ({ children }) => {
  const authState = authStore((state) => state);
  const { user, loading, error } = authState;
  const {
    setUser,
    authWithFirebase,
    setError,
    clearError,
    handleGoogleLogin,
    handleGithubLogin,
  } = authState.actions;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await authWithFirebase(data);
    reset();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredentials) => {
      setUser(userCredentials);
      clearError();
    });

    return () => {
      unsubscribe();
    };
  }, [setUser, clearError]);

  if (loading) return <Loader />;
  if (user) return children;

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.title}>Welcome</h1>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className={errors.name ? styles.inputError : styles.input}
            />
            {errors.name && (
              <p className={styles.errorText}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? styles.inputError : styles.input}
            />
            {errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={errors.password ? styles.inputError : styles.input}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>

        <div className={styles.socialLoginContainer}>
          <p>Or sign in with:</p>
          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
