import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJld9WbgQ--iK94xNBaGqs1sBOxXNV9sA",
    authDomain: "ta21-test.firebaseapp.com",
    projectId: "ta21-test",
    storageBucket: "ta21-test.appspot.com",
    messagingSenderId: "587896756472",
    appId: "1:587896756472:web:6dd9c4ff0d1dd51bbd430d",
    measurementId: "G-8YZT9398WX"
  };
if(!firebaseConfig.apiKey) throw new Error("Missing Api Key")

  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db}