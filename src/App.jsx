import { useState } from 'react'
import './App.css'

import { Input } from './components/Input';
import { Envelope } from '@phosphor-icons/react';
import { Button } from './components/Button';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button.Primary
      value={'Enviar'}
      size={'sm'}
      />
    </>
  )
}

export default App
