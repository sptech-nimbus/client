import { useState, useEffect } from 'react';
import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { TooltipInput as Tooltip } from '../../components/Tooltip/Tooltip';
import { EmailValidation, PasswordValidation, ConfirmPasswordValidation, BrPhoneValidation } from '../../utils/Validations';
import { useMediaQuery } from 'react-responsive'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FormStepTwo({onSubmit}) {
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const [emailErr, setEmailErr] = useState(false);
   const [phoneErr, setPhoneErr] = useState(false);
   const [passwordErr, setPasswordErr] = useState(false);
   const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);

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
      setEmail(value);
  }

  function handlePhoneChange(e) {
      const { value } = e.target;
      setPhone(value);
  }

  function handlePasswordChange(e) {
      const { value } = e.target;
      setPassword(value);
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
         EmailValidation(email) && 
         PasswordValidation(password) && 
         ConfirmPasswordValidation(password, confirmPassword) &&
         BrPhoneValidation(phone)) 
      {
         onSubmit({email, phone, password});
      }
      else {
         if(!EmailValidation(email)) toast.error('Email inválido.');
         if(!BrPhoneValidation(phone)) toast.error('Telefone inválido.')
         if(!PasswordValidation(password)) toast.error('Senha inválida.');
         if(!ConfirmPasswordValidation(password, confirmPassword)) toast.error('As senhas não correspondem.');
      }
   }

   return (
      <S.Form onSubmit={onSubmit}>
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
            E-mail
            <S.InputLine>
               <Input.Default
                  placeholder={'seu@email.com'}
                  value={email}
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
                  value={phone}
                  onChange={handlePhoneChange}
               />
            </S.InputLine>
         </Label>

         <Label>
            Senha
            <S.InputLine>
               <Input.Password
                  value={password}
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
            Confimar senha
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