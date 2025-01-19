import { create } from "zustand";

const hackathonStore = create((set) => ({
  hackathons: [
    {
      id: 1,
      name: "Hackathon 2025",
      date: "2025-06-15",
      location: "San Francisco, CA",
      description:
        "A premier hackathon to innovate and build futuristic solutions.",
      prizes: "$10,000, $5,000, $2,500",
      categories: ["AI", "Blockchain", "IoT"],
      registrationLink: "https://hackathon2025.com/register",
    },
    {
      id: 2,
      name: "uOttaHack",
      date: "2025-03-01",
      location: "Ottawa, ON",
      description:
        "A hackathon that brings together students to solve real-world problems.",
      prizes: "$5,000, $3,000, $1,000",
      categories: ["Healthcare", "Education", "FinTech"],
      registrationLink: "https://uottahack.com/register",
    },
    {
      id: 3,
      name: "TechCrunch Hackathon",
      date: "2025-04-10",
      location: "New York, NY",
      description:
        "Compete with the best minds to build cutting-edge technology.",
      prizes: "$20,000, $10,000, $5,000",
      categories: ["SaaS", "E-commerce", "Mobile Apps"],
      registrationLink: "https://techcrunch.com/hackathon",
    },
    {
      id: 4,
      name: "MLH Global Hackathon",
      date: "2025-05-22",
      location: "Remote",
      description:
        "Join hackers from around the globe to collaborate and create.",
      prizes: "Tech gadgets, Swag, Certificates",
      categories: ["Open Source", "Web Development", "Gaming"],
      registrationLink: "https://mlh.io/global-hackathon",
    },
    {
      id: 5,
      name: "Code for Good Hackathon",
      date: "2025-02-14",
      location: "Austin, TX",
      description: "Build impactful solutions for non-profits and social good.",
      prizes: "$15,000, $7,500, $3,000",
      categories: ["Sustainability", "Accessibility", "Public Health"],
      registrationLink: "https://codeforgood.com/register",
    },
    {
      id: 6,
      name: "HackMIT",
      date: "2025-09-05",
      location: "Cambridge, MA",
      description: "MIT’s flagship hackathon for students around the world.",
      prizes: "$25,000, $15,000, $10,000",
      categories: ["AI", "Cybersecurity", "Biotech"],
      registrationLink: "https://hackmit.edu/register",
    },
    {
      id: 7,
      name: "DevPost Hackathon",
      date: "2025-08-12",
      location: "Remote",
      description:
        "A hackathon hosted by DevPost to showcase innovative projects.",
      prizes: "$12,000, $8,000, $5,000",
      categories: ["APIs", "Developer Tools", "Machine Learning"],
      registrationLink: "https://devpost.com/hackathon",
    },
    {
      id: 8,
      name: "NASA Space Apps Challenge",
      date: "2025-10-02",
      location: "Global",
      description:
        "Collaborate with NASA to solve challenges for space exploration.",
      prizes: "NASA goodies, Certificates, Networking opportunities",
      categories: ["Aerospace", "Earth Observation", "Robotics"],
      registrationLink: "https://spaceappschallenge.org/register",
    },
    {
      id: 9,
      name: "Facebook Hackathon",
      date: "2025-11-20",
      location: "Menlo Park, CA",
      description:
        "Leverage Facebook’s platforms and APIs to build amazing apps.",
      prizes: "$50,000, $25,000, $15,000",
      categories: ["Social Media", "AI", "AR/VR"],
      registrationLink: "https://facebook.com/hackathon",
    },
    {
      id: 10,
      name: "Google AI Hackathon",
      date: "2025-07-18",
      location: "Mountain View, CA",
      description:
        "Use Google AI tools to develop transformative applications.",
      prizes: "$100,000, $50,000, $25,000",
      categories: ["AI", "Data Science", "Cloud Computing"],
      registrationLink: "https://ai.google.com/hackathon",
    },
    {
      id: 11,
      name: "HackTheNorth",
      date: "2025-09-30",
      location: "Waterloo, ON",
      description:
        "Canada’s largest hackathon, bringing together the best talent.",
      prizes: "$30,000, $20,000, $10,000",
      categories: ["AI", "EdTech", "FinTech"],
      registrationLink: "https://hackthenorth.com/register",
    },
    {
      id: 12,
      name: "GitHub Universe Hackathon",
      date: "2025-12-10",
      location: "San Francisco, CA",
      description:
        "Create groundbreaking projects with GitHub tools and integrations.",
      prizes: "$20,000, $10,000, $5,000",
      categories: ["DevOps", "Collaboration Tools", "Open Source"],
      registrationLink: "https://githubuniverse.com/hackathon",
    },
  ],
  actions: {},
}));

export default hackathonStore;
