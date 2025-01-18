import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js"; // Corrected import

const firebaseConfig = {
  apiKey: "AIzaSyBvgQ_eMUzAX7EMsUEkPyY90_8qVzSWv5k",
  authDomain: "register-45783.firebaseapp.com",
  projectId: "register-45783",
  storageBucket: "register-45783.firebasestorage.app",
  messagingSenderId: "659945973394",
  appId: "1:659945973394:web:c7f1f187067f584357684b",
  measurementId: "G-7HDJXH0PZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Login form logic
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value; // Corrected id to match the password input field

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    console.log("User:", userCredential.user);
    // Optionally, redirect the user after login
    window.location.href = "login.html"; // Replace with your desired redirect page
  } catch (error) {
    alert("Error:" ${error.message});
  }
});
