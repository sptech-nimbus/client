import * as S from './Home.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";

import { RadarChart } from '../../components/Charts';

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

               <S.Container>

               </S.Container>

               <S.Container>

               </S.Container>
               
               <S.Container>

               </S.Container>
            </S.HomeGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}