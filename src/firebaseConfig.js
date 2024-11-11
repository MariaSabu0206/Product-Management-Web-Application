// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9qsfyoUCEkH9f-mY0w_-8YHrj3mpikCM",
  authDomain: "loginpage-bbe21.firebaseapp.com",
  projectId: "loginpage-bbe21",
  storageBucket: "loginpage-bbe21.appspot.com",
  messagingSenderId: "713098004963",
  appId: "1:713098004963:web:3883082bd4f15466e778d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);