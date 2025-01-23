// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIw3ShG244eC395zVMq5IvWKo2it7OW8M",
  authDomain: "crud-questions.firebaseapp.com",
  projectId: "crud-questions",
  storageBucket: "crud-questions.firebasestorage.app",
  messagingSenderId: "684024395348",
  appId: "1:684024395348:web:83e5023015cd66295b1fc1",
  measurementId: "G-20K08WRQ35",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
