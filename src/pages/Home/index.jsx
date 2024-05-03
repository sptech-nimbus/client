import * as S from './Home.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";

import { RadarChart, DoughnutChart } from '../../components/Charts';
import Results from './Result';
import Title from '@components/Title/Title';

import Colors from "@utils/Colors";

export default function Home() {
   const radarConfig = {
      data: {
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
          {
            label: '# of Votes',
            data: [2, 9, 3, 5, 2, 3],
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

   const doughnutConfig = {
      data: {
         labels: ['Vitórias', 'Derrotas'],
         datasets: [
           {
             label: '# of Votes',
             data: [12, 12],
             backgroundColor: [
               `${Colors.orange500}`,
               `${Colors.orange300}`,
             ],
             borderColor: [
               Colors.orange500,
               Colors.orange300,
   
             ],
             borderWidth: 1,
           },
         ],
      },
      options: {
         circumference: 180,
         rotation: -90,
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
            legend: {
               position: 'right',
            },
         },
      }
   }

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='home'/>
         <S.ContentContainer>
            <S.HomeGrid>
               <S.Container>
                  <S.ChartContainer>
                     <RadarChart data={radarConfig.data} options={radarConfig.options}/>
                  </S.ChartContainer>
               </S.Container>

               <S.MatchContainer>
                  <S.MatchCard>
                     <S.MatchHeader>
                        <span>Partida anterior</span>
                     </S.MatchHeader>
                     <S.MatchTeams>
                        <S.MatchTeamLogo />
                        <span>VS</span>
                        <S.MatchTeamLogo />
                     </S.MatchTeams>
                     <S.MatchInfo>
                        <span>Meu time</span>
                        <span>Time adversário</span>
                     </S.MatchInfo>
                     <S.MatchResults>
                        <span>65</span>
                        <Results result='lose'/>
                        <span>85</span>
                     </S.MatchResults>
                  </S.MatchCard>
                  <S.MatchCard>
                     <S.MatchHeader>
                        <span>Próxima partida</span>
                     </S.MatchHeader>
                     <S.MatchTeams>
                        <S.MatchTeamLogo />
                        <span>VS</span>
                        <S.MatchTeamLogo />
                     </S.MatchTeams>
                     <S.MatchInfo>
                        <span>Meu time</span>
                        <span>Time adversário</span>
                     </S.MatchInfo>
                     <S.MatchResults>
                        <span>25.04.2024</span>
                        <span>16:30</span>
                     </S.MatchResults>
                  </S.MatchCard>
               </S.MatchContainer>

               <S.Container>
                  
               </S.Container>
               
               <S.Container>
                  <S.ChartContainer>
                     <DoughnutChart data={doughnutConfig.data} options={doughnutConfig.options} />
                  </S.ChartContainer>
               </S.Container>
            </S.HomeGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}