import React, { useState } from "react";
import File from "./File";
import Folder from "./Folder";

export default function Tree({ structure }) {
  return structure.map((item) => {
    if (item.type === "file") {
      return <File name={item.name} id={item.id} />;
    }

    if (item.type === "folder") {
      return (
        <Folder name={item.name} id={item.id}>
          <Tree structure={item.childrens} />
        </Folder>
      );
    }
  });
}
