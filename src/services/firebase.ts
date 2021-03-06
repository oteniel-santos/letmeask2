// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, get, child  } from "firebase/database";
import { GoogleAuthProvider , signInWithPopup} from "firebase/auth";






// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth();
 const database = getDatabase(app);
 const Provider = GoogleAuthProvider;
 const Popup = signInWithPopup;
 export {initializeApp, auth, database, Provider, Popup, ref, set, push, onValue, get, child};