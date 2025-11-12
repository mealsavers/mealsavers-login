// Line 1: Firebase configuration is already set in firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
document.addEventListener("DOMContentLoaded", function () {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirm-password");
  const submitButton = document.getElementById("submit-button");
  const switchText = document.getElementById("switch-text");
  let isLogin = true;

  // Toggle login/signup
  switchText.addEventListener("click", function () {
    isLogin = !isLogin;
    if (isLogin) {
      nameField.style.display = "none";
      confirmPasswordField.style.display = "none";
      submitButton.textContent = "Log In";
      switchText.textContent = "New here? Create an account";
    } else {
      nameField.style.display = "block";
      confirmPasswordField.style.display = "block";
      submitButton.textContent = "Sign Up";
      switchText.textContent = "Already signed up? Log in instead";
    }
  });

  // Login or Sign Up
  submitButton.addEventListener("click", function () {
    const email = emailField.value.trim();
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (!email || !password || (!isLogin && !confirmPassword)) {
      alert("Please fill out all fields.");
      return;
    }

    if (!isLogin) {
      // Sign Up
      if (password !== confirmPassword) {
        alert("Passwords don’t match!");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Sign-up successful! Redirecting to home...");
          window.location.href = "home.html";
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    } else {
      // Log In
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Login successful! Redirecting...");
          window.location.href = "home.html";
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    }
  });
});
