import { create } from "zustand";

const hackathonStore = create((set) => ({
  hackathons: [
    { id: 1, name: "Hackathon 2025" },
    { id: 2, name: "uOttaHack" },
    { id: 3, name: "TechCrunch Hackathon" },
    { id: 4, name: "MLH Global Hackathon" },
    { id: 5, name: "Code for Good Hackathon" },
    { id: 6, name: "HackMIT" },
    { id: 7, name: "DevPost Hackathon" },
    { id: 8, name: "NASA Space Apps Challenge" },
    { id: 9, name: "Facebook Hackathon" },
    { id: 10, name: "Google AI Hackathon" },
    { id: 11, name: "HackTheNorth" },
    { id: 12, name: "GitHub Universe Hackathon" },
  ],
  actions: {},
}));

export default hackathonStore;
