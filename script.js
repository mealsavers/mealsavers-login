// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP84C2DmnB193mynPKkWwAwqKUhnzUeg0",
  authDomain: "mealsavers-f5dbf.firebaseapp.com",
  projectId: "mealsavers-f5dbf",
  storageBucket: "mealsavers-f5dbf.appspot.com",
  messagingSenderId: "254383045667",
  appId: "1:254383045667:web:0c7c309e4661c78c8b8596",
  measurementId: "G-CKMP2L4FB6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle login + signup toggle
document.addEventListener("DOMContentLoaded", function () {
  const switchText = document.getElementById("switch-text");
  const nameField = document.getElementById("name");
  const confirmField = document.getElementById("confirm-password");
  const submitButton = document.getElementById("submit-button");

  let isLogin = true;

  switchText.addEventListener("click", function () {
    isLogin = !isLogin;

    if (isLogin) {
      nameField.style.display = "none";
      confirmField.style.display = "none";
      submitButton.textContent = "Log In";
      switchText.textContent = "Let's log in and snatch a Saver Sack. 😎";
    } else {
      nameField.style.display = "block";
      confirmField.style.display = "block";
      submitButton.textContent = "Sign Up";
      switchText.textContent = "Already saved your first sack? Log back in!";
    }
  });

  // Handle form submission
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameField.value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isLogin) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => alert(`Welcome back, Sack Sniffer!`))
        .catch(error => alert("Login error: " + error.message));
    } else {
      const confirmPassword = confirmField.value;
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => alert(`Welcome aboard, ${name}! Time to rescue some meals.`))
        .catch(error => alert("Signup error: " + error.message));
    }
  });
});
