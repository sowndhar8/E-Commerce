import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAi0c9_EVj3Ea36xP7o7LTi3X87a1RQ7Ds",
  authDomain: "e-commerce-2414c.firebaseapp.com",
  projectId: "e-commerce-2414c",
  storageBucket: "e-commerce-2414c.firebasestorage.app",
  messagingSenderId: "1078538407639",
  appId: "1:1078538407639:web:2c50a5fcdc61f317592a92",
  measurementId: "G-9XW5XL5RNY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, RecaptchaVerifier, signInWithPhoneNumber };