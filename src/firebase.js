// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3RtfZsloHVRAVvB7B3Jd_2_78QnIeANU",
  authDomain: "todo-4cf07.firebaseapp.com",
  projectId: "todo-4cf07",
  storageBucket: "todo-4cf07.appspot.com",
  messagingSenderId: "120777297060",
  appId: "1:120777297060:web:2e84ab5f0667693b0b6a31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const database = getFirestore();

//Initialize Authentication
const auth = getAuth(app)

export { database, auth }
