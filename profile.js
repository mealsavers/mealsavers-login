import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("email").value = user.email;

    document.getElementById("profile-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const zipCode = document.getElementById("zipCode").value.trim();
      const birthMonth = document.getElementById("birthMonth").value;
      const birthDay = document.getElementById("birthDay").value;
      const phone = document.getElementById("phone").value.trim();
      const textOptIn = document.getElementById("textOptIn").checked;

      try {
        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          email: user.email,
          zipCode,
          birthMonth,
          birthDay,
          phone,
          textOptIn
        });

        alert("Profile saved! Now go grab a snack. 🍕");
        window.location.href = "home.html";
      } catch (error) {
        console.error("Error saving profile:", error);
        alert("Oops, something went wrong. Try again?");
      }
    });
  } else {
    window.location.href = "index.html"; // redirect to login if not signed in
  }
});
