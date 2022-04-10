import firebase from "firebase/compat/app";
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

export const auth = firebase.auth();
// export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

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
