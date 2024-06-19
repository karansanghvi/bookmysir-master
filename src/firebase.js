import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const firestore = getFirestore(app);
export const storage = getStorage(app);