import * as S from './styled/Match.styled';
import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useNavigate } from 'react-router-dom';

import Background from "@components/Background/Background";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Button from "@components/Button/Button";
import { Dialog, DialogClose as Close } from "@components/Dialog/Dialog";

import { Play, Pause, ClockClockwise } from '@phosphor-icons/react';

import Athlete from './Athlete';

export default function OnGoingMatch({ allPlayers, gameData, setMatchData }) {
   const navigate = useNavigate();
   const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch();

   const [flagInput, setFlagInput] = useState('');
   const [flags, setFlags] = useState([])
   const [currentQuarter, setCurrentQuarter] = useState(1);

   const [challenged, setChallenged] = useState({
      name: 'Nome challenged',
      picture: 'https://1000logos.net/wp-content/uploads/2017/12/Los-Angeles-Clippers-Logo.png',
      pts: 0
   });

   const [challenger, setChallenger] = useState({
      name: 'Nome challenger',
      picture: 'https://seeklogo.com/images/A/atlanta-hawks-logo-A108D0AC8D-seeklogo.com.png',
   });

   const [players, setPlayers] = useState(allPlayers);
   const [teamStats, setTeamStats] = useState({
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

   useEffect(() => {
      const mapPlayers = players.map(player => ({
         ...player,
         stats: {
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
         }
      }));

      setPlayers(mapPlayers);
   }, []);

   const formatTime = (time) => {
      return time.toString().padStart(2, '0');
   };

   const addTeamStatistic = (stat, value) => {
      setTeamStats(prevStats => ({
         ...prevStats,
         [stat]: prevStats[stat] + value
      }));

      if (stat === 'pts') {
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
            setTeamStats(prevStats => ({
               ...prevStats,
               [pointStat]: prevStats[pointStat] + 1
            }));
         }
      }
   };

   const updatePlayerStats = (playerId, stat, value) => {
      setPlayers(prevPlayers => prevPlayers.map(player => {
         if (player.personaId === playerId) {
            const updatedStats = {
               ...player.stats,
               [stat]: player.stats[stat] + value
            };
   
            if (stat === 'pts') {
               const pointMapping = {
                  1: 'pts1',
                  2: 'pts2',
                  3: 'pts3',
               };
   
               const pointStat = pointMapping[value];
               if (pointStat) {
                  updatedStats[pointStat] += 1;
               }
            }
   
            return { ...player, stats: updatedStats };
         }
         return player;
      }));
   };
   

   const handleFinishQuarter = () => {
      setCurrentQuarter(currentQuarter + 1);
      reset();
      pause();
   }

   const addFlag = async () => {
      setFlags([...flags, { quarter: currentQuarter, time: `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`, text: flagInput }]);
      setFlagInput('');
   }

   const handleFlags = () => {
      const maxQuarter = Math.max(...flags.map(flag => flag.quarter));
      const groupedFlags = {};

      for (let i = 1; i <= maxQuarter; i++) {
         groupedFlags[`quarter${i}`] = flags.filter(flag => flag.quarter == i);
      }

      return groupedFlags;
   }

   const handleResult = () => {
      return {
         challenged,
         challenger: {
            ...challenger,
            stats: { ...teamStats }
         },
         // gameId: gameData.gameId,
         players,
         flags: handleFlags()
      }      
   }

   const finishGame = () => {
      console.clear();
      setMatchData(handleResult());
      navigate('finished');
   }

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='match' />
         <S.ContentContainer>
            <Title text='Partida em andamento' uppercase />
            <S.MatchGrid>
               <S.Container>
                  <S.TeamsContainer>
                     <S.Team>
                        <S.TeamImage src={challenger.picture} />
                        <S.TeamName>{challenger.name}</S.TeamName>
                     </S.Team>
                     <S.Versus>VS</S.Versus>
                     <S.Team>
                        <S.TeamImage src={challenged.picture} />
                        <S.TeamName>{challenged.name}</S.TeamName>
                     </S.Team>
                  </S.TeamsContainer>
               </S.Container>

               <S.Container>
                  <S.OnGoingPts>
                     <S.Pts isWinning={teamStats.pts > challenged.pts}>{teamStats.pts}</S.Pts>
                     <S.Versus>X</S.Versus>
                     <S.Pts isWinning={challenged.pts > teamStats.pts}>{challenged.pts}</S.Pts>
                  </S.OnGoingPts>
                  <S.TitleContainer>
                     <Title text='Estatísticas do seu time' size='1.2rem' />
                  </S.TitleContainer>
                  <S.StatsContainer>
                     <S.Flex>
                        <span><S.StatsLabel>Rebotes ofensivos:</S.StatsLabel> {teamStats.offReb}</span>
                        <span><S.StatsLabel>Rebotes defensivos:</S.StatsLabel> {teamStats.defReb}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Tocos:</S.StatsLabel> {teamStats.blk}</span>
                        <span><S.StatsLabel>Roubos:</S.StatsLabel> {teamStats.stl}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Faltas:</S.StatsLabel> {teamStats.foul}</span>
                        <span><S.StatsLabel>Turnovers:</S.StatsLabel> {teamStats.turnover}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Assistências:</S.StatsLabel> {teamStats.ast}</span>
                        <span><S.StatsLabel>Lances livres:</S.StatsLabel> {teamStats.pts1}/{teamStats.pts1 + teamStats.pts1Err}</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Arremessos de 3 pontos:</S.StatsLabel> {teamStats.pts3}/{teamStats.pts3 + teamStats.pts3Err}</span>
                        <span><S.StatsLabel>Arremessos de 2 pontos:</S.StatsLabel> {teamStats.pts2}/{teamStats.pts2 + teamStats.pts2Err}</span>
                     </S.Flex>
                  </S.StatsContainer>
               </S.Container>

               <S.Container>
                  <Title text='Jogadores do seu time' size='1.2rem' />
                  <S.AthletesList>
                     {players.map(player => (
                        <Athlete 
                           key={player.id}
                           player={player}
                           addStatistic={addTeamStatistic}
                           updatePlayerStats={updatePlayerStats}
                        />
                     ))}
                  </S.AthletesList>
               </S.Container>

               <S.Container>
                  <S.TimerContainer>
                     <S.TimerButtons>
                        <S.TimerButton onClick={() => isRunning ? pause() : start()} title={isRunning ? 'Pausar' : 'Iniciar/Retomar'}>
                           {
                              isRunning
                                 ? <Pause weight='fill' />
                                 : <Play weight='fill' />
                           }
                        </S.TimerButton>
                        <S.TimerButton title='Reiniciar timer'>
                           <ClockClockwise weight='fill' onClick={() => { reset(); pause() }} />
                        </S.TimerButton>
                     </S.TimerButtons>
                     <S.Timer>
                        <span>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</span>
                     </S.Timer>
                     <S.AddFlag>
                        <span>{currentQuarter}º Quarto</span>
                        <input type='text' value={flagInput} onChange={ (e) => { setFlagInput(e.target.value) } }/>
                     </S.AddFlag>
                     <S.FlagButton onClick={addFlag}>+ marcação</S.FlagButton>
                  </S.TimerContainer>
                  
                  {
                     currentQuarter > 3
                     ? (
                        <Dialog 
                        title='Finalizar partida'
                        childTrigger
                        trigger={
                           <S.Flags>
                              <S.FlagButton onClick={handleFinishQuarter}>{currentQuarter == 4 ? 'Finalizar partida' : 'Finalizar quarto'}</S.FlagButton>
                           </S.Flags>
                        }>
                           <S.FinishMatch>
                              <span>Deseja finalizar a partida?</span>
                              <div>
                                 <Button.Primary
                                 onClick={finishGame}
                                 value='Finalizar partida'
                                 />
                                 <Close>
                                    <Button.Secondary
                                    value='Ir para prorrogação'
                                    />
                                 </Close>
                              </div>
                           </S.FinishMatch>
                        </Dialog>
                     )
                     : (
                        <S.Flags>
                           <S.FlagButton onClick={handleFinishQuarter}>{currentQuarter == 4 ? 'Finalizar partida' : 'Finalizar quarto'}</S.FlagButton>
                        </S.Flags>
                     )
                  }
                  
               </S.Container>
            </S.MatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}
