/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4iYLMXTOQNjb6r-dxhG0qTh2skbnJ6Fs",
  authDomain: "to-do-a3ed7.firebaseapp.com",
  projectId: "to-do-a3ed7",
  storageBucket: "to-do-a3ed7.appspot.com",
  messagingSenderId: "140118077212",
  appId: "1:140118077212:web:c128a7f129fb36ec8394d9"
};*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const database = getFirestore();

//Initialize Authentication
const auth = getAuth(app)

export { database, auth }
