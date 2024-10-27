import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUSWmHPAKa2F0SB_VYKJsDNnU_9wvjz7o",
  authDomain: "driving-school-6a10c.firebaseapp.com",
  projectId: "driving-school-6a10c",
  storageBucket: "driving-school-6a10c.appspot.com",
  messagingSenderId: "336588621730",
  appId: "1:336588621730:web:f6e58a9a5ee69850b514fb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const provider = new GoogleAuthProvider();
