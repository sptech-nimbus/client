import { useRef, useState } from 'react';
import * as S from './Events.styled';

import { ToastContainer, toast } from 'react-toastify';
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Checkbox from "@components/Checkbox/Checkbox";
import Button, { PillButtons } from "@components/Button/Button";

import Utils from '@utils/Helpers';
import { TimeValidation, TextValidation, FutureDateValidation } from '@utils/Validations';

import game from '../../api/game';
import team from '../../api/team';
import { Colors } from 'chart.js';

export default function Events() {
   sessionStorage.setItem('jwt', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXVhYW5tYXRoZXVzQGdtYWlsLmNvbSIsImlhdCI6MTcxNTY5ODg3OX0.pH2mqkYUr5yPbrReOOSgVxVBd7KEMnTP0Dp1faNO-CWIvj6He7af7W6DP_YsDdS1b7uPmduCTSFhndRm-QgT2Q');
   sessionStorage.setItem('teamId', 'eaeb6176-5354-41db-a303-388780fbd9c0');

   const dateRef = useRef();
   const teamList = useRef();

   const [dates, setDates] = useState();
   const [datesInput, setDatesInput] = useState();
   const [eventData, setEventData] = useState({
      challenged: {
         name: '',
         id: ''
      },
      type: 'Partida',
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
      } catch (err) {
         toast.error(`Erro ao buscar times.`);
         console.log(err);
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

   const handleEventTypeChange = (e) => {
      e.preventDefault();

      setEventData({
         ...eventData,
         type: e.target.name
      });
   }

   const handleSubmit = async e => {
      e.preventDefault();

      if (EventValidation()) {
         const events = dates.map(dateArr => {
            const dateSplit = dateArr.split('/');

            const d = parseInt(dateSplit[0]);
            const m = parseInt(dateSplit[1]) - 1;
            const y = parseInt(dateSplit[2]);

            const formatedDate = new Date(y, m, d);
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
            <Title text='Eventos' uppercase />
            <S.AgendaGrid>
               <S.Container>
                  <Calendar
                     multiple
                     value={dates}
                     onChange={handleDateChange}
                     format="DD/MM/YYYY"
                     months={Utils.months(12)}
                     weekDays={Utils.weekDays}
                     className="rmdp-prime bg-dark custom-calendar"
                     headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
                     monthYearSeparator=" "
                     showOtherDays
                     disableYearPicker
                     minDate={new Date()}
                  />
               </S.Container>
               <S.Container>
                  <S.Form onSubmit={handleSubmit}>
                     <Label>
                        Tipo de evento
                        <S.Flex>
                           <PillButtons 
                           left="Partida" 
                           right="Treino" 
                           color={Utils.colors.gray700} 
                           active={eventData.type == 'Treino' ? 'right' : 'left'} 
                           onClick={handleEventTypeChange}
                        />
                        </S.Flex>
                     </Label>
                     {eventData.type == 'Partida' ? 
                     <>
                     <Label>
                        Desafiar time
                        <Input.Default
                           name='challenged'
                           onInput={handleSearchTeams}
                           value={eventData.challenged.name}
                           onFocus={handleOpenSeachTeams}
                           onBlur={handleCloseSeachTeams}
                           autocomplete="off"
                        />
                        <div ref={teamList} style={{ display: 'none', backgroundColor: '#323232', height: '6rem', overflowY: 'auto', position: 'absolute', width: '100%', bottom: '-6rem', zIndex: '1' }}>
                           {teamsToChallenge[0]
                                 ? teamsToChallenge.map(team => {
                                    return team.id !== sessionStorage.getItem('teamId')
                                       // eslint-disable-next-line react/no-unknown-property
                                       ? <div onMouseDown={handleChallenged} teamName={team.name} teamId={team.id} key={team} style={{ height: '2rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', width: '100%' }}>
                                          <span style={{ pointerEvents: "none" }}>
                                             {team.name}
                                          </span>
                                          <span style={{ pointerEvents: "none" }}>
                                             {team.category}
                                          </span>
                                       </div>
                                       : ''
                                 })
                                 : "Time não encontrado"
                           }
                        </div>
                     </Label>
                     <S.Flex>
                        <Label>
                           Data(s)
                           <Input.Default
                              name='date'
                              value={datesInput}
                              disabled
                              ref={dateRef}
                           />
                        </Label>
                        <Label>
                           Horário
                           <Input.Masked
                              name='time'
                              value={eventData.time}
                              onChange={handleInputChange}
                              mask='00:00'
                           />
                        </Label>
                     </S.Flex>
                     <Label>
                        Local
                        <Input.Default
                           name='local'
                           value={eventData.local}
                           onChange={handleInputChange}
                        />
                     </Label>
                     <Label>
                        Descricação
                        <Input.Textarea
                           name='description'
                           value={eventData.description}
                           onChange={handleDescSize}
                           rows={5}
                        />
                        <S.DescSize>{eventData.description.length}/300</S.DescSize>
                     </Label>
                     </>
                     : 
                     ''
                     }
                     <Button.Primary
                        value={'Cadastrar evento'}
                        marginTop='0rem'
                        fontSize='1.5rem'
                     />
                  </S.Form>
               </S.Container>
            </S.AgendaGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}