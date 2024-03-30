import { useState } from 'react'
import './App.css'

import { Input } from './components/Input';
import { Envelope } from '@phosphor-icons/react';
import { Button } from './components/Button';
import { Label } from './components/Label';

function App() {
  return (
    <>
      <Label>
        Insira seu email
        <Input.Default placeholder={'seu@email.com'} width={'300px'}>
          <Envelope />
        </Input.Default>
      </Label>

      <br />

      <Label>
        Insira sua senha
        <Input.Password placeholder={"***********"}width={'300px'} />
      </Label>

      <br />

      <Button.Primary size={'md'} width={'300px'}/>
    </>
  )
}

export default App
