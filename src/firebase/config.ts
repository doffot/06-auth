// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuuaQQzwzWSmI7b1bQbUQk6kB0mzmNfUk",
  authDomain: "astro-athentication.firebaseapp.com",
  projectId: "astro-athentication",
  storageBucket: "astro-athentication.firebasestorage.app",
  messagingSenderId: "416130999927",
  appId: "1:416130999927:web:67cbcfd19836f4aeb00872"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';


export const firebase = {
    app,
    auth,
}