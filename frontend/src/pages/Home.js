import React from 'react'

import Header from '../components/Header'
import Directory from '../components/Directory'
import IO from '../components/IO'
import Editor from '../components/Editor';

import "../styles/home.css";

export default function Home() {
  return (
      <div className='home'>
        <div className='headerDiv'>
            <Header />
        </div>
        <div className='workbench'>
            <Directory />
            <Editor />
            <IO />
        </div>
      </div>
  )
}
