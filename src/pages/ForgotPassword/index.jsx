import * as S from "../Login/Login.styles";
import Background from "@components/Background/Background";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";

import { Envelope } from "@phosphor-icons/react";

import { useState } from "react";

export default function ForgotPassword() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isEmailSent, setIsEmailSent] = useState(false);

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   }

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   }

   return (
      <S.Header>
         <Background.Login />
         <S.Description>
            Digite o endereço de email associado a sua conta e enviaremos um email com as instruções para recuperar sua senha.
         </S.Description>
         <S.Form>
            <Label>
               Email
               <Input.Default
                  placeholder={'seu@email.com'}
                  value={email}
                  onChange={handleEmailChange}
               >                    
                  <Envelope />
               </Input.Default>
               <Button.Primary 
                  value={'Enviar email'}
                  size={'md'}
                  width={'100%'}
                  fontSize={'1.5rem'}
               />
            </Label>
         </S.Form>
      </S.Header>
   )
}