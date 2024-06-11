import { useEffect, useState } from 'react';
import * as S from './Dashboard.styled';
import { Colors } from "@utils/Helpers";

import { useNotification } from "@contexts/notification";

import Title from "@components/Title/Title";
import Loader from "@components/Loader/Loader";

import { LineChart, PieChart, BarChart } from "@components/Charts";
import graph from '../../api/graph';

export default function DashboardLayout({ setTeamStats }) {
   const { addNotification } = useNotification();
   const [isLoading, setIsLoading] = useState(false);
   const [winsGraph, setWinsGraph] = useState([]);
   const [pointsDivision, setPointsDivision] = useState([]);
   const [pointsPerGame, setPointsPerGame] = useState({ labels: [], values: []});
   const [foulsPerGame, setFoulsPerGame] = useState({ labels: [], values: [] });
   const [reboundsPerGame, setReboundsPerGame] = useState({ labels: [], values: [] });

   useEffect(() => {
      async function fetchData() {
         try {
            setIsLoading(true);

            const winsRes = await graph.getWins(sessionStorage.getItem('teamId'), 100, localStorage.getItem('token'));
            
            const pointsDivisionRes = await graph.getPointsDivision(sessionStorage.getItem('teamId'), 10, localStorage.getItem('token'));
            const pointsPerGame = await graph.getPointsPerGame(sessionStorage.getItem('teamId'), 6, localStorage.getItem('token'));
            const pointsGames = Object.keys(pointsPerGame.data.data);
            
            setWinsGraph([winsRes.data.data.wins, winsRes.data.data.loses]);
            setPointsDivision([pointsDivisionRes.data.data.threePointsPorcentage, pointsDivisionRes.data.data.twoPointsPorcentage]);

            pointsGames.forEach(gameDate => {
               const date = new Date(gameDate);
               setPointsPerGame({...pointsPerGame, labels: [...labels, `${date.getDay()}/${date.getMonth()}`]});
               setPointsPerGame({...pointsPerGame, values: [...values, pointsPerGame.data.data[gameDate]]});
            });

            const foulsPerGame = await graph.foulsPerGame(sessionStorage.getItem('teamId'), 5, localStorage.getItem('token'));
            const foulsGames = Object.keys(foulsPerGame.data.data);

            foulsGames.forEach(gameDate => {
               const date = new Date(gameDate);

               setFoulsPerGame({...foulsPerGame, labels: [...labels, `${date.getDay()}/${date.getMonth()}`]});
               setFoulsPerGame({...foulsPerGame, values: [...values, foulsPerGame.data.data[gameDate]]})
            });

            const reboundsPerGame = await graph.reboundsPerGame(sessionStorage.getItem('teamId'), 5, localStorage.getItem('token'));
            const reboundsGames = Object.keys(reboundsPerGame.data.data);

            reboundsGames.forEach(gameDate => {
               const date = new Date(gameDate);

               setReboundsPerGame({ ...reboundsPerGame, labels: [...labels, `${date.getDay()}/${date.getMonth()}`] });
               setReboundsPerGame({ ...reboundsPerGame, values: [...values, reboundsPerGame.data.data[gameData]] })
            })

         }
         catch (err) {
            addNotification('error', 'Houve um erro ao buscar os dados do seu time. Por favor, aguarde um momento antes de tentar novamente.');
         }
         finally {
            setIsLoading(false);
            setTeamStats({
               wins: winsGraph,
               pointsDivision,
               pointsPerGame,
               foulsPerGame
            });
         }
      }

      fetchData();
   }, []);

   const pieConfig = {
      data: [
         {
            labels: [
               'Vitórias',
               'Derrotas',
            ],
            datasets: [{
               label: 'Desempenho do time',
               data: winsGraph,
               backgroundColor: [
                  Colors.orange500,
                  Colors.orange300,
               ],
               borderColor: Colors.gray700,
               hoverOffset: 4
            }]
         },
         {
            labels: [
               '3 pontos',
               '2 pontos',
            ],
            datasets: [{
               label: 'Pontos convertidos',
               data: pointsDivision,
               backgroundColor: [
                  Colors.orange500,
                  Colors.orange300,
               ],
               borderColor: Colors.gray700,
               hoverOffset: 4
            }]
         }
      ],
      options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
            legend: {
               position: 'right',
               labels: {
                  color: Colors.orange100,
                  boxWidth: 20,
               }
            },
         },
      }
   }

   const barConfig = {
      data: {
         labels: reboundsPerGame.labels,
         datasets: [
            {
               label: 'Jogador 1',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 1,
               data: reboundsPerGame.values
            }
         ],
      },
      options: {
         indexAxis: 'y',
         elements: {
            bar: {
               borderWidth: 2,
            },
         },
         responsive: true,
         maintainAspectRatio: false,
         scale: {
            x: {
               stacked: true,
               ticks: {
                  beginAtZero: true
               },
               grid: {
                  lineWidth: 0
               }
            },
            y: {
               grid: {
                  lineWidth: 0
               }
            }
         },
         plugins: {
            legend: {
               display: false
            },
            labels: {
               color: Colors.orange100,
               boxWidth: 20,
            },
         },
      }
   }

   const lineConfig = {
      data: {
         labels: foulsPerGame.labels,
         datasets: [
            {
               label: 'Faltas',
               backgroundColor: `${Colors.orange500}65`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: foulsPerGame.values,
               lineTension: .4,
            }
         ],
      },
      options: {
         plugins: {
            legend: {
               display: false
            }
         },
         scales: {
            x: {
               grid: {
                  lineWidth: 0
               }
            },
            y: {
               grid: {
                  lineWidth: 0
               }
            }
         }
      }
   }

   const areaConfig = {
      data: {
         labels: pointsPerGame.labels,
         datasets: [
            {
               //  fill: true,
               label: 'Pontos feitos',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: pointsPerGame.values,
               lineTension: .4,
            }
         ],
      },
      options: {
         plugins: {
            legend: {
               position: 'top',
               labels: {
                  color: Colors.orange100,
                  boxWidth: 20,
               }
            },
         },
         responsive: true,
         maintainAspectRatio: false,
         scales: {
            x: {
               grid: {
                  lineWidth: 0
               },
            },
            y: {
               grid: {
                  lineWidth: 0
               }
            }
         }
      },
   }

   return isLoading
      ? <S.LoaderContainer>
         <Loader />
         <span>Buscando informações <br /> do seu time...</span>
      </S.LoaderContainer>
      : (
         <S.DashGrid>
            <S.Container>
               <Title text='Resultados do time' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {winsGraph.length === 0
                  ? <S.NoContent>Não foram encontrados dados de desempenho do time.</S.NoContent> 
                  : <PieChart data={pieConfig.data[0]} options={pieConfig.options} /> 
                  }
                  
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Pontos por jogo nos últimos jogos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {pointsPerGame.labels.length === 0
                  ? <S.NoContent>Não foram encontrados dados de desempenho do time.</S.NoContent>
                  : <LineChart data={areaConfig.data} options={areaConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Faltas cometidas pelo time' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {foulsPerGame.labels.length === 0
                  ? <S.NoContent>Não foram encontrados dados de desempenho do time.</S.NoContent>
                  : <LineChart data={lineConfig.data} options={lineConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Divisão de pontos convertidos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {pointsDivision.length === 0
                  ? <S.NoContent>Não foram encontrados dados de desempenho do time.</S.NoContent>
                  : <PieChart data={pieConfig.data[1]} options={pieConfig.options} />
                  }                  
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Quantidade de rebotes por partida' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {reboundsPerGame.labels.length === 0
                  ? <S.NoContent>Não foram encontrados dados de desempenho do time.</S.NoContent>
                  : <BarChart data={barConfig.data} options={barConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>
         </S.DashGrid>
      )
}