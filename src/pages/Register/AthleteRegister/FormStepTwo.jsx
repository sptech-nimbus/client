import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNotification } from '@contexts/notification';

import * as S from '../Register.styled';
import * as LS from '../../Login/Login.styles';

import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { EmailValidation, PasswordValidation, ConfirmPasswordValidation, BrPhoneValidation } from '@utils/Validations';

import { useMediaQuery } from 'react-responsive'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FormStepTwo({onSubmit}) {
   const { addNotification } = useNotification();
   
   const [userData, setUserData] = useState({
      email: '',
      phone: '',
      password: ''
   });

   const [confirmPassword, setConfirmPassword] = useState('');

   const [passwordTtpOpen, setPasswordTtpOpen] = useState(false);
   const [confirmPasswordTtpOpen, setConfirmPasswordTtpOpen] = useState(false);

   const [toastPosition, setToastPosition] = useState('top-right');

   const isBelow799 = useMediaQuery({ maxWidth: 799 });
   const isBelow1050 = useMediaQuery({maxWidth: 1050});

   useEffect(() => {
      if (isBelow1050) {
        setToastPosition('top-center');
      } else {
        setToastPosition('top-right');
      }
    }, [isBelow1050]);

   function handleEmailChange(e) {
      const { value } = e.target;
      setUserData({
         ...userData,
         email: value
      });
  }

  function handlePhoneChange(e) {
      const { value } = e.target;
      setUserData({
         ...userData,
         phone: value
      });
  }

  function handlePasswordChange(e) {
      const { value } = e.target;
      setUserData({
         ...userData,
         password: value
      });
  }

  function handleConfirmPasswordChange(e) {
      const { value } = e.target;
      setConfirmPassword(value);
  }

  function handlePasswordTtpChange() {
      setPasswordTtpOpen(!passwordTtpOpen);
  }

  function handleConfirmPasswordTtpChange() {
      setConfirmPasswordTtpOpen(!confirmPasswordTtpOpen);
  }

   function handleSubmit(e) {
      e.preventDefault();

      if(
         EmailValidation(userData.email) && 
         PasswordValidation(userData.password) && 
         ConfirmPasswordValidation(userData.password, confirmPassword) 
         // && BrPhoneValidation(userData.phone)
      ) 
      {
          onSubmit(userData);
      }
      else {
         if(!EmailValidation(userData.email)) addNotification('error','Email inválido.');
         // if(!BrPhoneValidation(userData.phone)) addNotification('error','Telefone inválido.')
         if(!PasswordValidation(userData.password)) addNotification('error','Senha inválida.');
         if(!ConfirmPasswordValidation(userData.password, confirmPassword)) addNotification('error','As senhas não correspondem.');
      }
   }

   return (
      <S.Form onSubmit={handleSubmit}>
      <ToastContainer
         position={toastPosition}
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
      <LS.InputsContainer>
         <Label>
            <span>E-mail <S.Mandatory>*</S.Mandatory></span>
            <S.InputLine>
               <Input.Default
                  placeholder={'seu@email.com'}
                  value={userData.email}
                  onChange={handleEmailChange}
               />
            </S.InputLine>
         </Label>

         <Label>
            Telefone
            <S.InputLine>
               <Input.Masked
                  mask={'(00) 00000-0000'}
                  placeholder={'(99) 99999-9999'}
                  value={userData.phone}
                  onChange={handlePhoneChange}
               />
            </S.InputLine>
         </Label>

         <Label>
            <span>Senha <S.Mandatory>*</S.Mandatory></span>
            <S.InputLine>
               <Input.Password
                  value={userData.password}
                  placeholder={'**********'}
                  onChange={handlePasswordChange}
                  onFocus={handlePasswordTtpChange}
                  onBlur={handlePasswordTtpChange}
               />
               {!isBelow799 &&
               <Tooltip side='right' open={passwordTtpOpen} onHover={handlePasswordTtpChange}>
                  <span>
                  A senha deve conter um mínimo de: <br />
                  - 8 Caracteres <br />
                  - 1 Caractere especial <br />
                  - 1 Letra maiúscula <br />
                  - 1 Número <br />
                  </span>
               </Tooltip>
               }
            </S.InputLine>
         </Label>

         <Label>
            <span>Confimar senha <S.Mandatory>*</S.Mandatory></span>
            <S.InputLine>
               <Input.Password
                  value={confirmPassword}
                  placeholder={'**********'}
                  onChange={handleConfirmPasswordChange}
                  onFocus={handleConfirmPasswordTtpChange}
                  onBlur={handleConfirmPasswordTtpChange}
               />
               {!isBelow799 &&
               <Tooltip side='right' open={confirmPasswordTtpOpen} onHover={handleConfirmPasswordTtpChange}>
                  <span>A senha deve ser igual a senha inserido no campo anterior.</span>
               </Tooltip>
               }
            </S.InputLine>
         </Label>
      </LS.InputsContainer>
      <Button.Primary 
         value={'Continuar'}
         size={'md'}
         width={'100%'}
         fontSize={'1.5rem'}
         onClick={handleSubmit}
      />
   </S.Form>
   )
}

FormStepTwo.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};