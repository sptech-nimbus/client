/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as S from "../Player.styled.js";

import Title from "@components/Title/Title";
import { RadarChart } from '@components/Charts';

import { Colors } from "@utils/Helpers";

export default function DeskComparison({ playerData }) {
   let { birthDate } = playerData;
   birthDate = new Date(birthDate).toLocaleDateString('pt-BR');

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
        layout: {
          padding: 0
        },
        scales: {
          r: {
            grid: {
                color: `${Colors.gray100}65`,
            },
            angleLines: {
                color: `${Colors.gray100}65`,
            }
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        } 
     }
    }

   return (
   <S.ComparisonContainer>
      <S.Container>
         <Title text='Jogador(a) 1' size='1.3rem'/>
         <S.Flex>
            <S.PlayerImgComparison src={playerData.picture}/>
            <S.InfomationContainer>
               <S.Information>
                  <S.Label>Nome: </S.Label>
                  <span title={`${playerData.firstName} ${playerData.lastName}`}>{`${playerData.firstName} ${playerData.lastName}`}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Posição: </S.Label>
                  <span>{playerData.position}</span>
               </S.Information>
            
               <S.Information>
                  <S.Label>Número: </S.Label>
                  <span>{playerData.number}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Idade: </S.Label>
                  <span>{playerData.age}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Altura (cm): </S.Label>
                  <span>{playerData.height}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Peso (kg): </S.Label>
                  <span>{playerData.weight}</span>
               </S.Information>
            </S.InfomationContainer>
         </S.Flex>
         <S.ChartContainer>
            <S.ChartTitle>
               <Title text='Desempenho do jogador' size='1.2rem'/>
            </S.ChartTitle>
            <RadarChart data={radarConfig.data} options={radarConfig.options}/>
         </S.ChartContainer>
      </S.Container>

      {/* jogador 2 */}
      <S.Container>
         <Title text='Jogador(a) 2' size='1.3rem'/>
         <S.Flex>
            <S.PlayerImgComparison src={playerData.picture}/>
            <S.InfomationContainer>
               <S.Information>
                  <S.Label>Nome: </S.Label>
                  <span title={`${playerData.firstName} ${playerData.lastName}`}>{`${playerData.firstName} ${playerData.lastName}`}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Posição: </S.Label>
                  <span>{playerData.position}</span>
               </S.Information>
            
               <S.Information>
                  <S.Label>Número: </S.Label>
                  <span>{playerData.number}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Idade: </S.Label>
                  <span>{playerData.age}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Altura (cm): </S.Label>
                  <span>{playerData.height}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Peso (kg): </S.Label>
                  <span>{playerData.weight}</span>
               </S.Information>
            </S.InfomationContainer>
         </S.Flex>
         <S.ChartContainer>
            <S.ChartTitle>
               <Title text='Desempenho do jogador' size='1.2rem'/>
            </S.ChartTitle>
            <RadarChart data={radarConfig.data} options={radarConfig.options}/>
         </S.ChartContainer>
      </S.Container>

   </S.ComparisonContainer>
)
}