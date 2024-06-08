/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as S from "../Player.styled.js";
import { useEffect, useState } from "react";

import Title from "@components/Title/Title";
import { RadarChart } from '@components/Charts';
import Loader, { LoaderContainer } from "@components/Loader/Loader";

import { Colors } from "@utils/Helpers";

import { useLocation } from "react-router-dom";

import athleteHistoric from "@api/athleteHistoric.js";

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function DeskComparison({ playerData, adversaryData }) {
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

      const fetchData = async () => {
      const { data: { data } } = await athleteHistoric.get(athleteId, localStorage.getItem('token'));

      setAverages(data);
      }
      fetchData();
   }, [athleteId])

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
   }, [adversaryData])

   let { birthDate } = playerData;
   birthDate = new Date(birthDate).toLocaleDateString('pt-BR');

   // --------- chart configuration ---------
   const radarConfig = {
      data: {
        labels: ['Rebotes', 'Pontos', 'Assistências', 'Tocos', 'Roubos de bola', 'Lances livres'],
        datasets: [
          {
            label: 'Desempenho do jogador',
            data: [avgs.rebounds, avgs.points, avgs.assists, avgs.blocks, avgs.steals, avgs.freeThrows],
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
         {!adversaryData ? 
         <LoaderContainer>
            <Loader />
         </LoaderContainer> : 
         <>
         <Title text='Jogador(a) 2' size='1.3rem'/>
         <S.Flex>
            <S.PlayerImgComparison src={adversaryData.picture}/>
            <S.InfomationContainer>
               <S.Information>
                  <S.Label>Nome: </S.Label>
                  <span title={`${adversaryData.firstName} ${adversaryData.lastName}`}>{`${adversaryData.firstName} ${adversaryData.lastName}`}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Posição: </S.Label>
                  <span>{adversaryData.position}</span>
               </S.Information>
            
               <S.Information>
                  <S.Label>Número: </S.Label>
                  <span>{adversaryData.number}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Idade: </S.Label>
                  <span>{adversaryData.age}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Altura (cm): </S.Label>
                  <span>{adversaryData.height}</span>
               </S.Information>

               <S.Information>
                  <S.Label>Peso (kg): </S.Label>
                  <span>{adversaryData.weight}</span>
               </S.Information>
            </S.InfomationContainer>
         </S.Flex>
         <S.ChartContainer>
            <S.ChartTitle>
               <Title text='Desempenho do jogador' size='1.2rem'/>
            </S.ChartTitle>
            <RadarChart data={radarConfig.adversaryData} options={radarConfig.options}/>
         </S.ChartContainer>
         </>
         }
      </S.Container>

   </S.ComparisonContainer>
)
}