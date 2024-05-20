import * as S from './Events.styled.js';

import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import Title from "@components/Title/Title";

import Utils from "@utils/Helpers";

export default function EventsVisualization() {

   return (
      <S.AgendaContainer>
         <Calendar
            multiple
            format="DD/MM/YYYY"
            months={Utils.months(12)}
            weekDays={Utils.weekDays}
            readOnly
            className="rmdp-prime bg-dark custom-calendar"
            headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
            monthYearSeparator=" "
            showOtherDays
            disableYearPicker
            minDate={new Date()}
         />

         <S.EventsContainer>
            <S.EventsContainerHeader>
               <Title text='Eventos cadastrados' size='1.5rem' color={Utils.colors.orange100}/>
               <S.Subtitles>
                  Legenda: 
                  <S.Subtitle><S.EventType type={'match'}/>Partidas</S.Subtitle>
                  <S.Subtitle><S.EventType type={'trainning'}/>Treinos</S.Subtitle>
               </S.Subtitles>
            </S.EventsContainerHeader>

            <S.EventsList>
               {/* substituir por um map com os dados de eventos vindos do banco */}
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1 ? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
               <S.Event>
                  <S.EventSection>
                     <S.EventType type={Math.floor(Math.random() * 2) + 1 == 1? 'match' : 'trainning'}/>
                        <S.Adversary>Golden State Warriors</S.Adversary>
                  </S.EventSection>
                  <span>15/12/2024</span>
                  <span>12:34</span>
               </S.Event>
            </S.EventsList>
         </S.EventsContainer>
      </S.AgendaContainer>
   )
}