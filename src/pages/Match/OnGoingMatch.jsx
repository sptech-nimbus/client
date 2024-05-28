import * as S from './Match.styled';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

import Background from "@components/Background/Background";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Popover from "@components/Popover/Popover";

import { Play, Pause, ClockClockwise, CaretDown } from '@phosphor-icons/react';
import * as Accordion from '@radix-ui/react-accordion';

export default function OnGoingMatch() {
   const { totalSeconds, seconds, minutes, hours, isRunning, start, resume, pause, reset } = useStopwatch();
   const [challenged, setChallenged] = useState({ 
      name: 'Nome challenged',
      picture: 'https://1000logos.net/wp-content/uploads/2017/12/Los-Angeles-Clippers-Logo.png',
      pts: 0
   });

   const [challenger, setChallenger] = useState({ 
      name: 'Nome challenger',
      picture: 'https://seeklogo.com/images/A/atlanta-hawks-logo-A108D0AC8D-seeklogo.com.png',
      //stats
   });

   const [stats, setStats] = useState({
      pts: 0,
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
   });

   const formatTime = (time) => {
      return time.toString().padStart(2, '0');
   };

   const addStatistic = (stat, value) => {
      if (value > 0) {
         setStats(prevStats => ({
            ...prevStats,
            [stat]: prevStats[stat] + value
         }));
      }

      if (stat == 'pts') {
         const pointMapping = {
            1: 'pts1',
            2: 'pts2',
            3: 'pts3',
            '-1': 'pts1Err',
            '-2': 'pts2Err',
            '-3': 'pts3Err'
         };

         const pointStat = pointMapping[value];
         if (pointStat) {
            setStats(prevStats => ({
                  ...prevStats,
                  [pointStat]: prevStats[pointStat] + 1
            }));
         }
      }
   };

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='match'/>
         <S.ContentContainer>
            <Title text='Partida em andamento' uppercase/>
            <S.MatchGrid>
               <S.Container>
                  <S.TitleContainer>
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
                     <S.Pts isWinning={stats.pts > challenged.pts}>{stats.pts}</S.Pts>
                     <S.Versus>X</S.Versus>
                     <S.Pts isWinning={challenged.pts > stats.pts}>{challenged.pts}</S.Pts>
                  </S.OnGoingPts>
                  <S.TitleContainer>
                     <Title text='Estatísticas do seu time' size='1.2rem'/>
                  </S.TitleContainer>
                  <S.StatsContainer>
                     <S.Flex>
                        <span><S.StatsLabel>Rebotes ofensivos:</S.StatsLabel> {stats.offReb}</span>
                        <span><S.StatsLabel>Rebotes defensivos:</S.StatsLabel> {stats.defReb}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Tocos:</S.StatsLabel> {stats.blk}</span>
                        <span><S.StatsLabel>Roubos:</S.StatsLabel> {stats.stl}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Faltas:</S.StatsLabel> {stats.foul}</span>
                        <span><S.StatsLabel>Turnovers:</S.StatsLabel> {stats.turnover}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Assistências:</S.StatsLabel> {stats.ast}</span>
                        <span><S.StatsLabel>Lances livres:</S.StatsLabel> {stats.pts1}/{stats.pts1 + stats.pts1Err}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Arremessos de 3 pontos:</S.StatsLabel> {stats.pts3}/{stats.pts3 + stats.pts3Err}</span>
                        <span><S.StatsLabel>Arremessos de 2 pontos:</S.StatsLabel> {stats.pts2}/{stats.pts2 + stats.pts2Err}</span>
                     </S.Flex>
                  </S.StatsContainer>
               </S.Container>

               <S.Container>
                  <Title text='Jogadores do seu time' size='1.2rem'/>
                  <S.AthletesList>
                     <Accordion.Root type='single' collapsible>

                        <Accordion.Item value='item-1' asChild>
                           <S.Athlete>
                              <S.AthleteInfo>
                                 <S.AthleteImage />

                                 <S.Column>
                                    <S.AthleteName>Nome do jogador</S.AthleteName>
                                    <S.isPlaying isPlaying>Jogando</S.isPlaying>
                                 </S.Column>

                                 <Accordion.Trigger asChild>
                                    <S.CollapsibleArrow>
                                       <CaretDown weight='bold'/>
                                    </S.CollapsibleArrow>
                                 </Accordion.Trigger>
                              </S.AthleteInfo>

                              <Accordion.Content asChild>
                                 <S.Actions>
                                    <Popover trigger={<S.Action >Pontos</S.Action>} sideOffset={8}>
                                       <S.PopoverContent>
                                          <S.AddAction>
                                             <S.AddButton isError onClick={() => addStatistic('pts', -1)}>+1 pts</S.AddButton>
                                             <S.AddButton isError onClick={() => addStatistic('pts', -2)}>+2 pts</S.AddButton>
                                             <S.AddButton isError onClick={() => addStatistic('pts', -3)}>+3 pts</S.AddButton>
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
                                             <S.AddButton onClick={() => addStatistic('offReb', 1)} title='+1 Rebote ofensivo'>+1 reb off</S.AddButton>
                                             <S.AddButton onClick={() => addStatistic('defReb', 1)} title='+1 Rebote defensivo'>+1 reb def</S.AddButton>
                                          </S.AddAction>
                                       </S.PopoverContent>
                                    </Popover>

                                    <Popover trigger={<S.Action>Defesa</S.Action>} sideOffset={8}>
                                       <S.PopoverContent>
                                          <S.AddAction>
                                             <S.AddButton onClick={() => addStatistic('blk', 1)}>+1 toco</S.AddButton>
                                             <S.AddButton onClick={() => addStatistic('stl', 1)}>+1 roubo</S.AddButton>
                                             <S.AddButton isError onClick={() => addStatistic('foul', 1)}>+1 falta</S.AddButton>
                                          </S.AddAction>
                                       </S.PopoverContent>
                                    </Popover>

                                    <Popover trigger={<S.Action>Assistência</S.Action>} sideOffset={8}>
                                       <S.PopoverContent>
                                          <S.AddAction>
                                             <S.AddButton isError onClick={() => addStatistic('turnover', 1)}>+1 turnover</S.AddButton>
                                             <S.AddButton onClick={() => addStatistic('ast', 1)}>+1 assistência</S.AddButton>
                                          </S.AddAction>
                                       </S.PopoverContent>
                                    </Popover>
                                 </S.Actions>
                              </Accordion.Content>
                           </S.Athlete>
                        </Accordion.Item>
                     </Accordion.Root>
                  </S.AthletesList>
               </S.Container>
               
               <S.Container>
                  <S.TimerContainer>
                     <S.TimerButtons>
                        <S.TimerButton onClick={() => isRunning ? pause() : start()} title={isRunning ? 'Pausar' : 'Iniciar/Retomar'}>
                           {
                              isRunning
                              ? <Pause weight='fill'/>
                              : <Play weight='fill'/>
                           }
                        </S.TimerButton>
                        <S.TimerButton title='Reiniciar timer'>
                           <ClockClockwise weight='fill' onClick={reset}/>
                        </S.TimerButton>
                     </S.TimerButtons>
                     <S.Timer>
                        <span>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</span>
                     </S.Timer>
                     <S.FlagButton>+ marcação</S.FlagButton>
                  </S.TimerContainer>

                  <S.Flags>
                     <S.FlagButton>Finalizar partida</S.FlagButton>
                  </S.Flags>
               </S.Container>
            </S.MatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}