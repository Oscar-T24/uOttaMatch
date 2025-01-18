import { create } from "zustand";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../api/firebaseConfig";

const authStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  actions: {
    setUser: (user) => {
      set(() => ({ user, loading: false }));
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

    logoutWithFirebase: async () => {
      set(() => ({ loading: true }));
      try {
        await signOut(auth);
        set(() => ({ user: null, loading: false }));
      } catch (error) {
        set(() => ({ error: error.message, loading: false }));
      }
    },
  },
}));

export default authStore;
