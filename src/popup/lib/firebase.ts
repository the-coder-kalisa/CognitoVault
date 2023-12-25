// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCm-fOV6cYQKLxDlxztH5005IDwzJlCqZM",
  authDomain: "cognitovault.firebaseapp.com",
  databaseURL: "https://cognitovault-default-rtdb.firebaseio.com",
  projectId: "cognitovault",
  storageBucket: "cognitovault.appspot.com",
  messagingSenderId: "104237500944",
  appId: "1:104237500944:web:27b06355637fd11202d895",
  measurementId: "G-VGDB42GJJV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
