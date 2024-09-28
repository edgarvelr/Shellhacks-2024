// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};