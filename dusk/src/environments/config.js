// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, signInAnonymously} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW5OxWzEVtm9EyPJHkaiO3yTZarFAXrEA",
  authDomain: "cse3310-game.firebaseapp.com",
  databaseURL: "https://cse3310-game-default-rtdb.firebaseio.com",
  projectId: "cse3310-game",
  storageBucket: "cse3310-game.appspot.com",
  messagingSenderId: "739597303932",
  appId: "1:739597303932:web:3cb760a5849478110009f9"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);




export default firebaseApp = firebaseapp;

