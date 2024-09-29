// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoaRDwRoZr3KJPyyleTtdPYy3n0NOM93k",
  authDomain: "panther-pal.firebaseapp.com",
  projectId: "panther-pal",
  storageBucket: "panther-pal.appspot.com",
  messagingSenderId: "1023110627536",
  appId: "1:1023110627536:web:b1210f5e44f3878a98ded5",
  measurementId: "G-CBS3J0YZ2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize analytics only if supported
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db };
