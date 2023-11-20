// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyB8WOQ-w_ezM5okagpRlya3o4WWf3QDRq4",

    authDomain: "secretmessage-c95dc.firebaseapp.com",

    projectId: "secretmessage-c95dc",

    storageBucket: "secretmessage-c95dc.appspot.com",

    messagingSenderId: "932777832534",

    appId: "1:932777832534:web:3543658e68f3d2c0a48bf7"

};


// Initialize Firebase -----------------------> use variable names as references throughout code
//const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);