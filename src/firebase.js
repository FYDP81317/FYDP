import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA70kEUX9X2OkA_MMQwhcqzrT7jYBhQvyQ",
    authDomain: "medical-records-fyp.firebaseapp.com",
    projectId: "medical-records-fyp",
    storageBucket: "medical-records-fyp.appspot.com",
    messagingSenderId: "195356343131",
    appId: "1:195356343131:web:6bf77172bee1df00fcf87e",
    measurementId: "G-WXGPG7PYNQ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };