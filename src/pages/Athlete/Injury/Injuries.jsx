import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import * as S from '../Player.styled.js';
import { InjuryDialog } from './InjuryDialog.jsx';

import Title from "@components/Title/Title";
import { PieChart } from "@components/Charts";
import Loader, { LoaderContainer } from "@components/Loader/Loader";

import axios from 'axios';

import Utils from '@utils/Helpers';
import * as Accordion from '@radix-ui/react-accordion';
import { CaretDown } from '@phosphor-icons/react';
import { ToastContainer } from 'react-toastify';

import injury from "@api/injury";

const calculateSeverity = (inicialDate, finalDate) => {
   const startDate = new Date(inicialDate);
   const endDate = new Date(finalDate);
   const diffTime = Math.abs(endDate - startDate);
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

   if (diffDays <= 7) return 'Leve';
   if (diffDays <= 30) return 'Média';
   return 'Grave';
};

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

function Chart({ data }) {
      const pieConfig = {
      data: {
            labels: [
               'Lesões graves',
               'Lesões médias',
               'Lesões leves',
            ],
            datasets: [{
               label: 'Gravidade das lesões',
               data: data,
               backgroundColor: [
                  Utils.colors.orange500,
                  Utils.colors.orange300,
                  Utils.colors.orange200,
               ],
               borderColor: Utils.colors.gray700,
               hoverOffset: 4
            }]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
            legend: {
               position: 'right',
               labels: {
                  color: Utils.colors.orange100,
                  boxWidth: 20,
               }
            },
         },
      }
   }

   return <PieChart data={pieConfig.data} options={pieConfig.options}/>;
}

export function NoContent() {
   const query = useQuery();
   const playerId = query.get('id');

   return (
      <S.NoInjury>
         <Title text='Não foram encontradas lesões associadas ao atleta.' size='' color={Utils.colors.orange100}/>
         <InjuryDialog playerId={playerId}/>
      </S.NoInjury>
   )
}

export default function AthleteInjuries({ playerData }) { 
   const query = useQuery();
   const playerId = query.get('id');

   const [isLoading, setIsLoading] = useState(false);
   const [allInjuries, setAllInjuries] = useState([]);  
   const [totalDays, setTotalDays] = useState(0);
   const [totalInjuries, setTotalInjuries] = useState(0);
   const [injuriesGraph, setInjuriesGraph] = useState([]);

   useEffect(() => {
      async function fetchData() {
         try {
            setIsLoading(true);
            const response = await axios.get('https://3yyr7.wiremockapi.cloud/injuries');
            setAllInjuries(response.data);
            // const response = await injury.getInjuriesFromAthlete(`?athlete=${playerId}`);
            // setAllInjuries(response.data.data);
         }
         catch(err) {
            console.log(err);
         }
         finally {
            setIsLoading(false);
         }
      }

      fetchData();
   }, []);

   useEffect(() => {
      if (allInjuries.length > 0) {
         const total = allInjuries.reduce((total, injury) => total + Utils.calcDayDiff(injury.initialDate, injury.finalDate), 0);
         
         const severityCounts = allInjuries.reduce((total, injury) => {
            const severity = calculateSeverity(injury.initialDate, injury.finalDate);
            if (severity === 'Grave') {
               total[0] += 1;
            } 
            else if (severity === 'Média') {
               total[1] += 1;
            }
            else if (severity === 'Leve') {
               total[2] += 1;
            } 
            return total;
         }, [ 0, 0, 0 ]);

         setTotalInjuries(allInjuries.length);
         setTotalDays(total);
         setInjuriesGraph(severityCounts);
      }
   }, [allInjuries]);

   useEffect(() => { 
      console.log(injuriesGraph); 
   }, [injuriesGraph]);

   return (
      isLoading 
      ? <LoaderContainer> <Loader /> </LoaderContainer> 
      : allInjuries.length == 0 
      ? <NoContent />
      : (
      <>
         <S.ToastContainer>
            <ToastContainer
               autoClose={8000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               theme="dark"
               limit={3}
            />
         </S.ToastContainer>

         <Title text={`Lesões do jogador: [nome do jogador]`}/>
         <S.InjuryGrid>
            <S.Container>
               <Title text='Infomações gerais' size='1.2rem'/>
                  <S.InjuryDashboard>
                     <S.DashInfo>
                        <span>Lesões totais</span>
                        <span>{totalInjuries}</span>
                     </S.DashInfo>
                     <S.DashInfo>
                        <span>Últimos 6 meses</span>
                        <span>2 lesões</span>
                     </S.DashInfo>
                     <S.DashInfo>
                        <span>Total de dias lesionado</span>
                        <span>{totalDays}</span>
                     </S.DashInfo>
                  </S.InjuryDashboard>
            </S.Container>

            <S.Container>
               <Title text='Divisão da gravidade das lesões do atleta' size='1.2rem'/>
               <S.ChartContainer>
                  <Chart data={injuriesGraph}/>
               </S.ChartContainer>
            </S.Container>

            <S.Container>
               <InjuryDialog playerId={playerId}/>
               <S.InjuryContainer>
                  <Title text='Histório de lesões' size='1.2rem'/>
                  <S.InjuryHist>
                     { allInjuries && allInjuries.map(injury => (
                     <Accordion.Root type='single' collapsible key={injury.injuryId}>
                        <Accordion.Item value={injury.athleteId} asChild>
                           <S.Injury>
                              <Accordion.Trigger asChild>
                                 <S.InjuryContent>
                                    <S.Column>
                                       <span>Tipo</span>
                                       <span>{injury.type}</span>
                                    </S.Column>
                                    <S.Column>
                                       <span>Gravidade</span>
                                       <span>{calculateSeverity(injury.initialDate, injury.finalDate)}</span>
                                    </S.Column>
                                    <S.Arrow>
                                       <CaretDown weight='bold'/>
                                    </S.Arrow>
                                 </S.InjuryContent>
                              </Accordion.Trigger>
                              <Accordion.Content asChild>
                                 <S.InjuryContentHidden>
                                    <S.Column>
                                       <span>Inicio</span>
                                       <span>{Utils.formatDate(injury.initialDate)}</span>
                                    </S.Column>
                  
                                    <S.Column>
                                       <span>Fim</span>
                                       <span>{Utils.formatDate(injury.finalDate)}</span>
                                    </S.Column>
                                 </S.InjuryContentHidden>
                              </Accordion.Content>
                           </S.Injury>
                        </Accordion.Item>
                     </Accordion.Root>
                     )) }
                  </S.InjuryHist>
               </S.InjuryContainer>
            </S.Container>
         </S.InjuryGrid>
      </>
   )
   )
}
 