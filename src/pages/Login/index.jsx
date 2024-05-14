import { useState } from "react";
import * as S from "./Login.styles";

import { Envelope } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Background from "@components/Background/Background";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";

import user from "@api/user";

export default function Login() {
   const navigate = useNavigate();

   const [userData, setUserData] = useState({
      email: '',
      password: ''
   });



   const handleEmailChange = (e) => {
      const { value } = e.target;
      setUserData({
         ...userData,
         email: value
      });
   }

   const handlePasswordChange = (e) => {
      const { value } = e.target;
      setUserData({
         ...userData,
         password: value
      });
   }

   const handleFormSubmit = (e) =>{
      e.preventDefault();

      if(userData.email && userData.password) {
         user.login(userData)
             .then(response => {
                 sessionStorage.setItem('token', response.data.data.token);
                 sessionStorage.setItem('id', response.data.data.personaId);
                 navigate('/home');
         })
         .catch(err => {
            toast.error('Credenciais inválidas');
            console.log(err);
         })
      }
      else {
         toast.error('Preencha todos os campos')
      }
   }


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
            <Input.Google />
            <S.LineContainer>
               <S.Line />
               Ou
               <S.Line />
            </S.LineContainer>
            <S.InputsContainer>
               <Label >
                  Insira seu email
                  <Input.Default
                     placeholder={'seu@email.com'}
                     value={userData.email}
                     onChange={handleEmailChange}
                  >                    
                     <Envelope />
                  </Input.Default>
               </Label>
               <Label >
                  Insira sua senha
                  <Input.Password
                     placeholder={'**********'}
                     value={userData.password}
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
               <underlined>
                  <S.Link href="">
                     Esqueceu sua senha?
                  </S.Link>
               </underlined>
               <span>
                  Não possui uma conta ainda? <br />
                  <S.Link>
                     <S.Highlight onClick={() => navigate('/cadastro')}>Faça seu cadastro!</S.Highlight>
                  </S.Link>
                  </span>
            </S.FormFooter>
         </S.Form>
      </S.Header>
   )
}