import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBOBC_bZwwO-UdTsV169xE7dWlk9LGhJ2g",
  authDomain: "crwn-db-d4c12.firebaseapp.com",
  databaseURL: "https://crwn-db-d4c12.firebaseio.com",
  projectId: "crwn-db-d4c12",
  storageBucket: "crwn-db-d4c12.appspot.com",
  messagingSenderId: "653827057145",
  appId: "1:653827057145:web:2b8af3623f21e8f663c928",
  measurementId: "G-RQB685S35D",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
