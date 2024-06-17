/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as S from './Home.styled';
import { useState, useEffect } from 'react';

import Sidebar from "@components/Sidebar/Sidebar";
import { DoughnutChart } from '@components/Charts';
import Background from "@components/Background/Background";
import Title from '@components/Title/Title';
import Loader from '@components/Loader/Loader';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';

import game from '@api/game';
import graph from '@api/graph';
import team from '@api/team';
import blobStorage from '@api/blobStorage';

import { Colors } from "@utils/Helpers";
import Utils from '@utils/Helpers';

import Results from './Result';

import { Pencil } from '@phosphor-icons/react';

export default function Home() {
   const [teamInfo, setTeamInfo] = useState();
   const [inputs, setInputs] = useState({});
   const [disabledInputs, setDisabledInputs] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   const [games, setGames] = useState();
   const [winsGraph, setWinsGraph] = useState();
   const [gameResults, setGameResults] = useState();
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

   const [lastGameData, setLastGameData] = useState();
   const [nextGameData, setNextGameData] = useState();

   const sortByDate = (a, b) => {
      return new Date(a.inicialDateTime).getTime() - new new Date(b.inicialDateTime).getTime();
   }

   const fetchTeam = async () => {
      try {
         const response = await team.get(sessionStorage.getItem('teamId'), localStorage.getItem('token'));
         if (response.status === 200) {
            setTeamInfo(response.data.data);
            setInputs(response.data.data);
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   function sortGamesByDate(games) {
      return games.sort((a, b) => new Date(a.inicialDateTime) - new Date(b.inicialDateTime));
   }

   function findRecentAndNextGames(games) {
      const now = new Date();
      const sortedGames = sortGamesByDate(games);

      let mostRecentGame = null;
      let nextGame = null;

      for (let game of sortedGames) {
         const gameStart = new Date(game.inicialDateTime);
         if (gameStart <= now) {
            mostRecentGame = game;
         } else if (!nextGame && gameStart > now) {
            nextGame = game;
         }
      }

      return { mostRecentGame, nextGame };
   }

   const fetchGames = async () => {
      try {
         const response = await game.getByTeam(
            sessionStorage.getItem('teamId'),
            localStorage.getItem('token')
         );

         if (response.status === 200) {
            const { mostRecentGame, nextGame } = findRecentAndNextGames(response.data.data);

            setLastGameData(mostRecentGame);
            setNextGameData(nextGame);

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
      try {
         const res = await game.lastGame(sessionStorage.getItem('teamId'), localStorage.getItem('token'));
         if (res.status === 200) {
            setLastGame(res.data.data);
            console.log('lastGame: ', res.data.data);
         }
      }
      catch (err) {
         console.log(err);
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

   useEffect(() => { console.log('inputs: ', inputs); }, [inputs]);

   const fetchWins = async () => {
      const res = await graph.getWins(sessionStorage.getItem('teamId'), 100, localStorage.getItem('token'));

      setWinsGraph([res.data.data.wins, res.data.data.loses]);
   }

   const putTeam = async () => {
      try {
         const { picture } = inputs;
         delete inputs.picture;

         const response = await team.put(sessionStorage.getItem('teamId'), inputs, localStorage.getItem('token'));
         if (picture) {
            try {
               const res = await blobStorage.post(picture, localStorage.getItem('token'), sessionStorage.getItem('teamId'));
               console.log(res);
            }
            catch (err) {
               console.log(err);
            }
         }
         if (response.status === 200) {
            setDisabledInputs(true);
            window.location.reload();
         }
      }
      catch (err) {
         console.log(err);
      }
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
               fetchTeam(),
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
            {!lastGame.challenger.id ? <S.NoContent>Não foram encontrados jogos anteriores.</S.NoContent> : (
               <>
                  <S.MatchTeams>
                     <S.MatchTeamLogo>
                        {
                           lastGame.challenger.picture
                              ? <S.MatchTeamImage src={lastGame.challenger.picture ? lastGame.challenger.picture : ''} />
                              : Utils.getTeamInitials(lastGame.challenger.name)
                        }
                     </S.MatchTeamLogo>
                     <span>VS</span>
                     <S.MatchTeamLogo>
                        {
                           lastGame.challenged.picture
                              ? <S.MatchTeamImage src={lastGame.challenged.picture ? lastGame.challenged.picture : ''} />
                              : Utils.getTeamInitials(lastGame.challenged.name)
                        }
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
                                 lastGame.game.gameResult.challengerPoints === lastGame.game.gameResult.challengedPoints
                                    ? 'draw'
                                    : (
                                       (lastGame.game.gameResult.challengerPoints > lastGame.game.gameResult.challengedPoints
                                          && lastGame.challenger.id === localStorage.getItem('teamId')) ||
                                       (lastGame.game.gameResult.challengerPoints < lastGame.game.gameResult.challengedPoints
                                          && lastGame.challenged.id === localStorage.getItem('teamId'))
                                    )
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
      const hourSplit = nextGame.game.hour.split(':');

      return (
         <S.MatchCard>
            <S.MatchHeader>
               <span>Próxima partida</span>
            </S.MatchHeader>
            {!nextGame.game.day ? <S.NoContent>Não forma encontrados jogos futuros.</S.NoContent> : (
               <>
                  <S.MatchTeams>
                     <S.MatchTeamLogo>
                        {
                           nextGame.challenger.picture
                              ? <S.MatchTeamImage src={nextGame.challenger.picture ? nextGame.challenger.picture : ''} />
                              : Utils.getTeamInitials(nextGame.challenger.name)
                        }
                     </S.MatchTeamLogo>
                     <span>VS</span>
                     <S.MatchTeamLogo>
                        {
                           nextGame.challenged.picture
                              ? <S.MatchTeamImage src={nextGame.challenged.picture ? nextGame.challenged.picture : ''} />
                              : Utils.getTeamInitials(nextGame.challenged.name)
                        }
                     </S.MatchTeamLogo>
                  </S.MatchTeams>
                  <S.MatchInfo>
                     <span>{nextGame.challenger.name}</span>
                     <span>{nextGame.challenged.name}</span>
                  </S.MatchInfo>
                  <S.MatchResults>
                     <span>{nextGame.game.day.toString().padStart(2, '0')}/{nextGame.game.month.toString().padStart(2, '0')}</span>
                     <span>{hourSplit[0].toString().padStart(2, '0')}:{hourSplit[1].toString().padStart(2, '0')}</span>
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
         async function fetchData() {
            const teamDataName = await fetchTeam();
            setTeamName(teamDataName);
         }
         fetchData()
      }, [teamName]);

      return (
         <S.Pending $isChallenged={isChallenged}>
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
                  <S.TeamInfoTitle>
                     <Title text={disabledInputs ? 'Informações do time' : 'Atualizar informações do time'} size='1rem' color={Colors.orange100} />
                     <div>
                        {!disabledInputs &&
                           <Button.Primary
                              $marginTop="0rem"
                              value="Salvar"
                              fontSize=".9rem"
                              onClick={putTeam}
                           />
                        }
                        <Pencil
                           size={24}
                           weight='bold'
                           color={disabledInputs ? Colors.gray500 : Colors.orange100}
                           onClick={() => {
                              setInputs(teamInfo);
                              setDisabledInputs(!disabledInputs);
                           }}
                        />
                     </div>
                  </S.TeamInfoTitle>
                  {teamInfo && inputs &&
                     <S.TeamInfoContainer>
                        <S.TeamImage>
                           {teamInfo.picture ? <img src={teamInfo.picture} alt="" /> : <span>{Utils.getTeamInitials(teamInfo.name)}</span>}
                        </S.TeamImage>

                        <S.TeamInfo>
                           <Input.Default
                              name='name'
                              value={inputs.name}
                              disabled={disabledInputs}
                              onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                           />
                           <Input.Default
                              name='category'
                              value={inputs.category}
                              disabled={disabledInputs}
                              onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                           />
                           <Input.Default
                              name='local'
                              value={inputs.local}
                              disabled={disabledInputs}
                              onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                           />
                           <Input.Default
                              name='picture'
                              type='file'
                              disabled={disabledInputs}
                              onChange={e => setInputs({ ...inputs, [e.target.name]: e.target.files[0] })}
                           />
                        </S.TeamInfo>
                     </S.TeamInfoContainer>
                  }
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