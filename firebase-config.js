// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfei2u8lP_bkbbcVjNUDXTA5H765sasts",
  authDomain: "cross-mobile-app.firebaseapp.com",
  projectId: "cross-mobile-app",
  storageBucket: "cross-mobile-app.appspot.com",
  messagingSenderId: "24885664838",
  appId: "1:24885664838:web:5a0709b5a1daba685efe47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);