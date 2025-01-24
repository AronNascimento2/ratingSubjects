import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIw3ShG244eC395zVMq5IvWKo2it7OW8M",
  authDomain: "crud-questions.firebaseapp.com",
  projectId: "crud-questions",
  storageBucket: "crud-questions.firebasestorage.app",
  messagingSenderId: "684024395348",
  appId: "1:684024395348:web:83e5023015cd66295b1fc1",
  measurementId: "G-20K08WRQ35",
};

 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
