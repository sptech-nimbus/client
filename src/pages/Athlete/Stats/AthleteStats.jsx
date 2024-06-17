import * as S from '../Player.styled';
import { RadarChart, BarChart } from '@components/Charts';
import { Colors } from "@utils/Helpers";
import { useLocation } from "react-router-dom";
import Title from "@components/Title/Title";
import { Note } from '../../../components/Notes/Note';

import athleteHistoric from '../../../api/athleteHistoric';

import StatsComparison from './StatsComparison';
import { useEffect, useState } from 'react';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export default function Stats({ playerData, adversaryData, isComparison }) {
  const query = useQuery();
  const athleteId = query.get('id');

  const [avgs, setAvgs] = useState({
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

      setAvgs({
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

    const setObservations = historics => {
      setAnnotations(historics.map(h => {
        if (h.observations) {
          return {
            description: h.observations,
            title: h.observations.slice(0, 8) + '...',
            id: h.id
          }
        }
      }));
    }

    const fetchData = async () => {
      const response = await athleteHistoric.get(athleteId, localStorage.getItem('token'));

      setAverages(response.data.data);

      setObservations(response.data.data);
    }

    fetchData();
  }, [athleteId])

  const radarConfig = {
    data: {
      labels: ['Rebotes', 'Pontos', 'Assistências', 'Tocos', 'Roubos de bola', 'Lances livres'],
      datasets: [
        {
          label: 'Desempenho',
          data: [avgs.rebounds, avgs.points, avgs.assists, avgs.blocks, avgs.steals, avgs.freeThrows],
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
          labels: {
            color: Colors.orange100,
            boxWidth: 20,
            font: {
              size: 18,
              family: 'Poppins'
            }
          },
          position: 'right'
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
        display: false,
      },
    },
  };

  const data = {
    labels: ['3 pontos', '2 pontos', 'Lances livres', 'Assistências'],
    datasets: [
      {
        label: 'Jogador 1',
        backgroundColor: `${Colors.orange500}65`,
        borderColor: `${Colors.orange500}`,
        borderWidth: 1,
        data: [avgs.threePoints, avgs.twoPoints, avgs.freeThrows, avgs.assists]
      }
    ],
  };

  const [annotations, setAnnotations] = useState([]);

  const notes = annotations.map(note => {
    return note ? <Note note={note} key={note.id} /> : ''
  })

  return isComparison ? <StatsComparison playerData={playerData} playerAvgs={avgs} adversaryData={adversaryData} /> : (
    <S.StatsGrid>
      <S.ContainerStats>
        <S.PlayerImg src={playerData.picture ?? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} />
      </S.ContainerStats>

      <S.ContainerStats>
        <S.ChartTitle>
          <Title text='Desempenho do jogador' size='1.2rem' />
        </S.ChartTitle>
        <S.ChartContainer>
          <RadarChart data={radarConfig.data} options={radarConfig.options} />
        </S.ChartContainer>
      </S.ContainerStats>

      <S.ContainerStats>
        <Title text='Feedbacks' size='1.2rem' />
        <S.FeedbackContainer>
          {notes}
        </S.FeedbackContainer>
      </S.ContainerStats>

      <S.ContainerStats>
        <Title text='Acertividade do jogador em pontos' size='1.2rem' />
        <S.ChartContainer>
          <BarChart data={data} options={options} />
        </S.ChartContainer>
      </S.ContainerStats>
    </S.StatsGrid>
  )
}