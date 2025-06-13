
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvuiQEaQQ2M4Wijyc9LDDcDcFCRoZB4Sk",
  authDomain: "doutly-2771a.firebaseapp.com",
  projectId: "doutly-2771a",
  storageBucket: "doutly-2771a.firebasestorage.app",
  messagingSenderId: "127071830332",
  appId: "1:127071830332:web:b33f6535c79e5cf9ae5e39",
  measurementId: "G-38PH8PKJ72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
