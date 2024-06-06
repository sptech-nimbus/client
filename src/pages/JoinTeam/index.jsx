import { useState, useEffect } from 'react';

import * as S from './JoinTeam.styled';
import * as LS from '../Login/Login.styles';

import Background from '@components/Background/Background';
import Title from '@components/Title/Title';
import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';

import axios from 'axios';
import { Envelope } from '@phosphor-icons/react';

export default function JoinTeam() {
   const [credentials, setCredentials] = useState({ email: '', password: '' });

   const handleInputChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
   }

   return (
      <LS.Header>
            <Background.Login />
            <LS.Title>
               <Title text='Entrar para um time' $uppercase/>
            </LS.Title>

            <S.JoinTeamText>Insira suas credenciais para entrar para o time [nome do time]</S.JoinTeamText>

            <S.JoinTeamGrid>
               <S.TeamImage src='https://1000logos.net/wp-content/uploads/2017/12/Los-Angeles-Clippers-Logo.png'/>

               <S.Form>
                  <Label>
                     Insira seu email
                     <Input.Default
                        name='email'
                        placeholder={'seu@email.com'}
                        value={credentials.email}
                        onChange={handleInputChange}
                     >
                        <Envelope />
                     </Input.Default>
                  </Label>

                  <Label >
                     Insira sua senha
                     <Input.Password
                        name='password'
                        placeholder={'**********'}
                        value={credentials.password}
                        hasIcon
                        onChange={handleInputChange}
                     />
                  </Label>

                  <Button.Primary
                     value={'Entrar'}
                     size={'md'}
                     width={'100%'}
                     fontSize={'1.5rem'}
                  />
               </S.Form>   
            </S.JoinTeamGrid>
      </LS.Header>
   )
}