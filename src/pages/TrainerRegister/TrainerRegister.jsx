import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Background from '../../components/Background/Background';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import FormStepThree from './FormStepThree';

export default function Register() {
   const [step, setStep] = useState(1);
   const [userData, setUserData] = useState({
      name: null,
      surname: null,
      birthDate: null,
      email: null,
      phone: null,
      password: null
   });
   const [teamData, setTeamData] = useState({
      teamCode: null,
      teamName: null,
      category: null,
      teamLogo: null,
      isAmateur: null,
   })

   let teamDatas = {};

   function handleFormSubmit(formData) {
      if(step == 1) {
         userData.name = formData.name;
         userData.surname = formData.surname;
         userData.birthDate = formData.date;
         setStep(step + 1);
      }
      else if(step == 2) {
         userData.email = formData.email;
         userData.phone = formData.phone;
         userData.password = formData.password;

         setStep(step + 1);
      }
      else if(step == 3){
         teamData.teamCode = formData.teamCode;
         teamData.teamName = formData.teamName;
         teamData.category = formData.category;
         teamData.teamLogo = formData.teamLogo;
         teamData.isAmateur = formData.chkAmateur;
      }
      else {
         alert('as')
      }
   }
   
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