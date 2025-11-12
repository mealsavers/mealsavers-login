// Line 1: Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAP84C2DmnB193myPKhWwAwqKUhnzUeg0",
  authDomain: "mealsavers-f5dbf.firebaseapp.com",
  projectId: "mealsavers-f5dbf",
  storageBucket: "mealsavers-f5dbf.appspot.com",
  messagingSenderId: "254383045667",
  appId: "1:254383045667:web:0c7c309e4661c78c8b8596",
  measurementId: "G-CXMP2L4FB6"
};

// Line 12: Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Line 15: Setup toggle & button behavior
document.addEventListener("DOMContentLoaded", function () {
  const switchText = document.getElementById("switch-text");
  const nameField = document.getElementById("name");
  const confirmPassword = document.getElementById("confirm-password");
  const submitButton = document.getElementById("submit-button");
  let isLogin = true;

  switchText.addEventListener("click", function () {
    isLogin = !isLogin;
    if (isLogin) {
      nameField.style.display = "none";
      confirmPassword.style.display = "none";
      submitButton.textContent = "Log In";
      switchText.textContent = "New here? Create an account";
    } else {
      nameField.style.display = "block";
      confirmPassword.style.display = "block";
      submitButton.textContent = "Sign Up";
      switchText.textContent = "Already saved your first sack? Log back in 😎";
    }
  });

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (isLogin) {
      alert("Logging in... (Firebase logic coming next)");
    } else {
      alert("Signing up... (Firebase logic coming next)");
    }
  });
});
