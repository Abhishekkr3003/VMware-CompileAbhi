import React, { useState } from "react";
import File from "./File";
import Folder from "./Folder";
import { AiOutlineFile, AiOutlineFolder } from "react-icons/ai";
import { SiCplusplus, SiPython, SiC } from "react-icons/si";

export default function Tree({ structure }) {
  const [item, setItem] = useState();

  return structure.map((itm) => {
    setItem(itm);
    console.log(item);
    if (item.type === "file") {
      return <File name={item.name} />;
    }

    if (item.type === "folder") {
      return (
        <Folder
          addNewFile={(name) => {
            var file = {
              type: "file",
              name: name,
            };
            console.log("item", item);
            item.childrens.push(file);
          }}
          name={item.name}
        >
          <Tree structure={item.childrens} />
        </Folder>
      );
    }
  });
}
