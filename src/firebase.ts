import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDxFKkoejQtI3_gBKLyxu8liclAhC0xMX4",
    authDomain: "ionicstencilfirebase-app.firebaseapp.com",
    databaseURL: "https://ionicstencilfirebase-app.firebaseio.com",
    projectId: "ionicstencilfirebase-app",
    storageBucket: "ionicstencilfirebase-app.appspot.com",
    messagingSenderId: "918176279001"
});

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const functions = firebaseApp.functions('europe-west1');
export const storage = firebaseApp.storage();