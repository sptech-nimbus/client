import * as S from './Match.styled';
import { useState } from 'react';

import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Popover from "@components/Popover/Popover";

export default function RegisterStats() {
   const [challenged, setChallenged] = useState({ 
      name: 'Nome challenged',
      picture: 'https://1000logos.net/wp-content/uploads/2017/12/Los-Angeles-Clippers-Logo.png',
      pts: 0, 
   });

   const [challenger, setChallenger] = useState({ 
      name: 'Nome challenger',
      picture: 'https://i.pinimg.com/originals/64/3b/db/643bdb48540f70aed4c55ce2e3cee473.png',
      pts: 0,
      stats: {
         ast: 0,
         blk: 0,
         stl: 0,
         turnover: 0,
         pts1: 0,
         pts2: 0,
         pts3: 0,
         pts1Err: 0,
         pts2Err: 0,
         pts3Err: 0,
         offReb: 0,
         defReb: 0,
         foul: 0
      }
   });

   const addStatistic = (stat, value) => {
      const currentPts = challenger.pts + value;
      if(stat == 'pts') {
         setChallenger({
            ...challenger,
            pts: currentPts
         });
      }
      else {
         setChallenger({
            ...challenger,
            stats:{ [stat]: currentPts }
         });
      }

      console.log(challenger);
   }

   return (
      <S.PageContainer>
         <Sidebar page='match'/>
         <S.ContentContainer>
            <Title text='Partida em andamento' uppercase/>
            <S.MatchGrid>
               <S.Container>
                  <S.TitleContainer>
                     <Title text='Times' size='1.2rem'/>
                  </S.TitleContainer>
                  <S.TeamsContainer>
                     <S.Team>
                        <S.TeamImage src={challenger.picture} />
                        <S.TeamName>{challenger.name}</S.TeamName>
                     </S.Team>
                     <S.Versus>VS</S.Versus>
                     <S.Team>
                        <S.TeamImage src={challenged.picture}  />
                        <S.TeamName>{challenged.name}</S.TeamName>
                     </S.Team>
                  </S.TeamsContainer>
               </S.Container>

               <S.Container>
                  <S.OnGoingPts>
                     <S.Pts isWinning={challenger.pts > challenged.pts}>{challenger.pts}</S.Pts>
                     <S.Versus>X</S.Versus>
                     <S.Pts isWinning={challenged.pts > challenger.pts}>{challenged.pts}</S.Pts>
                  </S.OnGoingPts>
                  <S.TitleContainer>
                     <Title text='Estatísticas do seu time' size='1.2rem'/>
                  </S.TitleContainer>
                  <S.StatsContainer>
                     <S.Flex>
                        <span><S.StatsLabel>Rebotes ofensivos:</S.StatsLabel> {challenger.stats.offReb}</span>
                        <span><S.StatsLabel>Rebotes defensivos:</S.StatsLabel> {challenger.stats.defReb}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Tocos:</S.StatsLabel> {challenger.stats.blk}</span>
                        <span><S.StatsLabel>Roubos:</S.StatsLabel> {challenger.stats.stl}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Faltas:</S.StatsLabel> {challenger.stats.foul}</span>
                        <span><S.StatsLabel>Turnovers:</S.StatsLabel> {challenger.stats.turnover}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Assistências:</S.StatsLabel> {challenger.stats.ast}</span>
                        <span><S.StatsLabel>Lances livres:</S.StatsLabel> {challenger.stats.pts1}/{challenger.stats.pts1 + challenger.stats.pts1Err}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Arremessos de 3 pontos:</S.StatsLabel> {challenger.stats.pts3}/{challenger.stats.pts3 + challenger.stats.pts3Err}</span>
                        <span><S.StatsLabel>Arremessos de 2 pontos:</S.StatsLabel> {challenger.stats.pts2}/{challenger.stats.pts2 + challenger.stats.pts2Err}</span>
                     </S.Flex>
                  </S.StatsContainer>
               </S.Container>

               <S.Container>
                  <Title text='Jogadores do seu time' size='1.2rem'/>
                  <S.AthletesList>
                     <S.Athlete>
                        <S.AthleteInfo>
                           <S.AthleteImage />

                           <S.Column>
                              <S.AthleteName>Nome do jogador</S.AthleteName>
                              <S.isPlaying isPlaying>Jogando</S.isPlaying>
                           </S.Column>
                        </S.AthleteInfo>

                        <S.Actions>
                           <Popover trigger={<S.Action>Pontos</S.Action>} sideOffset={8}>
                              <S.PopoverContent>
                                 <S.AddAction>
                                    <S.AddButton isError>+1 pts</S.AddButton>
                                    <S.AddButton isError>+2 pts</S.AddButton>
                                    <S.AddButton isError>+3 pts</S.AddButton>
                                 </S.AddAction>
                                 <S.AddAction>
                                    <S.AddButton onClick={() => addStatistic('pts', 1)}>+1 pts</S.AddButton>
                                    <S.AddButton onClick={() => addStatistic('pts', 2)}>+2 pts</S.AddButton>
                                    <S.AddButton onClick={() => addStatistic('pts', 3)}>+3 pts</S.AddButton>
                                 </S.AddAction>
                              </S.PopoverContent>
                           </Popover>

                           <Popover trigger={<S.Action>Rebotes</S.Action>} sideOffset={8}>
                              <S.PopoverContent>
                                 <S.AddAction>
                                    <S.AddButton title='+1 Rebote ofensivo'>+1 reb off</S.AddButton>
                                    <S.AddButton title='+1 Rebote defensivo'>+1 reb def</S.AddButton>
                                 </S.AddAction>
                              </S.PopoverContent>
                           </Popover>

                           <Popover trigger={<S.Action>Defesa</S.Action>} sideOffset={8}>
                              <S.PopoverContent>
                                 <S.AddAction>
                                    <S.AddButton>+1 toco</S.AddButton>
                                    <S.AddButton>+1 roubo</S.AddButton>
                                 </S.AddAction>
                              </S.PopoverContent>
                           </Popover>

                           <Popover trigger={<S.Action>Assistência</S.Action>} sideOffset={8}>
                              <S.PopoverContent>
                                 <S.AddAction>
                                    <S.AddButton isError>+1 turnover</S.AddButton>
                                    <S.AddButton>+1 assistência</S.AddButton>
                                 </S.AddAction>
                              </S.PopoverContent>
                           </Popover>
                        </S.Actions>
                     </S.Athlete>
                  </S.AthletesList>
               </S.Container>
            </S.MatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}