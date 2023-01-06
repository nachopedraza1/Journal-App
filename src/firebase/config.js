// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcBjBYZ3qXinVrCAIwU96YbOyA1bW8CGA",
    authDomain: "jorunal-app-c904e.firebaseapp.com",
    projectId: "jorunal-app-c904e",
    storageBucket: "jorunal-app-c904e.appspot.com",
    messagingSenderId: "215401234245",
    appId: "1:215401234245:web:3847f47de8ee4edb23482c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
