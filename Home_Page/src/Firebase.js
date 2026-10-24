import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9Y7pPHNct8rhDacTqpUZuCUPmXrWzmTA",
  authDomain: "dev-deakin-1cc7d.firebaseapp.com",
  projectId: "dev-deakin-1cc7d",
  storageBucket: "dev-deakin-1cc7d.firebasestorage.app",
  messagingSenderId: "467222171966",
  appId: "1:467222171966:web:f7ff86f8d8683ddaae1c6f",
  measurementId: "G-D8140DZXMC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);