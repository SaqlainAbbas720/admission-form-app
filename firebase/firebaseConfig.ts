// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmtjgZ29BCgti9fbHEPUU-UwqEkI1KLR0",
   authDomain: "bzu-app-642c7.firebaseapp.com",
  projectId: "bzu-app-642c7",
storageBucket: "bzu-app-642c7.appspot.com",// ✅ must be appspot.com
  messagingSenderId: "70356449116",
  appId: "1:70356449116:web:bd0caeef581adeadbc3399",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);