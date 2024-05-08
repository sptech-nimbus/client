import * as S from './Player.styled';
import { useState } from 'react';
import { RadarChart, BarChart } from '../../components/Charts';
import Colors from "@utils/Colors";
import { months } from '@utils/Helpers';
import Title from "@components/Title/Title";
import { Note } from '../../components/Notes/Note';
import { Image } from '@phosphor-icons/react';

export default function Stats() {

  const radarConfig = {
    data: {
      labels: ['Rebotes', 'Pontos', 'Assistências', 'Tocos', 'Roubos de bola', 'Lances livres'],
      datasets: [
        {
          label: '# of Votes',
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
      plugins: {
        legend: {
          position: 'bottom'
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
          position: 'right',
        },
      },
    };

    const data = {
      labels: ['3 pontos', '2 pontos', 'Lances livres', 'Passes'],
      datasets: [
        {
          label: 'Jogador 1',
          backgroundColor: `${Colors.orange500}65`,
          borderColor: `${Colors.orange500}`,
          borderWidth: 1,
          data: [65, 59, 80, 81]
        },
        {
          label: 'Jogador 2',
          backgroundColor: `${Colors.orange300}65`,
          borderColor: `${Colors.orange300}`,
          borderWidth: 1,
          data: [-28, -48, -40, -19],
        },
      ],
    };

    const annotations = [
      {
        title: "Técnica de chute",
        description: "Foco principal será no aprimoramento da técnica de chute, especialmente com a perna esquerda. Serão realizados exercícios específicos visando melhorar a precisão e a potência do chute.",
        time: "2024-05-01"
      },
      {
        title: "Posicionamento tático",
        description: "Será trabalhado o posicionamento tático da equipe durante as jogadas de ataque e defesa. Ênfase especial será dada ao alinhamento defensivo e à movimentação sem bola no ataque.",
        time: "2024-04-15"
      },
      {
        title: "Avaliação física",
        description: "Será realizada uma avaliação física completa para identificar pontos fortes e áreas de melhoria em termos de resistência, força e flexibilidade. Com base nos resultados, será elaborado um plano de treinamento personalizado.",
        time: "2024-04-02"
      },
      {
        title: "Tática defensiva",
        description: "Serão realizados treinos específicos para aprimorar a organização defensiva da equipe, com ênfase na compactação de espaços e na cobertura entre os setores. Será enfatizada também a pressão sobre o portador da bola.",
        time: "2024-03-20"
      },
      {
        title: "Feedback positivo",
        description: "Parabéns pelo excelente desempenho recente! Continue trabalhando duro e mantendo o foco nos treinamentos. Sua dedicação está fazendo a diferença em campo.",
        time: "2024-04-10"
      }
    ];
    
    const notes = annotations.map(note => {
        return <Note note={note} key={`note${note.time.replaceAll('-', '')}`} />
    })
  
   return(
      <S.StatsGrid>
         <S.ContainerStats>
         <S.PlayerImg src="https://placehold.co/400x400"/>
         </S.ContainerStats>

         <S.ContainerStats>
          <S.ChartTitle>
            <Title text='Desempenho do jogador' size='1.2rem'/>
          </S.ChartTitle>
          <S.ChartContainer>
            <RadarChart data={radarConfig.data} options={radarConfig.data}/>
          </S.ChartContainer>
         </S.ContainerStats>

         <S.ContainerStats>
            <Title text='Feedbacks' size='1.2rem'/>
            <S.FeedbackContainer>
              {notes}
            </S.FeedbackContainer>
         </S.ContainerStats>
            
         <S.ContainerStats>
          <Title text='Acertividade do jogador em pontos' size='1.2rem'/>
            <S.ChartContainer>
              <BarChart data={data} options={options}/>
            </S.ChartContainer>
         </S.ContainerStats>
      </S.StatsGrid>
   )
}