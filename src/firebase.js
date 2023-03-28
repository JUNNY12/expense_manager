// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import {getAuth} from "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEZry3oqCVk7kScniY1WcMY9O2uFz1kB8",
  authDomain: "expense-manager-a8707.firebaseapp.com",
  databaseURL: "https://expense-manager-a8707-default-rtdb.firebaseio.com",
  projectId: "expense-manager-a8707",
  storageBucket: "expense-manager-a8707.appspot.com",
  messagingSenderId: "476167034468",
  appId: "1:476167034468:web:d90a4a39101956a923b171",
  measurementId: "G-KPBYKY9GB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

export default app;
