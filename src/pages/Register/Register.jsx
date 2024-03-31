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

   function handleFormSubmit(formData) {
      Object.assign(userRegister, formData);
      setStep(step + 1);
   };
   
   return(
      <LS.Header>
         <Background.Login />
         {/* <S.Text>
            Insira algumas informações sobre você para que possamos criar a sua conta!
         </S.Text> */}
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