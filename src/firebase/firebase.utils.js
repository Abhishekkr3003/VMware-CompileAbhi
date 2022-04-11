import firebase from "firebase/compat/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "firebase/firestore";
import "firebase/compat/auth";

// import "firebase/firestore";
// import "firebase/auth";

/* need to add config*/
const firebaseConfig = {
  apiKey: "AIzaSyCxZ5Fy2rRN5Jaa0SuZ6OcNdHbn8_G3pRk",
  authDomain: "compileabhi-6c85a.firebaseapp.com",
  projectId: "compileabhi-6c85a",
  storageBucket: "compileabhi-6c85a.appspot.com",
  messagingSenderId: "689841913010",
  appId: "1:689841913010:web:8dff2990d6c5bcf0d1ddab",
  measurementId: "G-LYFPKDZB1R",
};
firebase.initializeApp(firebaseConfig);

const auth = getAuth();
// export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
// export default firebase;

// export const auth = firebase.auth();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
//   auth
//     .signInWithPopup(googleProvider)
//     .then((res) => {
//       console.log(res.user);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };
