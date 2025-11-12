// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP84C2DmnB193myPkWWAwqUKnhzUeg0",
  authDomain: "mealsavers-f5dbf.firebaseapp.com",
  projectId: "mealsavers-f5dbf",
  storageBucket: "mealsavers-f5dbf.appspot.com",
  messagingSenderId: "254383045667",
  appId: "1:254383045667:web:0c7c309e4661c78c8b8596",
  measurementId: "G-CXMP2L4FB6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Login/signup toggle logic
document.addEventListener("DOMContentLoaded", function () {
  const switchText = document.getElementById("switch-text");
  const nameField = document.getElementById("name");
  const confirmPasswordField = document.getElementById("confirm-password");
  const submitButton = document.getElementById("submit-button");

  let isLogin = true;

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
      switchText.textContent = "Already saved your first sack? Log back in 😎";
    }
  });

  // Initial field visibility
  nameField.style.display = "none";
  confirmPasswordField.style.display = "none";

  // Basic test
  submitButton.addEventListener("click", function () {
    alert("Your script is working!");
  });
});
