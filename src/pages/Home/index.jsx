/* eslint-disable no-unused-vars */

import * as S from './Home.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";
import { useState, useEffect } from 'react';

import { RadarChart, DoughnutChart } from '../../components/Charts';
import Results from './Result';
import Title from '@components/Title/Title';
import Loader from '@components/Loader/Loader';

import game from '@api/game';
import graph from '@api/graph';
import team from '@api/team';

import { Colors } from "@utils/Helpers";

export default function Home() {
   const [games, setGames] = useState();
   const [winsGraph, setWinsGraph] = useState();
   const [gameResults, setGameResults] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [performanceGraph, setPerformanceGraph] = useState();

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

   const fetchGames = async () => {
      try {
         const response = await game.getByTeam(
            sessionStorage.getItem('teamId'),
            localStorage.getItem('token')
         );

         if (response.status === 200) {
            const notConfirmed = response.data.data.filter(game => !game.confirmed);
            setGames(notConfirmed);
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   const fetchNotConfirmedResult = async () => {
      try {
         const response = await game.result.notConfirmed(
            sessionStorage.getItem('teamId'), localStorage.getItem('token')
         );

         if (response.status === 200) {
            setGameResults(response.data.data);
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   async function fetchLastGame() {
      const res = await game.lastGame(sessionStorage.getItem('teamId'), localStorage.getItem('token'));

      if (res.status === 204) {
         setLastGame(null);
      } else {
         setLastGame(res.data.data);
      }
   }

   async function fetchNextGame() {
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

   async function fetchWins() {
      const res = await graph.getWins(sessionStorage.getItem('teamId'), 10, localStorage.getItem('token'));

      setWinsGraph([res.data.data.wins, res.data.data.loses]);
   }

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

   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsLoading(true);
            await Promise.all([
               fetchGames(),
               fetchNotConfirmedResult(),
               fetchLastGame(),
               fetchNextGame(),
               fetchWins()
            ]);
         } catch (err) {
            console.error(err);
         } finally {
            setIsLoading(false);
         }
      }

      fetchData();
   }, []);

   function LastGame({ lastGame }) {
      return (
         <S.MatchCard >
            <S.MatchHeader>
               <span>Partida anterior</span>
            </S.MatchHeader>
            {!lastGame.inicialDateTime ? <S.NoContent>Não foram encontrados jogos anteriores.</S.NoContent> : (
               <>
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
               </>
            )}
         </S.MatchCard>
      )
   }

   function NextGame({ nextGame }) {
      return (
         <S.MatchCard>
            <S.MatchHeader>
               <span>Próxima partida</span>
            </S.MatchHeader>
            {!nextGame.game.day ? <S.NoContent>Não forma encontrados jogos futuros.</S.NoContent> : (
               <>
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
                     <span>{nextGame.game.day.toString().padStart(2, '0')}/{nextGame.game.month.toString().padStart(2, '0')}</span>
                     <span>{nextGame.game.hour}</span>
                  </S.MatchResults>
               </>
            )}
         </S.MatchCard>
      )
   }

   function Pending({ data }) {
      const [teamName, setTeamName] = useState('Carregando...');
      const [gameId, setGameId] = useState(data.id);
      const [isChallenged, setIsChallenged] = useState(data.challenged === sessionStorage.getItem('teamId'));
      const date = new Date(data.finalDateTime);

      const confirm = async () => {
         try {
            const res = data.gameResult ? await game.result.confirm(data.gameResult.id, { id: localStorage.getItem("id") }, localStorage.getItem('token')) :
               await game.confirm(gameId, { id: localStorage.getItem("id") }, localStorage.getItem('token'));

            if (res.status === 200) {
               setGames(games.filter(game => game.id !== gameId));
            }
            console.log(res);
         }
         catch (err) {
            console.log();
         }
      }

      const fetchTeam = async () => {
         try {
            const teamId = isChallenged ? data.challenger : data.challenged;
            const response = await team.get(teamId, localStorage.getItem('token'));

            return response.data.data.name;
         }
         catch (err) {
            console.log(err);
            return ''
         }
      }

      useEffect(() => {
         console.log(data);
         async function fetchData() {
            const teamDataName = await fetchTeam();
            setTeamName(teamDataName);
         }
         fetchData()
      }, [teamName]);

      return (
         <S.Pending isChallenged={isChallenged}>
            <span>{data.gameResult ? 'Resultado' : 'Jogo'}</span>
            <span title={teamName}>{teamName}</span>
            <span>
               {
                  data.gameResult ? `${data.gameResult.challengerPoints} x ${data.gameResult.challengedPoints}` :
                     date.toLocaleDateString('pt-br')
               }
            </span>
            {!isChallenged ? <button title='Apenas o time desafiado pode confimar o resultado da partida.' disabled>Indisponível</button> : <button onClick={() => confirm()}>Confirmar</button>}
         </S.Pending>
      )
   }

   return isLoading ? <S.LoaderContainer><Loader /></S.LoaderContainer> : (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='home' />
         <S.ContentContainer>
            <S.HomeGrid>
               <S.Container>
                  <Title text='Desempenho do time nos últimos jogos' size='1rem' color={Colors.orange100} />
                  <S.ChartContainer>
                     {!performanceGraph ? <S.NoContent>Não foram encontrados dados de desempenho do time.</S.NoContent> : <RadarChart data={radarConfig.data} options={radarConfig.options} />}
                  </S.ChartContainer>
               </S.Container>

               <S.MatchContainer>
                  <LastGame lastGame={lastGame} />
                  <NextGame nextGame={nextGame} />
               </S.MatchContainer>

               <S.Container>
                  <Title text='Acões pendentes' size='1rem' color={Colors.orange100} />
                  {
                     (games && games.length > 0) || (gameResults && gameResults.length > 0) ? (
                        <S.PendingList>
                           {games && games.map((game, index) => (
                              <Pending key={index} data={game} />
                           ))}

                           {gameResults && gameResults.map((game, index) => (
                              <Pending key={index} data={game} />
                           ))}
                        </S.PendingList>
                     ) :
                        <S.NoContent>Não foram encontradas ações pendentes.</S.NoContent>
                  }
               </S.Container>

               <S.Container>
                  <Title text='Resultado do time nos últimos jogos' size='1rem' color={Colors.orange100} />
                  <S.ChartContainer>
                     {!winsGraph ? <S.NoContent>Não foram encontrados dados de partidas</S.NoContent> : <DoughnutChart data={doughnutConfig.data} options={doughnutConfig.options} />}
                  </S.ChartContainer>
               </S.Container>
            </S.HomeGrid>
         </S.ContentContainer>
      </S.PageContainer >
   )
}