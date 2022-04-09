// input and output 

import React, {useState} from 'react'

import "../styles/io.css"

export default function IO() {

  const [collapsed, setCollapsed] = useState(false);

  if(collapsed){
    return (
      <div className='ioCollapsed'>
        <button onClick={() => setCollapsed(false)}>Open</button>
      </div>
    )
  }

  return (
    <div className='io'>
      <button onClick={() => setCollapsed(true)}>Collapse</button>
    </div>
  )
}
