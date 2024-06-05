import { useState } from 'react';

import * as S from './JoinTeam.styled'
import * as LS from '../Login/Login.styles';

import Background from "@components/Background/Background";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";

import { Envelope } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useLocation } from 'react-router-dom';

import athlete from '@api/athlete';
import user from '@api/user';

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function JoinTeam() {
   const query = useQuery();
   const teamId = query.get('t');

   const [credentials, setCredentials] = useState({
      email: '',
      password: '',
   });
   const [id, setId] = useState();
   const [token, setToken] = useState();

   const sendRequest = async () => {
      try {
         const { data } = await user.login(credentials);
         setId(data.data.id);
         setToken(data.data.token);

         try {
            const { data }  = await athlete.registerTeam(`?id=${id}`, { id: teamId}, token);
            console.log(data);
         }
         catch(err) {
            console.log(err);
         }
      }
      catch(err) {
         console.log(err);
      }
   }

   const handleInputChange = (e) => {
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value
      })
   }

   return (
      <LS.Header>
         <ToastContainer
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
            limit={3}
         />

         <Background.Login />
         <LS.Title>
            Entrar para um time
         </LS.Title>

         <S.Form>
            <span>
               Entre com suas credenciais para entrar para o time   
               [nome do time]
            </span>
            <S.TeamImage />
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
      </LS.Header>

   )
}