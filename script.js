// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPB4C2DmnB193mynPKWwAwqKUnhzUeg0",
  authDomain: "mealsavers-f5dbf.firebaseapp.com",
  projectId: "mealsavers-f5dbf",
  storageBucket: "mealsavers-f5dbf.appspot.com",
  messagingSenderId: "254383045667",
  appId: "1:254383045667:web:0c7c309e4661c78c8b8596",
  measurementId: "G-CKMP2L4FB6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle login + sign-up toggle
document.addEventListener("DOMContentLoaded", function () {
  const switchText = document.getElementById("switch-text");
  const nameField = document.getElementById("name");
  const submitButton = document.getElementById("submit-button");
  let isLogin = true;

  switchText.addEventListener("click", function () {
    isLogin = !isLogin;
    if (isLogin) {
      nameField.style.display = "none";
      submitButton.textContent = "Log In";
      switchText.textContent = "Let’s log in and snatch a Saver Sack. 😎";
    } else {
      nameField.style.display = "block";
      submitButton.textContent = "Sign Up";
      switchText.textContent = "Already saved your first sack? Log back in!";
    }
  });

  // Handle form submission
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isLogin) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => alert("Welcome back, Sack Saver!"))
        .catch(error => alert("Login error: " + error.message));
    } else {
      const name = document.getElementById("name").value;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => alert(`Welcome aboard, ${name}! Time to rescue some meals.`))
        .catch(error => alert("Signup error: " + error.message));
    }
  });
});

