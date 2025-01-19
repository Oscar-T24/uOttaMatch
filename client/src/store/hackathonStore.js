import { create } from "zustand";

const hackathonStore = create((set) => ({
  hackathons: [
    {
      id: 1,
      name: "uOttaHack",
      date: "2025-03-01",
      location: "Ottawa, ON",
      description:
        "A hackathon that brings together students to solve real-world problems.",
      prizes: "$5,000, $3,000, $1,000",
      categories: ["Healthcare", "Education", "FinTech"],
      registrationLink: "https://uottahack.com/register",
    },
  ],
  actions: {},
}));

export default hackathonStore;
