// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbcpxulogJ_uzw3ZViviJ2NySqmUPestM",
  authDomain: "suraksha-kendra.firebaseapp.com",
  projectId: "suraksha-kendra",
  storageBucket: "suraksha-kendra.firebasestorage.app",
  messagingSenderId: "971905095462",
  appId: "1:971905095462:web:97f458e6720faa1f35d3e7",
  measurementId: "G-S6JMYYBCH0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);