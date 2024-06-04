import { useEffect, useState } from 'react';
import * as S from './FinishedMatch.styled';
import * as MS from '../OnGoingMatch/Match.styled';

import Sidebar from '@components/Sidebar/Sidebar';
import Title from '@components/Title/Title';
import { Colors } from '@utils/Helpers';

import * as Accordion from '@radix-ui/react-accordion';
import { Star } from '@phosphor-icons/react';

import Quarters from './Quarters';
import Stats from './Stats';
import { useNavigate } from 'react-router-dom';

function Return() {
   const navigate = useNavigate();
   useEffect(() => {navigate('/match')}, [])
}

function NoContent({ value }) {

}

export default function FinishedMatch({ matchData }) {
   const [selectedPlayer, setSelectedPlayer] = useState();

   const handleSelectedPlayer = (key) => {
      if(selectedPlayer) {
         if(matchData.players[key].personaId == selectedPlayer.personaId) setSelectedPlayer(0);
         else setSelectedPlayer(matchData.players[key]);
      }
      else {
         setSelectedPlayer(matchData.players[key]);
      }
   }

   return (
      <S.PageContainer>
         <Sidebar page='match' />
         <S.ContentContainer>
            <Title text='Partida finalizada' $uppercase/>
            <S.FinishedMatchGrid>
               <S.Container>
                  <Title text='Times' size='1.2rem'/>
                  <S.TeamsContainer>
                     <MS.Team>
                        <S.TeamImage src={matchData.challenger.picture} />
                        <MS.TeamName>{matchData.challenger.name}</MS.TeamName>
                     </MS.Team>
                     <MS.Versus>VS</MS.Versus>
                     <MS.Team>
                        <S.TeamImage src={matchData.challenged.picture} />
                        <MS.TeamName>{matchData.challenged.name}</MS.TeamName>
                     </MS.Team>
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

               <S.Container>
                  <Title text='JogMadores que participaram da partida' size='1.2rem'/>
                  <MS.AthletesList>
                     {matchData.players.map((player, index) => (
                        <S.Athlete onClick={() => handleSelectedPlayer(index)} $active={selectedPlayer && selectedPlayer.personaId === player.personaId}>
                           <MS.AthleteInfo>
                              <MS.AthleteImage src={player.picture}/>

                              <MS.Column>
                                 <MS.AthleteName>{player.firstName} {player.lastName}</MS.AthleteName>
                              </MS.Column>
                           </MS.AthleteInfo>
                        </S.Athlete>
                     ))}
                  </MS.AthletesList>
               </S.Container>

               <S.Container>
                  <Title text='Estatísticas' size='1.2rem'/>
                  {
                     !selectedPlayer 
                     ?
                     <S.StatsContainer>
                        <Title text={`das`} size='1.2rem' color={Colors.orange100}/>
                        <Stats stats={matchData.teamStats}/>
                     </S.StatsContainer> 
                     : (
                        <S.StatsContainer>
                           <Title text={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`} size='1.2rem' color={Colors.orange100}/>
                           <Stats stats={selectedPlayer}/>
                        </S.StatsContainer>
                     )
                  }
                     
               </S.Container>
            </S.FinishedMatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}