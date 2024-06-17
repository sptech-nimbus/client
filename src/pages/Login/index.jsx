/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import * as S from "./Login.styles";

import { useAuth } from "@contexts/auth";
import { useNotification } from '@contexts/notification';

import { Envelope } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Background from "@components/Background/Background";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";

export default function Login() {
   const { login, isAuthenticated } = useAuth();
   const { addNotification } = useNotification();
   const navigate = useNavigate();

   const [credentials, setCredentials] = useState({
      email: '',
      password: ''
   });

   const handleEmailChange = (e) => {
      const { value } = e.target;
      setCredentials({
         ...credentials,
         email: value
      });
   }

   const handlePasswordChange = (e) => {
      const { value } = e.target;
      setCredentials({
         ...credentials,
         password: value
      });
   }

   const handleFormSubmit = async (e) => {
      e.preventDefault();

      if (credentials.email && credentials.password) {
         try {
            console.log('credentials', credentials);
            await login(credentials);
         }
         catch (err) {
            if (err.response) {
               addNotification('error', 'Credenciais inválidas.');
               console.log(err)
            }
            else if (err.request) {
               addNotification('error', 'Houve um erro ao realizar o login. Por favor tente novamente mais tarde.');
            }
            else {
               addNotification('error', 'Houve um erro inesperado.');
            }
         }
      }
      else {
         addNotification('error', 'Preencha todos os campos')
      }
   }

   useEffect(() => { if (isAuthenticated) navigate('/my-teams') }, [isAuthenticated, navigate]);

   return (
      <S.Header>
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
         <S.Title>
            Login
         </S.Title>
         <S.Form onSubmit={handleFormSubmit}>
            <S.InputsContainer>
               <Label >
                  Insira seu email
                  <Input.Default
                     placeholder={'seu@email.com'}
                     value={credentials.email}
                     onChange={handleEmailChange}
                  >
                     <Envelope />
                  </Input.Default>
               </Label>
               <Label >
                  Insira sua senha
                  <Input.Password
                     placeholder={'**********'}
                     value={credentials.password}
                     hasIcon
                     onChange={handlePasswordChange}
                  />
               </Label>
            </S.InputsContainer>
            <Button.Primary
               value={'Entrar'}
               size={'md'}
               width={'100%'}
               fontSize={'1.5rem'}
            />
            <S.FormFooter>
               <S.Underlined>
                  <S.Link onClick={() => navigate('/forgot-password')}>
                     Esqueceu sua senha?
                  </S.Link>
               </S.Underlined>
               <span>
                  Não possui uma conta ainda? <br />
                  <S.Link>
                     <S.Highlight onClick={() => navigate('/register')}>Faça seu cadastro!</S.Highlight>
                  </S.Link>
               </span>
            </S.FormFooter>
         </S.Form>
      </S.Header>
   )
}