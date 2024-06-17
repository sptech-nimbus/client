import * as S from "../Player.styled.js";
import { useEffect, useState } from "react";

import Title from "@components/Title/Title";
import { RadarChart, BarChart } from '@components/Charts';
import Loader, { LoaderContainer } from '@components/Loader/Loader';

import { Colors } from "@utils/Helpers";

import athleteHistoric from "@api/athleteHistoric.js";

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
    console.log('data: ', adversaryData);
    const setAverages = historics => {
      let sums = {
        offRebounds: 0,
        defRebounds: 0,
        blocks: 0,
        fouls: 0,
        turnovers: 0,
        minutes: 0,
        assists: 0,
        freeThrowConverted: 0,
        freeThrowAttempted: 0,
        steals: 0,
        threePointsConverted: 0,
        threePointsAttempted: 0,
        twoPointsConverted: 0,
        twoPointsAttempted: 0
      };

      historics.forEach(h => {
        Object.keys(h).forEach(k => {
          sums[k] += Number(h[k]);
        })
      });

      setAdversaryAvgs({
        points: (sums.freeThrowConverted + sums.twoPointsConverted + sums.threePointsConverted) / historics.length,
        assists: sums.assists / historics.length,
        steals: sums.steals / historics.length,
        freeThrows: sums.freeThrowConverted / historics.length,
        twoPoints: sums.twoPointsConverted / historics.length,
        threePoints: sums.threePointsConverted / historics.length,
        rebounds: (sums.defRebounds + sums.offRebounds) / historics.length,
        blocks: sums.blocks / historics.length
      });
    }

    const fetchData = async () => {
      const response = await athleteHistoric.get(adversaryData.id, localStorage.getItem('token'));
      setAverages(response.data.data);
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
        <Title text={`Desempenho do jogador(a) ${playerData.firstName} ${playerData.lastName}`} size='1.2rem' />
        <S.ChartContainer>
          <RadarChart data={radarConfig.data} options={radarConfig.options} />
        </S.ChartContainer>

        <S.ChartContainer>
          <BarChart data={playerStats} options={options} />
        </S.ChartContainer>
      </S.Container>

      {/* jogador 2 */}

      <S.Container>
        {!adversaryData ?
          <LoaderContainer>
            <Loader />
          </LoaderContainer> :
          <>
            <Title text={`Desempenho do jogador(a) ${adversaryData.firstName} ${adversaryData.lastName}`} size='1.2rem' />
            <S.ChartContainer>
              <RadarChart data={radarConfig.adversaryData} options={radarConfig.options} />
            </S.ChartContainer>

            <S.ChartContainer>
              <BarChart data={adversaryStats} options={options} />
            </S.ChartContainer>
          </>
        }
      </S.Container>

    </S.StatsComparisonContainer>
  )
}