import { useState } from "react";

import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";
import * as S from './ForgotPassword.styled';
import { InputLine } from "../Register/Register.styled";
import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';

import { PasswordValidation, ConfirmPasswordValidation } from "@utils/Validations";

import { toast } from 'react-toastify';

export default function FormStepThree({ onSubmit }) {
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const [passwordTtpOpen, setPasswordTtpOpen] = useState(false);
   const [confirmPasswordTtpOpen, setConfirmPasswordTtpOpen] = useState(false);

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   }

   const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
   }

   const handlePasswordTtpChange = () => {
      setPasswordTtpOpen(!passwordTtpOpen);
   }

   const handleConfirmPasswordTtpChange = () => {
      setConfirmPasswordTtpOpen(!confirmPasswordTtpOpen);
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      if(PasswordValidation(password) && ConfirmPasswordValidation(password, confirmPassword)) {
         onSubmit({ password });
      }
      else {
         if(!PasswordValidation(password)) toast.error('Senha inválida.');
         if(!ConfirmPasswordValidation(password, confirmPassword)) toast.error('As senhas não correspondem.');
      }
   }  

   return (
      <>
         <S.Description>
            <S.DescriptionTitle>Redefinindo senha</S.DescriptionTitle>
            <span>
               Digite sua nova senha.
            </span>
         </S.Description>
         <S.Form onSubmit={ handleSubmit }>
         <Label>
            Nova senha
            <InputLine>
               <Input.Password
                  placeholder={'******'}
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={handlePasswordTtpChange}
                  onBlur={handlePasswordTtpChange}
                  hasIcon
               />
               <Tooltip side='right' open={passwordTtpOpen} onHover={handlePasswordTtpChange}>
                  <span>
                  A senha deve conter um mínimo de: <br />
                  - 8 Caracteres <br />
                  - 1 Caractere especial <br />
                  - 1 Letra maiúscula <br />
                  - 1 Número <br />
                  </span>
               </Tooltip>
            </InputLine>
         </Label>

         <Label>
            Confirmar nova senha
            <InputLine>
               <Input.Password
                  placeholder={'******'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onFocus={handleConfirmPasswordTtpChange}
                  onBlur={handleConfirmPasswordTtpChange}
                  hasIcon
               />
               <Tooltip side='right' open={confirmPasswordTtpOpen} onHover={handleConfirmPasswordTtpChange}>
                  <span>A senha deve ser igual a senha inserido no campo anterior.</span>
               </Tooltip>
            </InputLine>
         </Label>

         <Button.Primary 
            value={'Confirmar senha'}
            size={'md'}
            width={'100%'}
            fontSize={'1.2rem'}
         />
         </S.Form>
      </>
   )
}