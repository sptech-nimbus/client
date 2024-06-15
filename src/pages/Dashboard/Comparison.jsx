import { useEffect, useState } from 'react';
import * as S from './Dashboard.styled';
import { Colors } from "@utils/Helpers";

import { useNotification } from "@contexts/notification";

import Title from "@components/Title/Title";
import Loader from "@components/Loader/Loader";
import Select from "@components/Select/Select";

import { LineChart, PieChart, BarChart } from "@components/Charts";

import graph from '@api/graph';
import { TextAlignJustify } from '@phosphor-icons/react';

export default function ComparisonLayout() {
   const { addNotification } = useNotification();

   const [options, setOptions] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [inputValue, setInputValue] = useState('');

   const [winsGraph, setWinsGraph] = useState([]);
   const [pointsDivision, setPointsDivision] = useState([]);
   const [pointsPerGame, setPointsPerGame] = useState({ labels: [], values: [] });
   const [foulsPerGame, setFoulsPerGame] = useState({ labels: [], values: [] });
   const [reboundsPerGame, setReboundsPerGame] = useState({ labels: [], values: [] });

   async function fetchOptions() {
      const response = await team.getAllTeams(localStorage.getItem('token'));

      if (response.status === 200) {
         const optionsMap = response.data.data.map(option => ({
            value: option.id,
            label: <Option option={option} />,
         }));
         setOptions(optionsMap);
      }
   }

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

   const fetchPointsPerGame = async (teamId) => {
      try {
         const response = await graph.getPointsPerGame(teamId, 6, localStorage.getItem('token'));

         if (response.status === 200) {
            return response.data.data;
         }
      }
      catch (err) {
         console.log("pointsPerGame: ", err);
         throw err;
      }
   }

   const fetchFoulsPerGame = async (teamId) => {
      try {
         const response = await graph.foulsPerGame(teamId, 5, localStorage.getItem('token'));

         if (response.status === 200) {
            return response.data.data;
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
         try {
            const [winsGraphData, pointsDivisionData, pointsPerGameData, foulsPerGameData, reboundsPerGameData] = await Promise.all([
               fetchWins(sessionStorage.getItem('teamId')),
               fetchPointsDivision(sessionStorage.getItem('teamId')),
               fetchPointsPerGame(sessionStorage.getItem('teamId')),
               fetchFoulsPerGame(sessionStorage.getItem('teamId')),
               // fetchReboundsPerGame(sessionStorage.getItem('teamId')),
            ]);

            setWinsGraph([winsGraphData.wins, winsGraphData.loses]);
            let mappedDivision = [pointsDivisionData.threePointsPorcentage, pointsDivisionData.twoPointsPorcentage];
            mappedDivision = mappedDivision.map(value => Number(value.toFixed(0)));
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
      }

      fetchData();
   }, []);

   useEffect(() => {
      console.log('wins: ', winsGraph);
      console.log('pointsDivision: ', pointsDivision);
      console.log('pointsPerGame: ', pointsPerGame);
      console.log('foulsPerGame: ', foulsPerGame);
      //console.log('reboundsPerGame: ', reboundsPerGame);
   }, [winsGraph, pointsDivision, pointsPerGame, foulsPerGame, reboundsPerGame]);

   //configurações de gráficos
   const pieConfig = {
      data: [
         {
            labels: [
               'Seu time',
               'Time adversário',
            ],
            datasets: [{
               label: 'Vitórias',
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
               'Seu time',
               'Time adversário',
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
         labels: [],
         datasets: [
            {
               label: 'Seu time',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 1,
               data: []
            },
            {
               label: 'Time adversário',
               backgroundColor: `${Colors.orange300}`,
               borderColor: `${Colors.orange300}`,
               borderWidth: 1,
               data: []
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
               ticks: {
                  beginAtZero: true
               }
            },
         },
         plugins: {
            legend: {
               position: 'top',
               labels: {
                  color: Colors.orange100,
                  boxWidth: 20,
               }
            },
         },
      }
   }

   const lineConfig = {
      data: {
         labels: [],
         datasets: [
            {
               label: 'Seu time',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: [],
               lineTension: .4,
            },
            {
               label: 'Time adversário',
               backgroundColor: `${Colors.orange300}`,
               borderColor: `${Colors.orange300}`,
               borderWidth: 3,
               data: [],
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
         labels: [],
         datasets: [
            {
               //  fill: true,
               label: 'Seu time',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: [],
               lineTension: .4,
            },
            {
               //  fill: true,
               label: 'Time adversário',
               backgroundColor: `${Colors.orange300}`,
               borderColor: `${Colors.orange300}`,
               borderWidth: 3,
               data: [],
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

   return isLoading ?
      <S.LoaderContainer>
         <Loader />
         <span>Buscando informações <br /> dteamStats.o seu time...</span>
      </S.LoaderContainer>
      : (
         <S.ComparisonGrid>
            <S.SelectContainer>
               <span>Selecione um time para comparar o desempenho:</span>
               <Select
                  isSearchable
                  cacheOptions
                  options={options}
                  onInputChange={(newValue) => setInputValue(newValue)}
                  placeholder='Selecione um time para desafiar...'
                  noOptionsMessage={() => "Não há times disponíveis no momento."}
               />
            </S.SelectContainer>

            <S.ComparisonContainer>
               <Title text='Vitórias dos times' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <PieChart data={pieConfig.data[0]} options={pieConfig.options} />
               </S.ChartContainer>
            </S.ComparisonContainer>

            <S.ComparisonContainer>
               <Title text='Pontos por jogo nos últimos jogos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <LineChart data={areaConfig.data} options={areaConfig.options} />
               </S.ChartContainer>
            </S.ComparisonContainer>

            <S.ComparisonContainer>
               <Title text='Faltas cometidas pelos times' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <LineChart data={lineConfig.data} options={lineConfig.options} />
               </S.ChartContainer>
            </S.ComparisonContainer>

            <S.ComparisonContainer>
               <Title text='Divisão de pontos convertidos' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <PieChart data={pieConfig.data[1]} options={pieConfig.options} />
               </S.ChartContainer>
            </S.ComparisonContainer>

            <S.ComparisonContainer>
               <Title text='Quantidade de rebotes por partida' size='1rem' color={Colors.orange100} />
               <S.ChartContainer>
                  <BarChart data={barConfig.data} options={barConfig.options} />
               </S.ChartContainer>
            </S.ComparisonContainer>
         </S.ComparisonGrid>
      )
}