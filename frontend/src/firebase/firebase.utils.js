import firebase from "firebase/compat/app";
require("firebase/compat/auth");

// import "firebase/firestore";
// import "firebase/auth";

/* need to add config*/
const config = {};
firebase.initializeApp(config);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
