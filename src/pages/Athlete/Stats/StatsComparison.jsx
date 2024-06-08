import * as S from "../Player.styled.js";

import Title from "@components/Title/Title";
import { RadarChart, BarChart } from '@components/Charts';

import { Colors } from "@utils/Helpers";

export default function StatsComparison({ playerData }) {

   const radarConfig = {
      data: {
        labels: ['Rebotes', 'Pontos', 'Assistências', 'Tocos', 'Roubos de bola', 'Lances livres'],
        datasets: [
          {
            label: 'Desempenho do jogador',
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
              display: false,
              labels: {
                 color: Colors.orange100,
                 boxWidth: 20,
                 font: {
                    size: 18,
                    family: 'Poppins'
                 }
              },
           }
        }
     }
    }

    const options = {
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
          }
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    const playerStats = {
      labels: ['3 pontos', '2 pontos', 'Lances livres', 'Passes'],
      datasets: [
        {
          label: 'Jogador 1',
          backgroundColor: `${Colors.orange500}65`,
          borderColor: `${Colors.orange500}`,
          borderWidth: 1,
          data: [65, 59, 80, 81]
        },
      ],
    };

    const adversaryStats = {
      labels: ['3 pontos', '2 pontos', 'Lances livres', 'Passes'],
      datasets: [
        {
          label: 'Jogador 1',
          backgroundColor: `${Colors.orange500}65`,
          borderColor: `${Colors.orange500}`,
          borderWidth: 1,
          data: [65, 59, 80, 81]
        },
      ],
    };

   return (
   <S.StatsComparisonContainer>
      <S.Container>
         <Title text={`Desempenho do jogador ${playerData.name}`} size='1.2rem'/>
         <S.ChartContainer>
            <RadarChart data={radarConfig.data} options={radarConfig.options}/>
         </S.ChartContainer>

         <S.ChartContainer>
            <BarChart data={playerStats} options={options}/>
         </S.ChartContainer>
      </S.Container>

      {/* jogador 2 */}
      <S.Container>
         <Title text='Desempenho do jogador' size='1.2rem'/>
         <S.ChartContainer>
            <RadarChart data={radarConfig.data} options={radarConfig.options}/>
         </S.ChartContainer>

         <S.ChartContainer>
            <BarChart data={adversaryStats} options={options}/>
         </S.ChartContainer>
      </S.Container>

   </S.StatsComparisonContainer>
)
}