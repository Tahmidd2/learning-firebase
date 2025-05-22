// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcIO5MrbVkFzaL--DHq_dtxToDyEdOV2Q", // ✅ fixed!
  authDomain: "learning-firebases-1ef67.firebaseapp.com",
  projectId: "learning-firebases-1ef67",
  storageBucket: "learning-firebases-1ef67.appspot.com",
  messagingSenderId: "728403214070",
  appId: "1:728403214070:web:7a32d3cce78a429d2ab6d7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
