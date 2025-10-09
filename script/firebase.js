// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANL7LcnFTWqoeeQx8D9seC0ZSOfYCC_ug",
  authDomain: "krishi-setu-bb4fd.firebaseapp.com",
  projectId: "krishi-setu-bb4fd",
  storageBucket: "krishi-setu-bb4fd.firebasestorage.app",
  messagingSenderId: "885445706403",
  appId: "1:885445706403:web:3061743a966414b975b516",
  measurementId: "G-PRZWTRJWC2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
