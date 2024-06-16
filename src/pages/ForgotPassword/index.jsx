import { useEffect, useState } from "react";

import { useNotification } from '@contexts/notification';

import * as S from './ForgotPassword.styled';
import Background from "@components/Background/Background";

import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import { useNavigate } from "react-router-dom";

import user from "@api/user";
import code from "@api/code";

import { ToastContainer, toast } from 'react-toastify';

export default function ForgotPassword() {
   const { addNotification } = useNotification();
   const navigate = useNavigate();
   const [step, setStep] = useState(1);
   const [userId, setUserId] = useState('');

   const handleSubmit = async (formData) => {
      if (step == 1) {
         try {
            await user.changePasswordRequest(formData.email);
            setStep(step + 1);
         }
         catch (err) {
            addNotification('error', 'Erro ao enviar e-mail. Por favor aguarde alguns minutos antes de tentar novamente.');
         }
      }
      if (step == 2) {
         try {
            console.log(formData.code);
            const response = await code.validateCode(formData.code);
            console.log(response);
            setUserId(response.data.data.mainUser.id);
            setStep(step + 1);
         }
         catch (err) {
            addNotification('error', 'Código inserido inválido.');
         }
      }
      if (step == 3) {
         try {
            await user.changePassword(userId, formData);
            toast.success('Senha atualizada! Redirecionando para tela de login...', { autoClose: 2000 });
            setTimeout(() => {
               navigate('/login');
            }, 2600);
         }
         catch (err) {
            addNotification('error', 'Houve um erro ao atualizar a senha. Por favor aguarde alguns minutos antes de tentar novamente.');
            console.log(err);
         }
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
         {step == 1 && <FormStepOne onSubmit={handleSubmit} />}
         {step == 2 && <FormStepTwo onSubmit={handleSubmit} />}
         {step == 3 && <FormStepThree onSubmit={handleSubmit} />}
      </S.Header>
   )
}