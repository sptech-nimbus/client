import { useEffect, useState } from 'react';
import * as S from './Dashboard.styled';
import { Colors } from "@utils/Helpers";

import { useNotification } from "@contexts/notification";

import Title from "@components/Title/Title";
import Loader from "@components/Loader/Loader";

import { LineChart, PieChart, BarChart } from "@components/Charts";

import graph from '../../api/graph';
import axios from 'axios';

export default function DashboardLayout() {
   const { addNotification } = useNotification();
   const [isLoading, setIsLoading] = useState(false);
   const [winsGraph, setWinsGraph] = useState([]);
   const [pointsDivision, setPointsDivision] = useState([]);
   const [pointsPerGame, setPointsPerGame] = useState({ labels: [], values: [] });
   const [foulsPerGame, setFoulsPerGame] = useState({ labels: [], values: [] });
   const [reboundsPerGame, setReboundsPerGame] = useState({ labels: [], values: [] });

   const fetchWins = async (teamId) => {
      try {
         const response = await graph.getWins(teamId, 100, localStorage.getItem('token'));

         if (response.status === 200) {
            return response.data.data;
         }
      }
      catch (err) {
         console.log('winsGraph: ', err);
         throw err;
      }
   }

   const fetchPointsDivision = async (teamId) => {
      try {
         const response = await graph.getPointsDivision(teamId, 10, localStorage.getItem('token'));
         if (response.status === 200) {
            return response.data.data;
         }
      }
      catch (err) {
         console.log('pointsDivision: ', err);
         throw err;
      }
   }

   function sortObjectByKey(obj) {
      const sortedKeys = Object.keys(obj).sort((a, b) => new Date(a) - new Date(b));
      const sortedObj = {};

      sortedKeys.forEach(key => {
         sortedObj[key] = obj[key];
      });

      return sortedObj;
   }

   const fetchPointsPerGame = async (teamId) => {
      try {
         const response = await graph.getPointsPerGame(teamId, 100, localStorage.getItem('token'));

         if (response.status === 200) {
            return sortObjectByKey(response.data.data);
         }
      }
      catch (err) {
         console.log("pointsPerGame: ", err);
         throw err;
      }
   }

   const fetchFoulsPerGame = async (teamId) => {
      try {
         const response = await graph.foulsPerGame(teamId, 100, localStorage.getItem('token'));

         if (response.status === 200) {
            return sortObjectByKey(response.data.data);
         }
      }
      catch (err) {
         console.log("foulsPerGame: ", err);
         throw err;
      }
   }

   const fetchReboundsPerGame = async (teamId) => {
      try {
         const response = await graph.reboundsPerGame(teamId, 5, localStorage.getItem('token'));

         if (response.status === 200) {
            return response.data.data;
         }
      }
      catch (err) {
         console.log("reboundsPerGame: ", err);
         throw err;
      }
   }

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            const [winsGraphData, pointsDivisionData, pointsPerGameData, foulsPerGameData, reboundsPerGameData] = await Promise.all([
               fetchWins(sessionStorage.getItem('teamId')),
               fetchPointsDivision(sessionStorage.getItem('teamId')),
               fetchPointsPerGame(sessionStorage.getItem('teamId')),
               fetchFoulsPerGame(sessionStorage.getItem('teamId')),
               // fetchReboundsPerGame(sessionStorage.getItem('teamId')),
            ]);

            console.log('pointsPerGameData: ', pointsPerGameData);

            setWinsGraph([winsGraphData.wins, winsGraphData.loses]);
            let mappedDivision = [pointsDivisionData.threePointsPorcentage, pointsDivisionData.twoPointsPorcentage];
            setPointsDivision(mappedDivision);

            Object.keys(pointsPerGameData).forEach(gameDate => {
               const date = new Date(gameDate);
               setPointsPerGame(prevState => ({
                  ...prevState,
                  labels: [...prevState.labels, `${date.getDate()}/${date.getMonth()}`],
                  values: [...prevState.values, pointsPerGameData[gameDate]]
               }));
            });

            Object.keys(foulsPerGameData).forEach(gameDate => {
               const date = new Date(gameDate);
               setFoulsPerGame(prevState => ({
                  ...prevState,
                  labels: [...prevState.labels, `${date.getDate()}/${date.getMonth()}`],
                  values: [...prevState.values, foulsPerGameData[gameDate]]
               }));
            });

            // Object.keys(reboundsPerGameData).forEach(gameDate => {
            //    const date = new Date(gameDate);
            //    setReboundsPerGame(prevState => ({
            //       ...prevState,
            //       labels: [...prevState.labels, `${date.getDate()}/${date.getMonth()}`],
            //       values: [...prevState.values, reboundsPerGameData[gameDate]]
            //    }));
            // });
         }
         catch (err) {
            console.log(err);
            throw err;
         }
         finally {
            setIsLoading(false);
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
                     ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                     : <PieChart data={pieConfig.data[0]} options={pieConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Pontos por jogo nos últimos jogos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {pointsPerGame.labels.length === 0
                     ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                     : <LineChart data={areaConfig.data} options={areaConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Faltas cometidas pelo time' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {foulsPerGame.labels.length === 0
                     ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                     : <LineChart data={lineConfig.data} options={lineConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Divisão de pontos convertidos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {pointsDivision.length === 0
                     ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                     : <PieChart data={pieConfig.data[1]} options={pieConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Quantidade de rebotes por partida' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  {reboundsPerGame.labels.length === 0
                     ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                     : <BarChart data={barConfig.data} options={barConfig.options} />
                  }
               </S.ChartContainer>
            </S.Container>
         </S.DashGrid>
      )
}