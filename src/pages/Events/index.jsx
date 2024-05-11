import { useState } from 'react';
import * as S from './Events.styled';

import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Checkbox from "@components/Checkbox/Checkbox";

import Utils from '@utils/Helpers';

export default function Eventss() {
   const [isMultiple, setIsMultiple] = useState(false);
   const [dates, setDates] = useState([]);
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

   return (
      <S.PageContainer>
         <Sidebar page='agenda'/>
         <S.ContentContainer>
            <Title text='Eventos' uppercase/>
            <S.AgendaGrid>
               <S.Container>
                  <Calendar
                     multiple={isMultiple}
                     value={dates}
                     onChange={setDates}
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
                  <S.Form>
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
                     <Label>
                        Data(s)
                        <Input.Default 
                           name='date'
                           value={dates}
                           onChange={handleInputChange} 
                        />
                     </Label>
                     <Label>
                        Horário
                        <Input.Default 
                           name='time'
                           value={eventData.time}
                           onChange={handleInputChange} 
                        />
                     </Label>
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
                        <Input.Default 
                           name='description'
                           value={eventData.description}
                           onChange={handleInputChange} 
                        />
                     </Label>
                  </S.Form>
               </S.Container>
            </S.AgendaGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}