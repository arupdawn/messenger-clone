// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDxRb4j-kqhXDzT5mQqbaCJgQ81MCTrN6c",
  authDomain: "messenger-clone-ca485.firebaseapp.com",
  databaseURL: "https://messenger-clone-ca485.firebaseio.com",
  projectId: "messenger-clone-ca485",
  storageBucket: "messenger-clone-ca485.appspot.com",
  messagingSenderId: "1061262030489",
  appId: "1:1061262030489:web:99056a9f6081ee2ff0aa08",
  measurementId: "G-DN6SJKDMEY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
//const auth = firebase.auth();

export default db;
