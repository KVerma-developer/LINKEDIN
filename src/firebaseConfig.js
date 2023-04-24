// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyCnnpRT9Gq_aD1ftgmabSz85GqZtRNiTYE",
//     authDomain: "linkedin-clone-3c73d.firebaseapp.com",
//     projectId: "linkedin-clone-3c73d",
//     storageBucket: "linkedin-clone-3c73d.appspot.com",
//     messagingSenderId: "732926173496",
//     appId: "1:732926173496:web:6899afd20f4f8a78e5a1cd",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { app, auth };


































// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnnpRT9Gq_aD1ftgmabSz85GqZtRNiTYE",
  authDomain: "linkedin-clone-3c73d.firebaseapp.com",
  projectId: "linkedin-clone-3c73d",
  storageBucket: "linkedin-clone-3c73d.appspot.com",
  messagingSenderId: "732926173496",
  appId: "1:732926173496:web:6899afd20f4f8a78e5a1cd",
//   measurementId: "G-LCLG0P6TNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export{app,auth,firestore}

