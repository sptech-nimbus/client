import { useState } from "react";

import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";
import * as S from './ForgotPassword.styled';

import { Password } from "@phosphor-icons/react";

export default function FormStepThree({ handleSubmit }) {
   const [code, setCode] = useState('');

   const handleCodeChange = (e) => {
      setCode(e.target.value);
   }


   return (
      <>
         <S.Description>
            <S.DescriptionTitle>Esqueceu sua senha?</S.DescriptionTitle>
            <span>
               Digite o código enviado para seu email para continuar a redefinição de senha
            </span>
         </S.Description>
         <S.Form onSubmit={handleSubmit}>
         <Label>
            Código
            <Input.Default
               placeholder={'123456'}
               value={code}
               onChange={handleCodeChange}
            >                    
               <Password />
            </Input.Default>
         </Label>

         <Button.Primary 
            value={'Confirmar código'}
            size={'md'}
            width={'100%'}
            fontSize={'1.2rem'}
         />
         </S.Form>
      </>
   )
}