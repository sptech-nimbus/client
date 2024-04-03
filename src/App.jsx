import { useState } from 'react';
import Sidebar from '@components/Sidebar/Sidebar';
import { Placeholder } from '@phosphor-icons/react';
import './App.css'

function App() {
  return (
    <>
      <Sidebar logo={<Placeholder />}/>
    </>
  )
}

export default App
