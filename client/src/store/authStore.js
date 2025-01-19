import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../api/firebaseConfig";

const authStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  showRegister: true,
  userProfileCompleted: false,

  actions: {
    setUser: (user) => {
      set(() => ({ user, loading: false }));
    },

    setUserProfileCompleted: (userProfileState) => {
      set((state) => ({ ...state, userProfileCompleted: userProfileState }));
    },

    setLoading: (loading) => {
      set(() => ({ loading }));
    },

    setError: (error) => {
      set(() => ({ error, loading: false }));
    },

    clearError: () => {
      set(() => ({ error: null }));
    },

    setShowRegister: (registerState) => {
      set((state) => ({ ...state, showRegister: registerState }));
    },

    authWithFirebase: async (formData) => {
      set(() => ({ loading: true }));
      try {
        const { email, password } = formData;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        set((state) => ({
          ...state,
          user: userCredentials.user,
          loading: false,
        }));
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
      }
    },

    signInWithFirebase: async (formData) => {
      set(() => ({ loading: true }));
      try {
        const { email, password } = formData;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        set((state) => ({
          ...state,
          user: userCredentials.user,
          loading: false,
        }));
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
      }
    },

    logoutWithFirebase: async () => {
      set(() => ({ loading: true }));
      try {
        await signOut(auth);
        set(() => ({ user: null, loading: false }));
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
      }
    },

    handleGoogleLogin: async () => {
      set(() => ({ loading: true }));
      try {
        const provider = new GoogleAuthProvider();
        const userCredentials = await signInWithPopup(auth, provider);
        set((state) => ({
          ...state,
          user: userCredentials.user,
          loading: false,
        }));
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
      }
    },

    handleGithubLogin: async () => {
      set(() => ({ loading: true }));
      try {
        const provider = new GithubAuthProvider();
        const userCredentials = await signInWithPopup(auth, provider);
        set((state) => ({
          ...state,
          user: userCredentials.user,
          loading: false,
        }));
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
      }
    },
  },
}));

export default authStore;
