// code director file structure

import React, { useState } from 'react'

import "../styles/directory.css";

export default function Directory() {

  const [collapsed, setCollapsed] = useState(false);

  if(collapsed){
    return (
      <div className='directoryCollapsed'>
        <button onClick={() => setCollapsed(false)}>Open</button>
      </div>
    )
  }

  return (
      <div className='directory'>
        <div className='dirFirstDiv'>
          <h1>My Directory</h1>
          <button>New File</button>
          <button>New Folder</button>
          <button onClick={() => setCollapsed(true)}>Collapse</button>
        </div>
      </div>
  )
}
