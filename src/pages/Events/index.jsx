import { useState } from 'react';
import * as S from './Events.styled';

import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import colors from "react-multi-date-picker/plugins/colors"

import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";

import Utils from '@utils/Helpers';

export default function Eventss() {
   const [isMultiple, setIsMultiple] = useState(false);
   const [dates, setDates] = useState([]);

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
                  
               </S.Container>
            </S.AgendaGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}