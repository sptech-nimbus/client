import * as S from "../Player.styled.js";
import { useEffect, useState } from "react";

import Title from "@components/Title/Title";
import { RadarChart, BarChart } from '@components/Charts';
import Loader, { LoaderContainer } from '@components/Loader/Loader';

import { Colors } from "@utils/Helpers";

export default function StatsComparison({ playerData, playerAvgs, adversaryData }) {
    const [adversaryAvgs, setAdversaryAvgs] = useState({
      points: 0,
      assists: 0,
      steals: 0,
      freeThrows: 0,
      twoPoints: 0,
      threePoints: 0,
      rebounds: 0,
      blocks: 0
    });

    useEffect(() => {
        const calcAvg = (a, c) => a + c;

        const setAverages = historics => {
          setAdversaryAvgs({
              assists: historics.reduce((a, c) => calcAvg(a.assists, c.assists)) / historics.length,
              freeThrows: historics.reduce((a, c) => calcAvg(a.freeThrowConverted, c.freeThrowConverted)) / historics.length,
              points: (historics.reduce((a, c) => calcAvg(a.twoPointsConverted, c.twoPointsConverted)) + historics.reduce((a, c) => calcAvg(a.threePointsConverted, c.threePointsConverted))) / historics.length,
              steals: historics.reduce((a, c) => calcAvg(a.steals, c.steals)) / historics.length,
              threePoints: historics.reduce((a, c) => calcAvg(a.threePointsConverted, c.threePointsConverted)),
              twoPoints: historics.reduce((a, c) => calcAvg(a.twoPointsConverted, c.twoPointsConverted)),
              rebounds: (historics.reduce((a, c) => calcAvg(a.offRebounds, c.offRebounds)) + historics.reduce((a, c) => calcAvg(a.defRebounds, c.defRebounds))) / historics.length,
              blocks: historics.reduce((a, c) => calcAvg(a.blocks, c.blocks)),
              
          });
        }

        const fetchData = async () => {
          const { data: { data } } = await athleteHistoric.get(adversaryData.id, localStorage.getItem('token'));
          setAverages(data);
        }

        fetchData();
    }, [adversaryData]);

   const radarConfig = {
      data: {
        labels: ['Rebotes', 'Pontos', 'Assistências', 'Tocos', 'Roubos de bola', 'Lances livres'],
        datasets: [
          {
            label: 'Desempenho do jogador',
            data: [playerAvgs.rebounds, playerAvgs.points, playerAvgs.assists, playerAvgs.blocks, playerAvgs.steals, playerAvgs.freeThrows],
            backgroundColor: `${Colors.orange500}65`,
            borderColor: Colors.orange500,
            borderWidth: 1,
          },
        ],
      },
      adversaryData: {
        labels: ['Rebotes', 'Pontos', 'Assistências', 'Tocos', 'Roubos de bola', 'Lances livres'],
        datasets: [
          {
            label: 'Desempenho do jogador',
            data: [adversaryAvgs.rebounds, adversaryAvgs.points, adversaryAvgs.assists, adversaryAvgs.blocks, adversaryAvgs.steals, adversaryAvgs.freeThrows],
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
          data: [playerAvgs.threePoints, playerAvgs.twoPoints, playerAvgs.freeThrows, playerAvgs.assists]
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
          data: [adversaryAvgs.threePoints, adversaryAvgs.twoPoints, adversaryAvgs.freeThrows, adversaryAvgs.assists]
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
        {!adversaryData ?
        <LoaderContainer>
          <Loader />
        </LoaderContainer> :
        <>  
          <Title text='Desempenho do jogador' size='1.2rem'/>
          <S.ChartContainer>
              <RadarChart data={radarConfig.adversaryData} options={radarConfig.options}/>
          </S.ChartContainer>

          <S.ChartContainer>
              <BarChart data={adversaryStats} options={options}/>
          </S.ChartContainer>
        </>
        }
      </S.Container>

   </S.StatsComparisonContainer>
)
}