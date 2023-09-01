import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD3w_HImbT6eb-lOvAiROu6hDurgLy9KZA",
    authDomain: "todo-list-52bce.firebaseapp.com",
    projectId: "todo-list-52bce",
    storageBucket: "todo-list-52bce.appspot.com",
    messagingSenderId: "156089758800",
    appId: "1:156089758800:web:692378bd6ecffc06ba8d55",
    measurementId: "G-2QBP44JWKB"
  };

  const app = initializeApp(firebaseConfig);
  export const db= getFirestore(app);