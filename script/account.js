// === account.js ===
import { auth } from "./firebase.js";
import { db } from "./firebase.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// === REGISTER FORM ELEMENTS ===
const registerForm = document.getElementById("registerForm");
const signupBtn = registerForm.querySelector("button");
const signupFullName = registerForm.querySelector(
  'input[placeholder="Enter your full name"]'
);
const signupEmail = registerForm.querySelector(
  'input[placeholder="Enter your email"]'
);
const signupMobile = registerForm.querySelector(
  'input[placeholder="Enter phone number"]'
);
const signupPin = registerForm.querySelector(
  'input[placeholder="Enter your area PIN"]'
);
const signupState = registerForm.querySelector(
  'input[placeholder="Enter state"]'
);
const signupDistrict = registerForm.querySelector(
  'input[placeholder="Enter district"]'
);
const signupPassword = registerForm.querySelector(
  'input[placeholder="Enter password"]'
);
const signupConfirmPassword = registerForm.querySelector(
  'input[placeholder="Confirm password"]'
);

// === LOGIN FORM ELEMENTS ===
const loginForm = document.getElementById("loginForm");
const signinBtn = loginForm.querySelector("button");
const signinEmail = loginForm.querySelector('input[type="email"]');
const signinPassword = loginForm.querySelector('input[type="password"]');

// === PASSWORD RECOVERY LINK (OPTIONAL PROMPT) ===
const recoverLink = document.getElementById("recoverPasswordLink");

// === SIGN UP LOGIC ===
signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const fullName = signupFullName.value.trim();
  const email = signupEmail.value.trim();
  const mobile = signupMobile.value.trim();
  const pin = signupPin.value.trim();
  const state = signupState.value.trim();
  const district = signupDistrict.value.trim();
  const password = signupPassword.value.trim();
  const confirmPassword = signupConfirmPassword.value.trim();

  if (
    !fullName ||
    !email ||
    !mobile ||
    !pin ||
    !state ||
    !district ||
    !password ||
    !confirmPassword
  ) {
    alert("⚠ Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("⚠ Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      mobile,
      pin,
      state,
      district,
      email,
      password,
      createdAt: new Date().toISOString(),
    });

    await sendEmailVerification(user);
    alert(
      "✅ Sign up successful! Verification email sent. Please check your inbox or spam folder."
    );
    await auth.signOut();
    window.location.href = "index.html";
  } catch (error) {
    alert("Sign up error: " + error.message);
  }
});

// === SIGN IN LOGIC ===
signinBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = signinEmail.value.trim();
  const password = signinPassword.value.trim();

  if (!email || !password) {
    alert("⚠ Please enter email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      await auth.signOut();
      alert("⚠ Please verify your email before signing in.");
      return;
    }

    alert("✅ Sign in successful!");
    console.log("User logged in:", user.email);
    window.location.href = "index.html";
  } catch (error) {
    alert("Sign in error: " + error.message);
  }
});

// === RECOVER PASSWORD FEATURE ===
if (recoverLink) {
  recoverLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = prompt("Enter your registered email address:");
    if (!email) {
      alert("⚠ Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        "📧 Password reset email sent! Check your inbox (and spam folder)."
      );
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
}
