import * as S from './Home.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";
import { useState, useEffect } from 'react';

import { RadarChart, DoughnutChart } from '../../components/Charts';
import Results from './Result';
import Title from '@components/Title/Title';

import game from '../../api/game';

import { Colors } from "@utils/Helpers";

export default function Home() {
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
         picture: '',
      },
      challenged: {
         id: '',
         name: '',
         picture: '',
      }
   });

   useEffect(() => {
      async function getLastGame() {
         const { data } = await game.lastGame(localStorage.getItem('teamId', localStorage.getItem('token')));

         setLastGame(data.data);
      }

      getLastGame();
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
               label: '# of Votes',
               data: [12, 12],
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
                  <S.MatchCard>
                     <S.MatchHeader>
                        <span>Partida anterior</span>
                     </S.MatchHeader>
                     <S.MatchTeams>
                        <S.MatchTeamLogo />
                        <span>VS</span>
                        <S.MatchTeamLogo />
                     </S.MatchTeams>
                     <S.MatchInfo>
                        <span>Meu time</span>
                        <span>Time adversário</span>
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
                        <span>Meu time</span>
                        <span>Time adversário</span>
                     </S.MatchInfo>
                     <S.MatchResults>
                        <span>25.04.2024</span>
                        <span>16:30</span>
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
      </S.PageContainer>
   )
}