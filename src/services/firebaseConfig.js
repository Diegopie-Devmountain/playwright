
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
// console.log(import.meta.env.VITE_apiKey);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase 
const firebaseApp = initializeApp(firebaseConfig);
// Our Reference to Our Firebase App Storage
export const storage = getStorage(firebaseApp);
