import * as S from '../Player.styled';
import { RadarChart, BarChart } from '@components/Charts';
import { Colors } from "@utils/Helpers";
import { useLocation } from "react-router-dom";
import Title from "@components/Title/Title";
import { Note } from '../../../components/Notes/Note';

import athleteHistoric from '../../../api/athleteHistoric';

import StatsComparison from './StatsComparison';
import { useEffect, useState } from 'react';

export default function Stats({ playerData, isComparison }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const athleteId = query.get('id');

  const [historics, setHistorics] = useState([]);
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
    const calcAvg = (a, c) => {
      return a + c;
    }

    const setAverages = historics => {
      setAvgs({
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

    const setObservations = historics => {
      console.log(historics);
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

      setHistorics(response.data.data);

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
    console.log(note);
    return note ? <Note note={note} key={note.id} /> : ''
  })

  return isComparison ? <StatsComparison playerData={playerData} /> : (
    <S.StatsGrid>
      <S.ContainerStats>
        <S.PlayerImg src={playerData.picture} />
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