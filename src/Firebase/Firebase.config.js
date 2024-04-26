// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA38WsirmrZ_tgpZgQgMHWkO4n6eTZyLeQ",
  authDomain: "worthing-fx.firebaseapp.com",
  projectId: "worthing-fx",
  storageBucket: "worthing-fx.appspot.com",
  messagingSenderId: "882405430593",
  appId: "1:882405430593:web:4a82107dbc4d110017bdc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Auth = getAuth(app)

export default Auth
