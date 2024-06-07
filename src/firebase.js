import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, db, auth }; // Export app, db, and auth for use in other files
