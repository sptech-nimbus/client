import * as S from './Home.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";
import { useState, useEffect } from 'react';

import { RadarChart, DoughnutChart } from '../../components/Charts';
import Results from './Result';
import Title from '@components/Title/Title';

import game from '../../api/game';
import graph from '../../api/graph';

import { Colors } from "@utils/Helpers";

export default function Home() {
   const [events, setEvents] = useState([]);
   const [winsGraph, setWinsGraph] = useState([]);

   const [lastGame, setLastGame] = useState({
      game: {
         inicialDateTime: '',
         gameResult: {
            challengerPoints: 0,
            challengedPoints: 0,
            confirmed: false
         }
      },
      challenger: {
         id: '',
         name: '',
         picture: ''
      },
      challenged: {
         id: '',
         name: '',
         picture: ''
      }
   });

   const [nextGame, setNextGame] = useState({
      game: {
         day: '',
         month: '',
         hour: ''
      },
      challenger: {
         id: '',
         name: '',
         picture: ''
      },
      challenged: {
         id: '',
         name: '',
         picture: ''
      }
   });

   const sortByDate = (a, b) => {
      return new Date(a.inicialDateTime).getTime() - new new Date(b.inicialDateTime).getTime();
   }

   useEffect(() => {
      async function getLastGame() {
         const res = await game.lastGame(sessionStorage.getItem('teamId'), localStorage.getItem('token'));

         if (res.status === 204) {
            setLastGame(null);
         } else {
            setLastGame(res.data.data);
         }
      }

      async function getNextGame() {
         const res = await game.nextGame(sessionStorage.getItem('teamId'), localStorage.getItem('token'));

         const date = new Date(res.data.data.game.inicialDateTime);

         if (res.status === 204) {
            setNextGame(null);
         } else {
            setNextGame({
               ...res.data.data, game: {
                  day: date.getDate(),
                  month: date.getMonth() + 1,
                  hour: `${date.getHours()}:${date.getMinutes()}`
               }
            });
         }
      }

      async function getAllEvents() {
         const res = await graph.allEvents(sessionStorage.getItem('teamId'), localStorage.getItem('token'));

         const events = [...res.data.data.games, ...res.data.data.trainings];

         const orderedEvents = events.sort(sortByDate);

         console.log(orderedEvents);
         setEvents(orderedEvents);

         async function getWins() {
            const res = await graph.getWins(sessionStorage.getItem('teamId'), 10, localStorage.getItem('token'));

            setWinsGraph([res.data.data.wins, res.data.data.loses]);
         }

      }
      getLastGame();
      getNextGame();
      getAllEvents();
      getWins();
   }, []);

   const radarConfig = {
      data: {
         labels: ['Rebotes', 'Pontos', 'Assistências', 'Tocos', 'Roubos de bola', 'Lances livres'],
         datasets: [
            {
               label: 'Desempenho',
               data: [10, 12, 12, 8, 12, 9],
               backgroundColor: `${Colors.orange500}65`,
               borderColor: Colors.orange500,
               borderWidth: 1,
            },
         ],
      },
      options: {
         scales: {
            r: {
               grid: {
                  color: `${Colors.gray100}65`,
               },
               angleLines: {
                  color: `${Colors.gray100}65`,
               }
            }
         },
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
            legend: {
               labels: {
                  color: Colors.orange100,
                  boxWidth: 20,
                  font: {
                     size: 18,
                     family: 'Poppins'
                  }
               },
               position: 'right'
            }
         }
      }
   }

   const doughnutConfig = {
      data: {
         labels: ['Vitórias', 'Derrotas'],
         datasets: [
            {
               label: '',
               data: winsGraph,
               backgroundColor: [
                  `${Colors.orange500}`,
                  `${Colors.orange300}`,
               ],
               borderColor: [
                  Colors.orange500,
                  Colors.orange300,

               ],
               borderWidth: 1,
            },
         ],
      },
      options: {
         circumference: 180,
         rotation: -90,
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
            legend: {
               labels: {
                  color: Colors.orange100,
                  boxWidth: 20,
                  font: {
                     size: 18,
                     family: 'Poppins'
                  }
               },
               position: 'right',
            },
         },
      }
   }

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='home' />
         <S.ContentContainer>
            <S.HomeGrid>
               <S.Container>
                  <Title text='Desempenho do time nos últimos jogos' size='1rem' color={Colors.orange100} />
                  <S.ChartContainer>
                     <RadarChart data={radarConfig.data} options={radarConfig.options} />
                  </S.ChartContainer>
               </S.Container>

               <S.MatchContainer>
                  {
                     lastGame
                        ? < S.MatchCard >
                           <S.MatchHeader>
                              <span>Partida anterior</span>
                           </S.MatchHeader>
                           <S.MatchTeams>
                              <S.MatchTeamLogo>
                                 <S.MatchTeamImage src={lastGame.challenger.picture ? lastGame.challenger.picture : ''} />
                              </S.MatchTeamLogo>
                              <span>VS</span>
                              <S.MatchTeamLogo>
                                 <S.MatchTeamImage src={lastGame.challenged.picture ? lastGame.challenger.picture : ''} />
                              </S.MatchTeamLogo >

                           </S.MatchTeams>
                           <S.MatchInfo>
                              <span>{lastGame.challenger.name}</span>
                              <span>{lastGame.challenged.name}</span>
                           </S.MatchInfo>
                           <S.MatchResults>
                              {
                                 lastGame.game.gameResult !== null
                                    ? <>
                                       <span>{lastGame.game.gameResult.challengerPoints}</span>
                                       <Results result={
                                          lastGame.game.gameResult.challengerPoints > lastGame.game.gameResult.challengedPoints
                                             && lastGame.challenger.id === localStorage.getItem('teamId')
                                             ? 'win'
                                             : 'lose'
                                       } />
                                       <span>{lastGame.game.gameResult.challengedPoints}</span>
                                    </>
                                    : <Results />
                              }
                           </S.MatchResults>
                        </S.MatchCard>
                        : 'Sem Jogos cadastrados'
                  }

                  <S.MatchCard>
                     <S.MatchHeader>
                        <span>Próxima partida</span>
                     </S.MatchHeader>
                     <S.MatchTeams>
                        <S.MatchTeamLogo />
                        <span>VS</span>
                        <S.MatchTeamLogo />
                     </S.MatchTeams>
                     <S.MatchInfo>
                        <span>{nextGame.challenger.name}</span>
                        <span>{nextGame.challenged.name}</span>
                     </S.MatchInfo>
                     <S.MatchResults>
                        <span>{nextGame.game.day}/{nextGame.game.month}</span>
                        <span>{nextGame.game.hour}</span>
                     </S.MatchResults>
                  </S.MatchCard>
               </S.MatchContainer>

               <S.Container>
                  <span>Não há mensagens novas no momento.</span>
               </S.Container>

               <S.Container>
                  <Title text='Resultado do time nos últimos jogos' size='1rem' color={Colors.orange100} />
                  <S.ChartContainer>
                     <DoughnutChart data={doughnutConfig.data} options={doughnutConfig.options} />
                  </S.ChartContainer>
               </S.Container>
            </S.HomeGrid>
         </S.ContentContainer>
      </S.PageContainer >
   )
}