import { useState } from "react";
import { useNotification } from '@contexts/notification';

import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button from "@components/Button/Button";
import * as S from './ForgotPassword.styled';
import { InputLine } from "../Register/Register.styled";
import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';

import { PasswordValidation, ConfirmPasswordValidation } from "@utils/Validations";

export default function FormStepThree({ onSubmit }) {
   const { addNotification } = useNotification();

   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const [passwordTtpOpen, setPasswordTtpOpen] = useState(false);
   const [confirmPasswordTtpOpen, setConfirmPasswordTtpOpen] = useState(false);

   const handlePasswordChange = (e) => {
      setNewPassword(e.target.value);
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

      if(PasswordValidation(newPassword) && ConfirmPasswordValidation(newPassword, confirmPassword)) {
         onSubmit({ newPassword });
      }
      else {
         if(!PasswordValidation(newPassword)) addNotification('error','Senha inválida.');
         if(!ConfirmPasswordValidation(newPassword, confirmPassword)) addNotification('error','As senhas não correspondem.');
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
                  value={newPassword}
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