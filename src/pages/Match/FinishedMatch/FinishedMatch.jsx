import { useEffect, useState } from 'react';
import * as S from './FinishedMatch.styled';

import Sidebar from '@components/Sidebar/Sidebar';
import Title from '@components/Title/Title';

import * as Accordion from '@radix-ui/react-accordion';

import Quarters from './Quarters';
import { useNavigate } from 'react-router-dom';

function Return() {
   const navigate = useNavigate();
   useEffect(() => {navigate('/match')}, [])
}

export default function FinishedMatch({ matchData }) {
   return !matchData ? <Return /> : (
      <S.PageContainer>
         <Sidebar page='match' />
         <S.ContentContainer>
            <Title text='Partida finalizada' $uppercase/>
            <S.FinishedMatchGrid>
               <S.Container>
                  <Title text='Times' size='1.2rem'/>
                  <S.TeamsContainer>
                     <S.Team>
                        <S.TeamImage src='' />
                        <S.TeamName>Nome challenger</S.TeamName>
                     </S.Team>
                     <S.Versus>VS</S.Versus>
                     <S.Team>
                        <S.TeamImage src='' />
                        <S.TeamName>Nome challenged</S.TeamName>
                     </S.Team>
                  </S.TeamsContainer>
               </S.Container>

               <S.Container>
                  <Title text='Marcações adicionadas na partida' size='1.2rem'/>
                  <Accordion.Root collapsible type='single' asChild>
                     <S.FlagsContainer>
                        {
                           Object.keys(matchData.flags).map(key => (
                              <Quarters key={key} title={key} events={matchData.flags[key]}/>
                           ))
                        }
                     </S.FlagsContainer>
                  </Accordion.Root>
               </S.Container>

               <S.Container></S.Container>

               <S.Container></S.Container>
            </S.FinishedMatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}