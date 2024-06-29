// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import auth module

const firebaseConfig = {
  apiKey: "AIzaSyBiMDxx-O7mywt7D8mlbnqwWpEN7xOBTWk",
  authDomain: "bookmysir-ea46a.firebaseapp.com",
  projectId: "bookmysir-ea46a",
  storageBucket: "bookmysir-ea46a.appspot.com",
  messagingSenderId: "970389774474",
  appId: "1:970389774474:web:164050a28b007630210d73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore, Storage, and Auth
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // Export auth instance
export default app; // Export the app instance for general use
