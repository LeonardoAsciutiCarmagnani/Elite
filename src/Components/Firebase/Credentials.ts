// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ0ohbQdKfEEiSOcVQ-cFnTY47T7fQVEA",
  authDomain: "elite-1fbaa.firebaseapp.com",
  projectId: "elite-1fbaa",
  storageBucket: "elite-1fbaa.appspot.com",
  messagingSenderId: "484436943093",
  appId: "1:484436943093:web:d5b9875b2f6fdb675da5bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };