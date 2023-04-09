import { initializeApp } from "firebase/app";

// Initialize Firebase


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUK,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MEMSAGINSENDID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};



const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
