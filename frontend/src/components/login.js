import React, { useState } from "react";
import { signInWithGoogle } from "../firebase/firebase.utils";
// import { getAuth, signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { setUser, removeUser, setStructure } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// const auth = getAuth();

export default function Login() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleClick = async () => {
    const data = await signInWithGoogle();
    const payload = {
      userId: data.uid,
      "name:": data.displayName,
      email: data.email,
      "dp URL": data.photoURL,
    };
    dispatch(setUser(payload));
    const res = await axios.post("http://3.108.190.41:8080/user", payload);
    dispatch(setStructure(res.data.files));
    console.log(res.data);
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };

  // return <Button variant="light">LogOut</Button>;

  if (user.userId != undefined) {
    return (
      <Button
        variant="light"
        className="login-provider-button"
        onClick={handleLogout}
        style={{ marginTop: "3%" }}
      >
        {/* <img
        src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
        alt="google icon"
      /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-google"
          viewBox="0 0 20 20"
        >
          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
        </svg>
        <span>Logout</span>
      </Button>
    );
  }

  return (
    <Button
      variant="light"
      className="login-provider-button"
      onClick={handleClick}
      style={{ marginTop: "3%" }}
    >
      {/* <img
        src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
        alt="google icon"
      /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-google"
        viewBox="0 0 20 20"
      >
        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
      </svg>
      <span> Login</span>
    </Button>
  );
}
