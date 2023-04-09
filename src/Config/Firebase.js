import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBrhgoDJlg99ihYffFrgI0OcEc-7lm4bls",
  authDomain: "notebook-9cb08.firebaseapp.com",
  projectId: "notebook-9cb08",
  storageBucket: "notebook-9cb08.appspot.com",
  messagingSenderId: "898869547403",
  appId: "1:898869547403:web:c357cc6be4307a54631f8e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);