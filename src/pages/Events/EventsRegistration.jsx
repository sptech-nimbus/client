import { useEffect, useRef, useState } from 'react';
import * as S from './Events.styled';

import { useNotification } from '@contexts/notification';

import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Button, { PillButtons } from "@components/Button/Button";
import { CustomAsyncSelect as Select } from "@components/Select/Select";

import Utils from '@utils/Helpers';
import { TimeValidation, TextValidation, FutureDateValidation } from '@utils/Validations';

import game from '../../api/game';
import team from '../../api/team';
import axios from 'axios';

export default function EventsRegistration() {
   const { addNotification, getNotificationHist } = useNotification();
   sessionStorage.setItem('jwt', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXVhYW5tYXRoZXVzQGdtYWlsLmNvbSIsImlhdCI6MTcxNTY5ODg3OX0.pH2mqkYUr5yPbrReOOSgVxVBd7KEMnTP0Dp1faNO-CWIvj6He7af7W6DP_YsDdS1b7uPmduCTSFhndRm-QgT2Q');
   sessionStorage.setItem('teamId', 'eaeb6176-5354-41db-a303-388780fbd9c0');

   const [dates, setDates] = useState();
   const [options, setOptions] = useState([]);
   const [datesInput, setDatesInput] = useState();
   const [inputValue, setInputValue] = useState('');
   const [eventData, setEventData] = useState({
      challenged: {
         name: '',
         id: ''
      },
      type: 'Partida',
      title: '',
      date: '',
      time: '',
      local: '',
      description: ''
   });

   useEffect(() => {
      // async function fetchData() {
      //    const response = await team.getAllTeams(localStorage.getItem('token'));

      //    if(response.status === 200) {
      //       console.log(options);
      //       setOptions(response.data.data);
      //    }
      // }
      // fetchData()

      const options = {
         method: 'GET',
         url: 'http://localhost:8080/teams',
         headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
         }
       };
       
       axios.request(options).then(function (response) {
         setOptions(response.data.data);
       }).catch(function (error) {
         console.error(error);
       });
   }, []);

   const loadOptions = async (inputValue, callback) => {
      try {
        const response = await team.byName(inputValue, sessionStorage.getItem('jwt'));
        const options = response.data.data.map((team) => ({
          value: team.id,
          label: (
            <S.OptionWithImage>
               <S.OptionImage src={team.picture}/>
               <span>{team.name} - {team.category}</span>
            </S.OptionWithImage>
         ),
        }));
        callback(options);
      } catch (error) {
         addNotification('error', 'Houve um erro ao buscar os times. Aguarde um momento antes de tentar novamente.');
         console.error('Failed to load options:', error);
      }
    };

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
               addNotification('error', `Erro ao cadastrar jogo: ${e}`);
            }
         }

         addNotification('success', 'Evento cadastrado!');

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
                     defaultOptions={options}
                     onInputChange={(newValue) => setInputValue(newValue)} 
                     placeholder='Selecione um time para desafiar...'
                     noOptionsMessage={() => "Não há times disponíveis no momento."}
                     loadOptions={loadOptions}
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
                  Descrição
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
               //form de treino
               <> 
               <Label>
                  Nome do evento de treino
                  <Input.Default
                     name='title'
                     value={eventData.title}
                     onChange={handleInputChange}
                     autocomplete="off"
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
                  Descrição
                  <Input.Textarea
                     name='description'
                     value={eventData.description}
                     onChange={handleDescSize}
                     rows={5}
                  />
                  <S.DescSize>{eventData.description.length}/300</S.DescSize>
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