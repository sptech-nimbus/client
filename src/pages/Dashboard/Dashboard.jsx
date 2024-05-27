import { useEffect, useState } from 'react';
import * as S from './Dashboard.styled';
import { Colors } from "@utils/Helpers";

import { useNotification } from "@contexts/notification";

import Title from "@components/Title/Title";
import Loader from "@components/Loader/Loader";

import { LineChart, PieChart, BarChart } from "@components/Charts";
import graph from '../../api/graph';

export default function DashboardLayout() {
   const { addNotification } = useNotification();
   const [isLoading, setIsLoading] = useState(false);
   const [winsGraph, setWinsGraph] = useState([]);
   const [pointsDivision, setPointsDivision] = useState([]);

   useEffect(() => {
      async function fetchData() {
         try {
            setIsLoading(true);

            const winsRes = await graph.getWins(sessionStorage.getItem('teamId'), 100, localStorage.getItem('token'));

            setWinsGraph([winsRes.data.data.wins, winsRes.data.data.loses]);

            const pointsDivisionRes = await graph.getPointsDivision(sessionStorage.getItem('teamId'), 10, localStorage.getItem('token'));

            setPointsDivision([pointsDivisionRes.data.data.threePointsPorcentage, pointsDivisionRes.data.data.twoPointsPorcentage]);
         }
         catch (err) {
            addNotification('error', 'Houve um erro ao buscar os dados do seu time. Por favor, aguarde um momento antes de tentar novamente.');
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
         labels: ['10/12', '12/12', '14/12', '16/12', '18/12', '20/12'],
         datasets: [
            {
               label: 'Jogador 1',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 1,
               data: [65, 59, 80, 81, 73, 65]
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
         labels: ['10/12', '12/12', '14/12', '16/12', '18/12'],
         datasets: [
            {
               label: 'Jogador 1',
               backgroundColor: `${Colors.orange500}65`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: [5, 8, 8, 9, 10],
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
         labels: ['10/12', '12/12', '14/12', '16/12', '18/12', '20/12'],
         datasets: [
            {
               //  fill: true,
               label: 'Pontos feitos',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: [65, 59, 80, 81, 73, 65],
               lineTension: .4,
            },
            {
               //  fill: true,
               label: 'Pontos sofridos',
               backgroundColor: `${Colors.orange300}`,
               borderColor: `${Colors.orange300}`,
               borderWidth: 3,
               data: [34, 69, 66, 67, 55, 70],
               lineTension: .4,
            },
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
                  <PieChart data={pieConfig.data[0]} options={pieConfig.options} />
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Pontos por jogo nos últimos jogos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <LineChart data={areaConfig.data} options={areaConfig.options} />
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Faltas cometidas pelo time' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <LineChart data={lineConfig.data} options={lineConfig.options} />
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Divisão de pontos convertidos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <PieChart data={pieConfig.data[1]} options={pieConfig.options} />
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <Title text='Quantidade de tocos por partida' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <BarChart data={barConfig.data} options={barConfig.options} />
               </S.ChartContainer>
            </S.Container>
         </S.DashGrid>
      )
}