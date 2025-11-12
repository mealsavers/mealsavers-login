// Firebase config — USE YOURS FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById('name').style.display = isLogin ? 'none' : 'block';
  document.getElementById('confirm-password').style.display = isLogin ? 'none' : 'block';
  document.getElementById('action-btn').textContent = isLogin ? 'Log In' : 'Sign Up';
  document.getElementById('switch-text').textContent = isLogin
    ? "Let’s log in and sniff out a Saver Sack."
    : "Let’s get you a seat at the table!";
}

function togglePassword() {
  const pw = document.getElementById('password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
}

function handleAuth() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  if (isLogin) {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        message.textContent = "Logged in! Grabbing your Saver Sacks...";
      })
      .catch(err => {
        message.textContent = err.message;
      });
  } else {
    const confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
      message.textContent = "Passwords don’t match. No Saver Sack for you!";
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        userCred.user.sendEmailVerification();
        message.textContent = "Account created! Check your email to verify.";
      })
      .catch(err => {
        message.textContent = err.message;
      });
  }
}

function resetPassword() {
  const email = document.getElementById('email').value;
  const message = document.getElementById('message');

  if (!email) {
    message.textContent = "Enter your email first, snack master.";
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      message.textContent = "Reset email sent. Check that inbox!";
    })
    .catch(err => {
      message.textContent = err.message;
    });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      document.getElementById('message').textContent = "Signed in with Google — welcome, genius!";
    })
    .catch(err => {
      document.getElementById('message').textContent = err.message;
    });
}
