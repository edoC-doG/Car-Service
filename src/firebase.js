// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQpLqxM60sdDKGlfmzYs8-bg-iQIc2HN4",
  authDomain: "tiemhomiev3.firebaseapp.com",
  projectId: "tiemhomiev3",
  storageBucket: "tiemhomiev3.appspot.com",
  messagingSenderId: "722280915889",
  appId: "1:722280915889:web:62ffc448aaf69d8b8f9390"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)