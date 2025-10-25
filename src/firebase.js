// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWSesJBDvC2oNSL9UObSVwoEAOzJobAWY",
  authDomain: "chatbot-dc309.firebaseapp.com",
  projectId: "chatbot-dc309",
  storageBucket: "chatbot-dc309.appspot.com",
  messagingSenderId: "999145904069",
  appId: "1:999145904069:web:5fb7da6835d5a4ded4ddac",
  measurementId: "G-6Q1SE7GD6D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { signInWithEmailAndPassword, createUserWithEmailAndPassword };
