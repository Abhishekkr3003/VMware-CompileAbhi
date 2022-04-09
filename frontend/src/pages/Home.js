import React, { useEffect } from "react";

import Header from "../components/Header";
import Directory from "../components/Directory";
import IO from "../components/IO";
import Editor from "../components/Editor";
import structure from "../assets/structure";
import { useDispatch } from "react-redux";
import { setStructure } from "../actions";

import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStructure(structure));
  }, []);

  return (
    <div className="home">
      <div className="headerDiv">
        <Header />
      </div>
      <div className="workbench">
        <Directory />
        <Editor />
        <IO />
      </div>
    </div>
  );
}
