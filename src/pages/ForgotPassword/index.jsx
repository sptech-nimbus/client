import { useEffect, useState } from "react";

import * as S from './ForgotPassword.styled';
import Background from "@components/Background/Background";

import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";

export default function ForgotPassword() {
   const [step, setStep] = useState(1);

   const handleSubmit = () => {
      if(step == 1) {
         //fazer lógica de envio de email
         setStep(step + 1);
      }
      if(step == 2) {
         //fazer lógica de validação de código
         setStep(step + 1);
      }
      if(step == 3) {
         //fazer lógica de troca de senha
         setStep(step + 1);
      }
   }

   return (
      <S.Header>
         <Background.Login />
         {step == 1 && <FormStepOne handleSubmit={handleSubmit}/>}
         {step == 2 && <FormStepTwo handleSubmit={handleSubmit}/>}
         {step == 3 && <FormStepThree handleSubmit={handleSubmit}/>}
      </S.Header>
   )
}