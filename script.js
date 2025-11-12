// Firebase config - already loaded in firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const submitBtn = document.getElementById("submit-button");
const switchText = document.getElementById("switch-text");

let isLogin = true;

// Toggle Login ↔ Sign Up
switchText.addEventListener("click", () => {
  isLogin = !isLogin;
  submitBtn.textContent = isLogin ? "Log In" : "Sign Up";
  switchText.textContent = isLogin ? "New here? Create an account" : "Already have an account? Log in";
  nameInput.style.display = isLogin ? "none" : "block";
  confirmPasswordInput.style.display = isLogin ? "none" : "block";
});

// Submit Button
submitBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!email || !password) {
    alert("Email and password are required.");
    return;
  }

  if (!isLogin) {
    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created! Logging you in...");
      window.location.href = "home.html";
    } catch (error) {
      alert("Error: " + error.message);
    }
  } else {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "home.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  }
});
// Google Sign-In
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const googleButton = document.getElementById("google-signin");

googleButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`Welcome, ${user.displayName}!`);
    window.location.href = "home.html";
  } catch (error) {
    alert("Google Sign-In failed: " + error.message);
  }
});
