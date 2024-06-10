import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import * as S from './FinishedMatch.styled';
import * as MS from '../OnGoingMatch/Match.styled';

import Sidebar from '@components/Sidebar/Sidebar';
import Title from '@components/Title/Title';
import Button from '@components/Button/Button'
import Utils from '@utils/Helpers';

import * as Accordion from '@radix-ui/react-accordion';

import Quarters from './Quarters';
import Stats from './Stats';

export default function FinishedMatch() {
   const [matchData, setMatchData] = useState(JSON.parse(sessionStorage.getItem('matchData')));
   const [selectedPlayer, setSelectedPlayer] = useState();
   console.log(matchData);

   const handleSelectedPlayer = (key) => {
      if(selectedPlayer) {
         if(matchData.players[key].id == selectedPlayer.id) setSelectedPlayer(0);
         else setSelectedPlayer(matchData.players[key]);
      }
      else {
         setSelectedPlayer(matchData.players[key]);
      }
   }

   const submitMatch = () => {
      const gameResult = {
         challengerPts : matchData.challenger.pts,
         challengedPts : matchData.challenged.pts,
         gameId: matchData.gameId
      }

      const mappedStats = matchData.players.map(player => ({
            observations: [""],
            offRebounds: player.stats.offReb,
            defRebounds: player.stats.defReb,
            blocks: player.stats.blk,
            fouls: player.stats.foul,
            turnovers: player.stats.turnover,
            minutes: 0,
            assists: player.stats.ast,
            freeThrowConverted: player.stats.pts1,
            freeThrowAttempted: player.stats.pts1 + player.stats.pts1Error,
            steals: player.stats.stl,
            threePointsConverted: player.stats.pts3,
            threePointsAttempted: player.stats.pts3 + player.stats.pts3Error,
            twoPointsConverted: player.stats.pts2,
            twoPointsAttempted: player.stats.pts3 + player.stats.pts3Error,
            game: matchData.gameId,
            athlete: player.id
      }));

      console.log(mappedStats);
      sessionStorage.removeItem('matchData');
   }

   return !matchData ? <Navigate to={'/match'}/> : (
      <S.PageContainer>
         <Sidebar page='match' />
         <S.ContentContainer>
            <S.Flex>
               <Title text='Partida finalizada' $uppercase/>
               <S.ButtonContainer>
                  <Button.Primary 
                  value='Salvar partida' 
                  $marginTop='0rem' 
                  fontSize='1.2rem'
                  onClick={submitMatch}
                  />
               </S.ButtonContainer>
            </S.Flex>
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
                           Object.keys(matchData.flags).length != 0 
                           ?
                           Object.keys(matchData.flags).map(key => (
                              <Quarters key={key} title={key} events={matchData.flags[key]}/>
                           )) 
                           :
                           <S.NoContent>
                              Não foram feitas marcações durante a partida.
                           </S.NoContent>
                        }
                     </S.FlagsContainer>
                  </Accordion.Root>
               </S.Container>

               <S.Container>
                  <Title text='Jogadores que participaram da partida' size='1.2rem'/>
                  <MS.AthletesList>
                     {
                        matchData.players.length != 0 
                        ?
                        matchData && matchData.players.map((player, index) => (
                           <S.Athlete key={index} onClick={() => handleSelectedPlayer(index)} $active={selectedPlayer && selectedPlayer.id === player.id}>
                              <MS.AthleteInfo>
                                 <MS.AthleteImage src={player.picture}/>

                                 <MS.Column>
                                    <MS.AthleteName>{player.firstName} {player.lastName}</MS.AthleteName>
                                 </MS.Column>
                              </MS.AthleteInfo>
                           </S.Athlete>
                        ))
                        :
                        <S.NoContent>
                        Não foram encontrados dados de jogadores que participaram da partida.
                        </S.NoContent>
                     }
                  </MS.AthletesList>
               </S.Container>

               <S.Container>
                  <Title text='Estatísticas' size='1.2rem'/>
                  <S.DurationContainer>
                     <span>Duração total da partida</span>
                     <span>{Utils.sumTimes(matchData.stats.times)}</span>
                  </S.DurationContainer>
                  {  
                     !selectedPlayer 
                     ?
                     <S.StatsContainer>
                        <Title text={`Geral do time`} size='1.2rem' color={Utils.colors.orange100}/>
                        <Stats stats={matchData.stats.teamStats}/>
                     </S.StatsContainer> 
                     : (
                        <S.StatsContainer>
                           <Title text={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`} size='1.2rem' color={Utils.colors.orange100}/>
                           <Stats stats={selectedPlayer.stats}/>
                        </S.StatsContainer>
                     )
                  }
                     
               </S.Container>
            </S.FinishedMatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}