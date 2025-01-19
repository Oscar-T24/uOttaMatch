import { create } from "zustand";

const userStore = create((set) => ({
  users: [],

  actions: {
    setUsers: (users) => {
      set((state) => ({ ...state, users }));
    },
  },
}));

export default userStore;
