// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5tlBdOTzTTIkp9v3JJ_rKV86CBx9io5U",
  authDomain: "alumni-connect-183a3.firebaseapp.com",
  projectId: "alumni-connect-183a3",
  storageBucket: "alumni-connect-183a3.firebasestorage.app",
  messagingSenderId: "680808611925",
  appId: "1:680808611925:web:d3082374388ff571ffd4dc",
};

const app = initializeApp(firebaseConfig);

// ✅ Export auth & firestore for use in Signup page
export const auth = getAuth(app);
export const db = getFirestore(app);
