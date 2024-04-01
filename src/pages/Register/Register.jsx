import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Background from '../../components/Background/Background';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import FormStepThree from './FormStepThree';

export default function Register() {
   const [step, setStep] = useState(1);

   let userRegister = {};
   let teamRegister = {};

   function handleFormSubmit(formData) {
      if(step <= 2) {
         const updatedUserRegister = { ...userRegister, ...formData}
         Object.assign(userRegister, updatedUserRegister);
         console.log(userRegister);
         setStep(step + 1);
      }
      else {
         console.log(teamRegister);
      }
   };
   
   return(
      <LS.Header>
         <Background.Login />
         <LS.Title>
            Cadastro
         </LS.Title>
         {
         step == 1 ? 
         <FormStepOne onSubmit={handleFormSubmit} /> : 
         step == 2 ?
         <FormStepTwo onSubmit={handleFormSubmit} /> :
         <FormStepThree onSubmit={handleFormSubmit} />
         }
      </LS.Header>
   )
}