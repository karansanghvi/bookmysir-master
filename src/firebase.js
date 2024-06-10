import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAkKpmKWKhh9-MNLADPs1NirNwvRziy0lU",
  authDomain: "bookmysir-eb349.firebaseapp.com",
  projectId: "bookmysir-eb349",
  storageBucket: "bookmysir-eb349.appspot.com",
  messagingSenderId: "598724369042",
  appId: "1:598724369042:web:143eb81005fba4f587a44b"
};

let app;
let db;
let auth;

// Initialize Firebase
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("Firebase connected");
} catch (error) {
  console.error("Firebase not connected:", error);
}

export { app, db, auth };
