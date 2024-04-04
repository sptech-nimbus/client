import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '@pages/Login/Login.styles';
import Background from '@components/Background/Background';
import Stepper from '@components/Stepper/Stepper';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import FormStepThree from './FormStepThree';
import user from '@api/user';

export default function Register() {
   const [step, setStep] = useState(1);
   const [userData, setUserData] = useState({
      email: null,
      password: null,
      coach: {
         firstName: null,
         lastName: null,
         birthDate: null,
         phone: null,
         picture: null
      }
   });

   const [teamData, setTeamData] = useState({
      code: null,
      name: null,
      category: null,
      picture: null,
      local: null,
      isAmateur: null
   });

   function handleFormSubmit(formData) {
      if(step == 1) {
         userData.coach.firstName = formData.name;
         userData.coach.lastName = formData.lastName;
         userData.coach.birthDate = formData.date;
         setStep(step + 1);
      }
      else if(step == 2) {
         userData.email = formData.email;
         userData.password = formData.password;
         userData.coach.phone = formData.formattedPhone;

         console.log(userData);

         user.post(userData)
            .then(response => {
               console.log(response);
            })
            .catch(err => {
               console.error(err);
            });
         setStep(step + 1);
      }
      else {
         teamData.code = formData.teamCode;
         teamData.name = formData.teamName;
         teamData.category = formData.category;
         teamData.logo = formData.teamPicture;
         teamData.isAmateur = formData.chkAmateur;
      }
   }

   return(
      <LS.Header>
         <Background.Login />
         <LS.Title>
            Cadastro
         </LS.Title>

         <S.StepperWrapper>
            <Stepper steps={3} currentStep={step}/>
         </S.StepperWrapper>
         {/* {
         step == 1 ? 
         <FormStepOne onSubmit={handleFormSubmit} /> : 
         step == 2 ?
         <FormStepTwo onSubmit={handleFormSubmit} /> :
         <FormStepThree onSubmit={handleFormSubmit} />
         } */}
         <FormStepThree onSubmit={handleFormSubmit} />
      </LS.Header>
   )
}