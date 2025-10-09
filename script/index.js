// script.js
import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const accountBtn = document.getElementById("AccountBtn");

// Keep a reference to the logout handler so we can remove it if needed
function handleLogoutClick(e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log("Logged out");
      alert("Logout Successful");
      window.location.href = "#";
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Logged in → show Logout
    accountBtn.textContent = "Logout";
    accountBtn.href = "#";
    accountBtn.onclick = handleLogoutClick;
  } else {
    accountBtn.textContent = "Account";
    accountBtn.href = "Account.html";
    accountBtn.onclick = null; // Remove logout handler
  }
});
