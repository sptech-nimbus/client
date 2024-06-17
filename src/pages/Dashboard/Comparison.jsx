import { useEffect, useState } from 'react';
import * as S from './Dashboard.styled';
import { Colors } from "@utils/Helpers";

import { useNotification } from "@contexts/notification";

import Title from "@components/Title/Title";
import Loader from "@components/Loader/Loader";
import Select, { Option } from "@components/Select/Select";

import { LineChart, PieChart, BarChart } from "@components/Charts";

import graph from '@api/graph';
import team from '@api/team';

export default function ComparisonLayout() {
   const { addNotification } = useNotification();

   const [options, setOptions] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [inputValue, setInputValue] = useState('');

   const [winsGraph, setWinsGraph] = useState(0);
   const [pointsDivision, setPointsDivision] = useState(0);
   const [pointsPerGame, setPointsPerGame] = useState({ labels: [], values: [] });
   const [foulsPerGame, setFoulsPerGame] = useState({ labels: [], values: [] });
   const [reboundsPerGame, setReboundsPerGame] = useState({ labels: [], values: [] });

   const [winsGraphAdversary, setWinsGraphAdversary] = useState(0);
   const [pointsDivisionAdversary, setPointsDivisionAdversary] = useState(0);
   const [pointsPerGameAdversary, setPointsPerGameAdversary] = useState({ labels: [], values: [] });
   const [foulsPerGameAdversary, setFoulsPerGamAdversary] = useState({ labels: [], values: [] });
   const [reboundsPerGameAdversary, setReboundsPerGameAdversary] = useState({ labels: [], values: [] });

   const [adversayId, setAdversaryId] = useState();

   async function fetchOptions() {
      const response = await team.getAllTeams(localStorage.getItem('token'));

      if (response.status === 200) {
         const filteredOptions = response.data.data.filter(option => option.id !== sessionStorage.getItem('teamId') && option.id !== '1f0dffe7-7d33-4ea8-896c-ce9696632daa');

         const optionsMap = filteredOptions.map(option => ({
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
         const response = await graph.getPointsDivision(teamId, 100, localStorage.getItem('token'));

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
         const response = await graph.reboundsPerGame(teamId, 100, localStorage.getItem('token'));

         if (response.status === 200) {
            return response.data.data;
         }
      }
      catch (err) {
         console.log("reboundsPerGame: ", err);
         throw err;
      }
   }
   const fetchData = async (teamId, isAdversary) => {
      setIsLoading(true);

      try {
         const [winsGraphData, pointsDivisionData, pointsPerGameData, foulsPerGameData, reboundsPerGameData] = await Promise.all([
            fetchWins(teamId),
            fetchPointsDivision(teamId),
            fetchPointsPerGame(teamId),
            fetchFoulsPerGame(teamId),
            // fetchReboundsPerGame(teamId),
         ]);

         if (isAdversary) {
            setWinsGraphAdversary(winsGraphData.wins);
            let mappedDivision = pointsDivisionData.threePointsPorcentage.toFixed(0);
            setPointsDivisionAdversary(mappedDivision);

            Object.keys(pointsPerGameData).forEach(gameDate => {
               const date = new Date(gameDate);
               setPointsPerGameAdversary(prevState => ({
                  ...prevState,
                  labels: [...prevState.labels, `${date.getDate()}/${date.getMonth()}`],
                  values: [...prevState.values, pointsPerGameData[gameDate]]
               }));
            });

            Object.keys(foulsPerGameData).forEach(gameDate => {
               const date = new Date(gameDate);
               setFoulsPerGamAdversary(prevState => ({
                  ...prevState,
                  labels: [...prevState.labels, `${date.getDate()}/${date.getMonth()}`],
                  values: [...prevState.values, foulsPerGameData[gameDate]]
               }));
            });

            // Object.keys(reboundsPerGameData).forEach(gameDate => {
            //    const date = new Date(gameDate);
            //    setReboundsPerGameAdversary(prevState => ({
            //       ...prevState,
            //       labels: [...prevState.labels, `${date.getDate()}/${date.getMonth()}`],
            //       values: [...prevState.values, reboundsPerGameData[gameDate]]
            //    }));
            // });
         }
         else {
            setWinsGraph(winsGraphData.wins);
            let mappedDivision = pointsDivisionData.threePointsPorcentage.toFixed(0);
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
      }
      catch (err) {
         console.log(err);
         throw err;
      }
      finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      fetchOptions();
      fetchData(sessionStorage.getItem('teamId'), false);
   }, []);

   useEffect(() => {
      fetchData(adversayId, true);
   }, [adversayId]);

   useEffect(() => {
      console.log('wins: ', winsGraphAdversary);
      console.log('division: ', pointsDivisionAdversary);
      console.log('pts per game:', pointsPerGameAdversary);
      console.log('fouls per game: ', foulsPerGameAdversary);
      // console.log('rebounds per game', reboundsPerGameAdversary);
   }, [winsGraphAdversary, pointsDivisionAdversary, pointsPerGameAdversary, foulsPerGameAdversary, reboundsPerGameAdversary]);

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
               data: [winsGraph, winsGraphAdversary],
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
               data: [pointsDivision, pointsDivisionAdversary],
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

   //rebouds
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

   //pontos e faltas
   const lineConfig = {
      data: {
         labels: foulsPerGame.labels,
         datasets: [
            {
               label: 'Seu time',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: foulsPerGame.values,
               lineTension: .4,
            },
            {
               label: 'Time adversário',
               backgroundColor: `${Colors.orange300}`,
               borderColor: `${Colors.orange300}`,
               borderWidth: 3,
               data: foulsPerGameAdversary.values,
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

   //pontos
   const areaConfig = {
      data: {
         labels: pointsPerGame.labels,
         datasets: [
            {
               //  fill: true,
               label: 'Seu time',
               backgroundColor: `${Colors.orange500}`,
               borderColor: `${Colors.orange500}`,
               borderWidth: 3,
               data: pointsPerGame.values,
               lineTension: .4,
            },
            {
               //  fill: true,
               label: 'Time adversário',
               backgroundColor: `${Colors.orange300}`,
               borderColor: `${Colors.orange300}`,
               borderWidth: 3,
               data: pointsPerGameAdversary.values,
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

   return (
      <S.ComparisonGrid>
         <S.SelectContainer>
            <span>Selecione um time para comparar o desempenho:</span>
            <Select
               isSearchable
               cacheOptions
               options={options}
               onInputChange={(newValue) => setInputValue(newValue)}
               placeholder='Selecione um time para comparação...'
               noOptionsMessage={() => "Não há times disponíveis no momento."}
               onChange={(choice) => setAdversaryId(choice.value)}
            />
         </S.SelectContainer>
         {isLoading ?
            <S.LoaderContainer>
               <Loader />
            </S.LoaderContainer>
            : (
               <>
                  <S.ComparisonContainer>
                     <Title text='Vitórias dos times' size='1rem' color={Colors.orange100} />
                     <S.ChartContainer>
                        {winsGraph.length === 0
                           ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                           : <PieChart data={pieConfig.data[0]} options={pieConfig.options} />
                        }
                     </S.ChartContainer>
                  </S.ComparisonContainer>

                  <S.ComparisonContainer>
                     <Title text='Pontos por jogo nos últimos jogos' size='1rem' color={Colors.orange100} />
                     <S.ChartContainer>
                        {pointsPerGame.labels.length === 0
                           ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                           : <LineChart data={areaConfig.data} options={areaConfig.options} />
                        }
                     </S.ChartContainer>
                  </S.ComparisonContainer>

                  <S.ComparisonContainer>
                     <Title text='Faltas cometidas pelos times' size='1rem' color={Colors.orange100} />
                     <S.ChartContainer>
                        {foulsPerGame.labels.length === 0
                           ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                           : <LineChart data={lineConfig.data} options={lineConfig.options} />
                        }
                     </S.ChartContainer>
                  </S.ComparisonContainer>

                  <S.ComparisonContainer>
                     <Title text='Divisão de pontos convertidos' size='1rem' color={Colors.orange100} />
                     <S.ChartContainer>
                        {pointsDivision.length === 0
                           ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                           : <PieChart data={pieConfig.data[1]} options={pieConfig.options} />
                        }
                     </S.ChartContainer>
                  </S.ComparisonContainer>

                  <S.ComparisonContainer>
                     <Title text='Quantidade de rebotes por partida' size='1rem' color={Colors.orange100} />
                     <S.ChartContainer>
                        {reboundsPerGame.labels.length === 0
                           ? <S.NoContent>Não foram encontrados dados para o gráfico em questão</S.NoContent>
                           : <BarChart data={barConfig.data} options={barConfig.options} />
                        }
                     </S.ChartContainer>
                  </S.ComparisonContainer>
               </>
            )
         }
      </S.ComparisonGrid>
   )
}