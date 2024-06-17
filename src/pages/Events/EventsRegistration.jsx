import { useEffect, useRef, useState } from 'react';
import * as S from './Events.styled';

import { useNotification } from '@contexts/notification';

import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button, { PillButtons } from "@components/Button/Button";
import Select, { Option } from "@components/Select/Select";

import Utils from '@utils/Helpers';
import { TimeValidation, TextValidation, FutureDateValidation } from '@utils/Validations';

import game from '@api/game';
import team from '@api/team';
import training from '@api/training';

export default function EventsRegistration() {
   const { addNotification, getNotificationHist } = useNotification();
   const [dates, setDates] = useState();
   const [options, setOptions] = useState([]);
   const [datesInput, setDatesInput] = useState();
   const [inputValue, setInputValue] = useState('');
   const [eventData, setEventData] = useState({
      challenged: '',
      type: 'Partida',
      time: '',
      local: '',
   });

   useEffect(() => {
      async function fetchData() {
         const response = await team.getAllTeams(localStorage.getItem('token'));

         if (response.status === 200) {
            const filteredOptions = response.data.data.filter(option => option.id !== sessionStorage.getItem('teamId') && option.id !== '1f0dffe7-7d33-4ea8-896c-ce9696632daa');

            const optionsMap = filteredOptions.map(option => ({
               value: option.id,
               label: <Option option={option} />,
            }));
            setOptions(optionsMap);
         }
      }
      fetchData()
   }, []);

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

   const EventValidation = () => {
      if (
         TextValidation(eventData.type) &&
         TimeValidation(eventData.time) &&
         DatesValidation(dates)
      ) {
         return true;
      }
      else {
         return false;
      }
   }

   const handleEventTypeChange = (e) => {
      e.preventDefault();

      setEventData({
         ...eventData,
         type: e.target.name
      });
   }

   const handleSubmit = async (e) => {
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
               challenged: eventData.challenged,
               inicialDateTime: new Date(formatedDate).toISOString(),
               finalDateTime: finalDate.toISOString(),
               challenger: sessionStorage.getItem('teamId')
            }
         });

         if (eventData.type === "Partida") {
            try {
               await game.post(events, localStorage.getItem('token'));
            } catch (e) {
               addNotification('error', `Erro ao cadastrar jogo: ${e.status}`);
               console.log(e);
            }
         }
         else if (eventData.type === "Treino") {
            try {
               console.log('training.post parameters:', {
                  teamId: sessionStorage.getItem('teamId'),
                  local: events[0].local,
                  inicialDateTime: events[0].inicialDateTime,
                  finalDateTime: events[0].finalDateTime
               });
               const response = await training.post(
                  {
                     teamId: sessionStorage.getItem('teamId'),
                     local: events[0].local,
                     inicialDateTime: events[0].inicialDateTime,
                     finalDateTime: events[0].finalDateTime
                  },
                  localStorage.getItem('token')
               );
               console.log('training.post response:', response);
            } catch (e) {
               addNotification('error', `Erro ao cadastrar treino: ${e.status}`);
               console.log('treino.post error:', e);
            }
         }

         addNotification('success', 'Evento cadastrado!');

         setEventData({
            challenged: '',
            type: 'Partida',
            time: '',
            local: '',
         });
         setDates('');
      }
      else {
         if (!SizeValidation(eventData.description)) addNotification('error', 'A descrição do evento deve possuir no máximo 300 caracteres.');
         if (!TextValidation(eventData.local)) addNotification('error', 'O local do evento deve possuir pelo menos 2 caracteres.');
         if (!TextValidation(eventData.type)) addNotification('error', 'O tipo do evento deve possuir pelo menos 2 caracteres.');
         if (!TimeValidation(eventData.time)) addNotification('error', 'O horário inserido não é válido.');
         if (!DatesValidation(dates)) addNotification('error', 'As datas inseridas não são válidas.');
      }
   }

   return (
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
                        $active={eventData.type == 'Treino' ? 'right' : 'left'}
                        onClick={handleEventTypeChange}
                     />
                  </S.Flex>
               </Label>
               {eventData.type == 'Partida' ?
                  //form de partida
                  <>
                     <Label>
                        Desafiar time
                        <Select
                           isSearchable
                           cacheOptions
                           options={options}
                           onInputChange={(newValue) => setInputValue(newValue)}
                           placeholder='Selecione um time para desafiar...'
                           noOptionsMessage={() => "Não há times disponíveis no momento."}
                           onChange={(choice) => setEventData({ ...eventData, challenged: choice.value })}
                        />
                     </Label>
                     <S.Flex>
                        <Label>
                           Data(s)
                           <Input.Default
                              name='date'
                              value={datesInput}
                              disabled
                           />
                        </Label>
                        <Label>
                           Horário
                           <Input.Masked
                              type='time'
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
                  </>

                  :
                  //form de treino
                  <>
                     <S.Flex>
                        <Label>
                           Data(s)
                           <Input.Default
                              name='date'
                              value={datesInput}
                              disabled
                           />
                        </Label>
                        <Label>
                           Horário
                           <Input.Masked
                              type='time'
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
                  </>
               }
               <Button.Primary
                  value={'Cadastrar evento'}
                  $marginTop='0rem'
                  fontSize='1.5rem'
               />
            </S.Form>
         </S.Container>
      </S.AgendaGrid>
   )
}