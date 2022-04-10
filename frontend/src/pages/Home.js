import React, { useEffect } from "react";

import Header from "../components/Header";
import Directory from "../components/Directory";
import IO from "../components/IO";
import MyEditor from "../components/MyEditor";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="headerDiv">
        <Header />
      </div>
      <div className="workbench">
        <Directory />
        <MyEditor />
        <IO />
      </div>
    </div>
  );
}
