import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDt9tW7BdgOficfeVT-1vQaqd0lU6PCd6g",
  authDomain: "frontender-c0471.firebaseapp.com",
  databaseURL:
    "https://frontender-c0471-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "frontender-c0471",
  storageBucket: "frontender-c0471.appspot.com",
  messagingSenderId: "443073536474",
  appId: "1:443073536474:web:d9f2a342b57fb12a10a0e3",
  measurementId: "G-5FGQRLY9LY",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.database();
export default app;
