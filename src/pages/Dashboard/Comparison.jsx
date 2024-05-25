import { useEffect, useState } from 'react';
import * as S from './Dashboard.styled';
import { Colors } from "@utils/Helpers";

import axios from 'axios';

import { useNotification } from "@contexts/notification";

import Title from "@components/Title/Title";
import Loader from "@components/Loader/Loader";
import { CustomAsyncSelect as Select } from "@components/Select/Select";

import { LineChart, PieChart, BarChart } from "@components/Charts";

export default function ComparisonLayout() {
   const { addNotification } = useNotification();
   const [isLoading, setIsLoading] = useState(false);
   const [options, setOptions] = useState([]);
   const [inputValue, setInputValue] = useState('');

   useEffect(() => {
      async function fetchData() {
         try {
            setIsLoading(true);
            //requisição de mock api utilizada apenas para visualização do loading 
            //substituir pela requisição correta e aplicar os dados nos graficos
            await axios.get('https://6642243c3d66a67b34366411.mockapi.io/nimbus/athlete');
         }
         catch (err) {
            addNotification('error', 'Houve um erro ao buscar os dados do seu time. Por favor, aguarde um momento antes de tentar novamente.');
         }
         finally {
            setIsLoading(false);
         }
      }
      loadOptions('', options => setOptions(options));
      fetchData();
   }, []);

   const loadOptions = async (inputValue, callback) => {
      try {
        const { data } = await axios.get('https://6642243c3d66a67b34366411.mockapi.io/nimbus/teams');
        const options = data.map((team) => ({
          value: team.id,
          label: (
            <S.OptionWithImage>
               <S.OptionImage src={team.picture}/>
               <>{team.name} - {team.category}</>
            </S.OptionWithImage>
         ),
        }));
        callback(options);
      } catch (error) {
         addNotification('error', 'Houve um erro ao buscar os times. Aguarde um momento antes de tentar novamente.');
         console.error('Failed to load options:', error);
      }
    };


    //dados mocados dos gráficos
   const pieConfig = {
      data: [
         {
         labels: [
            'Seu time',
            'Time adversário',
         ],
         datasets: [{
           label: 'Vitórias',
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
            'Seu time',
            'Time adversário',
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
             label: 'Seu time',
             backgroundColor: `${Colors.orange500}`,
             borderColor: `${Colors.orange500}`,
             borderWidth: 1,
             data: [65, 59, 80, 81, 73, 65]
           },
           {
            label: 'Time adversário',
            backgroundColor: `${Colors.orange300}`,
            borderColor: `${Colors.orange300}`,
            borderWidth: 1,
            data: [34, 69, 66, 67, 55, 70]
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
         labels: ['10/12', '12/12', '14/12', '16/12', '18/12'],
         datasets: [
           {
             label: 'Seu time',
             backgroundColor: `${Colors.orange500}`,
             borderColor: `${Colors.orange500}`,
             borderWidth: 3,
             data: [5, 8, 8, 9, 10],
             lineTension: .4,
           },
           {
            label: 'Time adversário',
            backgroundColor: `${Colors.orange300}`,
            borderColor: `${Colors.orange300}`,
            borderWidth: 3,
            data: [ 6, 5, 4, 8, 9],
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
         labels: ['10/12', '12/12', '14/12', '16/12', '18/12', '20/12'],
         datasets: [
           {
            //  fill: true,
             label: 'Seu time',
             backgroundColor: `${Colors.orange500}`,
             borderColor: `${Colors.orange500}`,
             borderWidth: 3,
             data: [65, 59, 80, 51, 73, 65],
             lineTension: .4,
           },
           {
            //  fill: true,
             label: 'Time adversário',
             backgroundColor: `${Colors.orange300}`,
             borderColor: `${Colors.orange300}`,
             borderWidth: 3,
             data: [40, 68, 40, 120, 20, 32],
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

   return isLoading 
      ? <S.LoaderContainer>
         <Loader />
         <span>Buscando informações <br /> do seu time...</span>
      </S.LoaderContainer> 
      : (
      <S.ComparisonGrid>
         <S.SelectContainer>
            <span>Selecione um time para comparar o desempenho:</span>
            <Select
               isSearchable
               cacheOptions
               defaultOptions={options}
               onInputChange={(newValue) => setInputValue(newValue)}
               placeholder='Não há time selecionado no momento...'
               noOptionsMessage={() => "Não há times disponíveis."}
               loadOptions={loadOptions}
            />
         </S.SelectContainer>

         <S.ComparisonContainer>
            <Title text='Vitórias dos times' size='1rem' color={Colors.orange100}/>
            <S.ChartContainer>
               <PieChart data={pieConfig.data[0]} options={pieConfig.options}/>
            </S.ChartContainer>
         </S.ComparisonContainer>
            
         <S.ComparisonContainer>
            <Title text='Pontos por jogo nos últimos jogos' size='1rem' color={Colors.orange100}/>
            <S.ChartContainer>
               <LineChart data={areaConfig.data} options={areaConfig.options}/>
            </S.ChartContainer>
         </S.ComparisonContainer>

         <S.ComparisonContainer>
            <Title text='Faltas cometidas pelos times' size='1rem' color={Colors.orange100}/>
            <S.ChartContainer>
               <LineChart data={lineConfig.data} options={lineConfig.options}/>
            </S.ChartContainer>
         </S.ComparisonContainer>
            
         <S.ComparisonContainer>
            <Title text='Divisão de pontos convertidos' size='1rem' color={Colors.orange100}/>
            <S.ChartContainer>
                  <PieChart data={pieConfig.data[1]} options={pieConfig.options}/>
            </S.ChartContainer>
         </S.ComparisonContainer>

         <S.ComparisonContainer>
            <Title text='Quantidade de tocos por partida' size='1rem' color={Colors.orange100}/>
            <S.ChartContainer>   
               <BarChart data={barConfig.data} options={barConfig.options}/>
            </S.ChartContainer>
         </S.ComparisonContainer>
      </S.ComparisonGrid>
   )
}