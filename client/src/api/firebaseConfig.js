import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdJRH829JpDXBFKGSSWwcNhJp-VyoYDYg",
  authDomain: "lms-accessibility-tool.firebaseapp.com",
  projectId: "lms-accessibility-tool",
  storageBucket: "lms-accessibility-tool.firebasestorage.app",
  messagingSenderId: "8560795643",
  appId: "1:8560795643:web:d7260ac6449f18228f355e",
  measurementId: "G-HWH69J8CNN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const gitProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

export { app, auth, gitProvider, googleProvider };
