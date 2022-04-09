import React from 'react'
import { AiOutlineFile, AiOutlineFolder } from "react-icons/ai";
import {SiCplusplus, SiPython, SiC} from "react-icons/si"

import "../styles/file.css";

export default function File({name}) {

    const ICONS = {
        c: <SiC />,
        cpp: <SiCplusplus />,
        py: <SiPython />
    };

    var ext = name.split(".")[1];

    return (
        <div className='fileDiv'>
            {ICONS[ext] || <AiOutlineFile />}
            <span>  {name}</span>
        </div>
    )
}
