import { useState } from "react";

import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";
import * as S from './ForgotPassword.styled';

import { Envelope } from "@phosphor-icons/react";

export default function FormStepOne({ handleSubmit }) {
   const [email, setEmail] = useState('');

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   }

   return (
      <>
         <S.Description>
            <S.DescriptionTitle>Esqueceu sua senha?</S.DescriptionTitle>
            <span>
               Digite o endereço de email associado a sua conta e enviaremos um email com as instruções para recuperar sua senha.
            </span>
         </S.Description>
         <S.Form onSubmit={handleSubmit}>
         <Label>
            Email
            <Input.Default
               placeholder={'seu@email.com'}
               value={email}
               onChange={handleEmailChange}
            >                    
               <Envelope />
            </Input.Default>
         </Label>

         <Button.Primary 
            value={'Enviar email'}
            size={'md'}
            width={'100%'}
            fontSize={'1.2rem'}
         />
         </S.Form>
      </>
   )
}