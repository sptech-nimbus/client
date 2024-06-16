import { useState } from 'react';
import * as S from './Events.styled';

import { ToastContainer } from 'react-toastify';
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";

import EventsVisualization from './EventsVisualization';
import EventsRegistration from './EventsRegistration';

export default function Events() {
   const [isRegistration, setIsRegistration] = useState(false);
   const [isVisualization, setIsVisualization] = useState(true);

   const handleRegistration = () => {
      if (isVisualization) setIsVisualization(!isVisualization);
      if (!isRegistration) setIsRegistration(!isRegistration);
   }

   const handleVisualization = () => {
      if (isRegistration) setIsRegistration(!isRegistration);
      if (!isVisualization) setIsVisualization(!isVisualization);
   }

   return (
      <S.PageContainer>
         <ToastContainer
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
         />

         <Sidebar page='agenda' />
         <S.ContentContainer>
            <S.TopContainer>
               <Title text='Eventos' $uppercase />
               <S.EventsOptions>
                  <S.Option $active={isVisualization} onClick={handleVisualization}>Visualização</S.Option>
                  <S.Option $active={isRegistration} onClick={handleRegistration}>Cadastro</S.Option>
               </S.EventsOptions>
            </S.TopContainer>
            {isVisualization && <EventsVisualization />}
            {isRegistration && <EventsRegistration />}
         </S.ContentContainer>
      </S.PageContainer>
   )
}
