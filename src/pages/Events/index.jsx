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
import { PrimaryButton as Button } from "@components/Button/Button";

import Utils from '@utils/Helpers';
import { TimeValidation, TextValidation, FutureDateValidation } from '@utils/Validations';

export default function Eventss() {
   const dateRef = useRef();
   const [dates, setDates] = useState();
   const [eventData, setEventData] = useState({
      name: '',
      type: '',
      date: '',
      time: '',
      local: '',
      description: ''

   });

   const handleInputChange = (e) => {
      setEventData({
         ...eventData,
         [e.target.name]: e.target.value
      })
   }

   const handleDateChange = (selectedDates) => {
      const formattedDates = selectedDates.map(date => date.format("DD/MM/YYYY"));
      setDates(formattedDates)
   }

   const SizeValidation = (text) => {
      return text.length < 300;
   }

   const DatesValidation = (dates) => {
      console.log(dates);
      dates.forEach(date => {
         const splitedDate = date.split('/');
         const formattedDate = `${splitedDate[2]}-${splitedDate[1]}-${splitedDate[0]}` 

         if(!FutureDateValidation(formattedDate)) {
            return false;
         }
      });

      return true;
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      console.clear();

      if(
         TextValidation(eventData.description, SizeValidation) &&
         TextValidation(eventData.local) &&
         TextValidation(eventData.name) &&
         TextValidation(eventData.type) &&
         TimeValidation(eventData.time) &&
         DatesValidation(dates)
      ) {
         //lógica de cadastro de evento 
         toast.success('Evento cadastrado!');
         setEventData({
            name: '',
            type: '',
            date: '',
            time: '',
            local: '',
            description: ''
         });
         setDates('');
      }
      else {
         if(!SizeValidation(eventData.description)) toast.error('A descrição do evento deve possuir no máximo 300 caracteres.');  
         if(!TextValidation(eventData.local)) toast.error('O local do evento deve possuir pelo menos 2 caracteres.');  
         if(!TextValidation(eventData.name)) toast.error('O nome do evento deve possuir pelo menos 2 caracteres.');  
         if(!TextValidation(eventData.type)) toast.error('O tipo do evento deve possuir pelo menos 2 caracteres.');  
         if(!TimeValidation(eventData.time)) toast.error('O horário inserido não é válido.');  
         if(!DatesValidation(dates)) toast.error('As datas inseridas não são válidas.');
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

         <Sidebar page='agenda'/>
         <S.ContentContainer>
            <Title text='Eventos' uppercase/>
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
                        Título do evento
                        <Input.Default 
                           name='name'
                           value={eventData.name}
                           onChange={handleInputChange} 
                        />
                     </Label>
                     <Label>
                        Tipo de evento
                        <Input.Default 
                           name='type'
                           value={eventData.type}
                           onChange={handleInputChange} 
                        />
                     </Label>
                     <S.Flex>
                        <Label>
                           Data(s)
                           <Input.Default
                              name='date'
                              value={dates}
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
                           onChange={handleInputChange} 
                           rows={5}
                        />
                     </Label>
                     <Button
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