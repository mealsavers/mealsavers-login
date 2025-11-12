import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Track logged-in user
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    // You can also display this info on the page if you want
  } else {
    console.log("No user logged in, redirecting to login page...");
    window.location.href = "index.html"; // Redirect if not logged in
  }
});

// Logout button logic
const logoutBtn = document.getElementById("logout-button");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      window.location.href = "index.html"; // Redirect to login
    } catch (error) {
      console.error("Error signing out:", error);
    }
  });
}
