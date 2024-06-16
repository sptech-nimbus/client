import * as S from './Events.styled.js';
import { useState, useEffect } from 'react';

import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

import Title from "@components/Title/Title";

import Utils from "@utils/Helpers";

import team from "@api/team";
import training from "@api/training";
import game from "@api/game";

function Event({ event, type }) {
   const [name, setName] = useState('Carregando...');
   const date = new Date((type == 'match' && event.gameResult) ? event.finalDateTime : event.inicialDateTime);
   const fetchTeam = async () => {
      try {
         const teamId = event.challenger === sessionStorage.getItem('teamId') ? event.challenged : event.challenger;
         const response = await team.get(teamId, localStorage.getItem('token'));
         setName(response.data.data.name);
      }
      catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      fetchTeam();
   }, [name]);

   return (
      <S.Event>
         <S.EventSection>
            <S.EventType type={type} $finished={type == 'match' && event.gameResult} />
            <S.Adversary title={type == 'trainning' ? 'Treinamento' : name}>{type == 'trainning' ? 'Treinamento' : name}</S.Adversary>
         </S.EventSection>
         <span>{date.toLocaleDateString('pt-br')}</span>
         <span>
            {
               type == 'match' && event.gameResult
                  ? `${event.gameResult.challengedPoints} x ${event.gameResult.challengerPoints}`
                  : date.toLocaleTimeString('pt-br')
            }
         </span>
      </S.Event>
   )
}

export default function EventsVisualization() {
   const [games, setGames] = useState([]);
   const [trainings, setTrainings] = useState([]);
   const [dates, setDates] = useState([]);

   const fetchGames = async () => {
      try {
         const response = await game.getByTeam(
            sessionStorage.getItem('teamId'),
            localStorage.getItem('token')
         );

         if (response.status === 200) {
            const confirmed = response.data.data.filter(game => game.confirmed);
            setGames(confirmed);
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   const fetchTrainings = async () => {
      try {
         const response = await training.get(
            sessionStorage.getItem('teamId'),
            { page: 0, elements: 20 },
            localStorage.getItem('token')
         );

         if (response.status === 200) {
            setTrainings(response.data.data.content);
            console.log('training', response.data.data.content);
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            await Promise.all([
               fetchGames(),
               fetchTrainings()
            ])
         }
         catch (err) {
            console.log(err);
         }
      }
      fetchData();
   }, []);

   useEffect(() => {
      const newDates = [...dates];
      games.forEach(game => {
         const date = new Date(game.inicialDateTime);
         if (!newDates.includes(date)) newDates.push(date);
      });

      trainings.forEach(training => {
         const date = new Date(training.inicialDateTime);
         if (!newDates.includes(date)) newDates.push(date);
      });
      setDates(newDates);
   }, [games, trainings]);

   return (
      <S.AgendaContainer>
         <Calendar
            multiple
            format="DD/MM/YYYY"
            value={dates}
            months={Utils.months(12)}
            weekDays={Utils.weekDays}
            readOnly
            className="rmdp-prime bg-dark custom-calendar"
            headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
            monthYearSeparator=" "
            showOtherDays
         />

         <S.EventsContainer>
            <S.EventsContainerHeader>
               <Title text='Eventos cadastrados' size='1.5rem' color={Utils.colors.orange100} />
               <S.Subtitles>
                  Legenda:
                  <S.Subtitle><S.EventType type={'match'} $finished={false} />Partida Futura</S.Subtitle>
                  <S.Subtitle><S.EventType type={'match'} $finished={true} />Finalizada</S.Subtitle>
                  <S.Subtitle><S.EventType type={'trainning'} />Treinos</S.Subtitle>
               </S.Subtitles>
            </S.EventsContainerHeader>

            <S.EventsList>
               {(games && games.length > 0) && games.map(game => (
                  <Event
                     key={game.id}
                     event={game}
                     type='match'
                  />
               ))}

               {(trainings && trainings.length > 0) && trainings.map(training => (
                  <Event
                     key={training.id}
                     event={training}
                     type='trainning'
                  />
               ))}
            </S.EventsList>
         </S.EventsContainer>
      </S.AgendaContainer>
   )
}