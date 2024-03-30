import { useState } from 'react'
import './App.css'

import { Input } from './components/Input';
import { Envelope } from '@phosphor-icons/react';
import { Button } from './components/Button';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Input.Default placeholder={'seu@email.com'} width={'300px'}>
        <Envelope />
      </Input.Default>
      <br />
      <Input.Password placeholder={"***********"}width={'300px'} />
      <br />
      <Button.Primary size={'md'} width={'300px'}/>
    </>
  )
}

export default App
