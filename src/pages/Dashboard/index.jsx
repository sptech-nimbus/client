import * as S from './Dashboard.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";
import Colors from "@utils/Colors";

import { LineChart, PieChart, BarChart } from "@components/Charts";
import Utils from "@utils/Helpers";
import Title from "@components/Title/Title";
import { Line } from 'react-chartjs-2';

export default function Dashboard() {
   const pieConfig = {
      data: [
         {
         labels: [
            'Vitórias',
            'Derrotas',
         ],
         datasets: [{
           label: 'Desempenho do time',
           data: [300, 100],
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
           data: [542, 670],
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
              display: false,
            },
            labels: {
               color: Colors.orange100,
               boxWidth: 20,
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
             fill: true,
             label: 'Pontos feitos',
             backgroundColor: `${Colors.orange500}65`,
             borderColor: `${Colors.orange500}`,
             borderWidth: 3,
             data: [65, 59, 80, 81, 73, 65],
             lineTension: .4,
           },
           {
             fill: true,
             label: 'Pontos sofridos',
             backgroundColor: `${Colors.orange300}65`,
             borderColor: `${Colors.orange300}`,
             borderWidth: 3,
             data: [70, 48, 40, 19, 20, 32],
             lineTension: .4,
           },
         ],
       },
      options: {
         plugins: {
            legend: {
               display: false
            },
            labels: {
               color: Colors.orange100,
               boxWidth: 20,
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

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='dashboard'/>
         <S.ContentContainer>
            <Title text='Dashboard' uppercase/> 
            <S.DashGrid>
               <S.Container>

                  <Title text='Resultados do time' size='1rem' color={Colors.orange100}/>
                  <S.ChartContainer>
                     <PieChart data={pieConfig.data[0]} options={pieConfig.options}/>
                  </S.ChartContainer>
               </S.Container>
                  
               <S.Container>
                  <Title text='Pontos por jogo nos últimos jogos' size='1rem' color={Colors.orange100}/>
                  <S.ChartContainer>
                     <LineChart data={areaConfig.data} options={areaConfig.options}/>
                  </S.ChartContainer>
               </S.Container>

               <S.Container>
                  <Title text='Faltas cometidas pelo time' size='1rem' color={Colors.orange100}/>
                  <S.ChartContainer>
                     <LineChart data={lineConfig.data} options={lineConfig.options}/>
                  </S.ChartContainer>
               </S.Container>
                  
               <S.Container>
                  <Title text='Divisão de pontos convertidos' size='1rem' color={Colors.orange100}/>
                  <S.ChartContainer>
                        <PieChart data={pieConfig.data[1]} options={pieConfig.options}/>
                  </S.ChartContainer>
               </S.Container>

               <S.Container>
                  <S.ChartContainer>   
                     <BarChart data={barConfig.data} options={barConfig.options}/>
                  </S.ChartContainer>
               </S.Container>
            </S.DashGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}