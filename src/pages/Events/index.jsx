import { useRef, useState, useEffect } from 'react';
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

export default function Eventss() {
   sessionStorage.setItem('jwt', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXVhYW5tYXRoZXVzQGdtYWlsLmNvbSIsImlhdCI6MTcxNTY5ODg3OX0.pH2mqkYUr5yPbrReOOSgVxVBd7KEMnTP0Dp1faNO-CWIvj6He7af7W6DP_YsDdS1b7uPmduCTSFhndRm-QgT2Q');
   sessionStorage.setItem('teamId', 'eaeb6176-5354-41db-a303-388780fbd9c0');

   const [gamesRegistered, setGamesRegistered] = useState([]);

   useEffect(() => {
      const getGames = async () => {
         const gamesRes = await game.getByTeam(sessionStorage.getItem('teamId'));

         if (gamesRes.status !== 200) {
            toast.warning('Nenhum jogo encontrado');
         }

         setGamesRegistered(gamesRes.data.data);
      };

      getGames();
   }, []);

   const dateRef = useRef();
   const teamList = useRef();

   const [dates, setDates] = useState();
   const [datesInput, setDatesInput] = useState();
   const [eventData, setEventData] = useState({
      challenged: {
         name: '',
         id: ''
      },
      type: '',
      date: '',
      time: '',
      local: '',
      description: ''
   });

   const [teamsToChallenge, setTeamsToChallenge] = useState([]);

   const handleInputChange = (e) => {
      setEventData({
         ...eventData,
         [e.target.name]: e.target.value
      })
   }

   const handleDateChange = (selectedDates) => {
      const formattedDates = selectedDates.map(date => date.format("DD/MM/YYYY"));
      setDates(formattedDates);
      setDatesInput(selectedDates.toString().replaceAll(',', ', '));
   }

   const SizeValidation = (text) => {
      return text.length < 300;
   }

   const DatesValidation = (dates) => {
      dates.forEach(date => {
         const splitedDate = date.split('/');
         const formattedDate = `${splitedDate[2]}-${splitedDate[1]}-${splitedDate[0]}`

         if (!FutureDateValidation(formattedDate)) {
            return false;
         }
      });

      return true;
   }

   const handleDescSize = (e) => {
      if (eventData.description.length < 300 || e.nativeEvent.inputType === 'deleteContentBackward') {
         setEventData({
            ...eventData,
            description: e.target.value.substring(0, 300)
         });
      }
   }

   const EventValidation = () => {
      if (
         TextValidation(eventData.local) && TextValidation(eventData.type) && TimeValidation(eventData.time) && DatesValidation(dates)
      ) {
         return true;
      }
      else {
         return false;
      }
   }

   const handleSearchTeams = async e => {
      try {
         let res = await team.byName(e.target.value, sessionStorage.getItem('jwt'));

         setEventData({ ...eventData, challenged: { name: e.target.getAttribute('teamName') } });
         setTeamsToChallenge(res.data.data || []);
      } catch (e) {
         toast.error(`Erro ao buscar times: ${e}`);
      }
   }

   const handleChallenged = async e => {
      setEventData({ ...eventData, challenged: { id: e.target.getAttribute('teamId'), name: e.target.getAttribute('teamName') } });
      setTeamsToChallenge([]);

      await handleCloseSeachTeams();
   }

   const handleCloseSeachTeams = async () => {
      teamList.current.style.display = 'none';
   }

   const handleOpenSeachTeams = async e => {
      await handleSearchTeams(e);

      teamList.current.style.display = 'flex';
   }

   const handleSubmit = async e => {
      e.preventDefault();

      if (EventValidation()) {
         const events = dates.map(dateArr => {
            const dateSplit = dateArr.split('/');

            const d = parseInt(dateSplit[0]);
            const m = parseInt(dateSplit[1]) - 1;
            const y = parseInt(dateSplit[2]);

            const formatedDate = new Date(new Date(y, m, d).setHours(eventData.time));
            const finalDate = new Date(new Date(formatedDate).setHours(new Date(formatedDate).getHours() + 2));

            return {
               ...eventData,
               challenged: eventData.challenged.id,
               inicialDateTime: new Date(formatedDate).toISOString(),
               finalDateTime: finalDate.toISOString(),
               challenger: sessionStorage.getItem('teamId')
            }
         });

         if (eventData.type === "game") {
            try {
               await game.post({
                  body: events
               });
            } catch (e) {
               toast.error(`Erro ao cadastrar jogo: ${e}`);
            } finally {
               setGamesRegistered({ ...gamesRegistered, events });
            }
         }

         toast.success('Evento cadastrado!');

         setEventData({
            challenged: {
               name: '',
               id: ''
            },
            type: '',
            date: '',
            time: '',
            local: '',
            description: ''
         });
         setDates('');
      }
      else {
         if (!SizeValidation(eventData.description)) toast.error('A descrição do evento deve possuir no máximo 300 caracteres.');
         if (!TextValidation(eventData.local)) toast.error('O local do evento deve possuir pelo menos 2 caracteres.');
         if (!TextValidation(eventData.type)) toast.error('O tipo do evento deve possuir pelo menos 2 caracteres.');
         if (!TimeValidation(eventData.time)) toast.error('O horário inserido não é válido.');
         if (!DatesValidation(dates)) toast.error('As datas inseridas não são válidas.');
      }
   }
   const handleRegistration = () => {
      if(isVisualization) setIsVisualization(!isVisualization);
      if(!isRegistration) setIsRegistration(!isRegistration);
   }

   const handleVisualization = () => {
      if(isRegistration) setIsRegistration(!isRegistration);
      if(!isVisualization) setIsVisualization(!isVisualization);
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
               <Title text='Eventos' uppercase />
               <S.EventsOptions>
                  <S.Option active={isVisualization} onClick={handleVisualization}>Visualização</S.Option>
                  <S.Option active={isRegistration} onClick={handleRegistration}>Cadastro</S.Option>
               </S.EventsOptions>
            </S.TopContainer>
            {isVisualization && <EventsVisualization />}
            {isRegistration && <EventsRegistration />}
         </S.ContentContainer>
      </S.PageContainer>
   )
}
