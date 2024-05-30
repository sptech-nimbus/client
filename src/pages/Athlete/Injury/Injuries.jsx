import { useState, useEffect } from 'react';
import * as S from '../Player.styled.js';

import Title from "@components/Title/Title";
import { calculateSeverity } from './Severity.jsx';

import InjuryInfo from './InjuryInfo.jsx';
import axios from 'axios';

export default function AthleteInjuries({ playerData }) { 
   const [allInjuries, setAllInjuries] = useState();  
   const [injury, setInjury] = useState();

   useEffect(() => {
      async function fetchData() {
         const response = await axios.get('https://3yyr7.wiremockapi.cloud/injuries');
         const { data } = response;
         setAllInjuries(data);
      }

      fetchData();
   }, []);
   return (
      <>
         <Title text='Lesões de [Nome do jogador]'/>
         <S.InjuryGrid>
            <S.Container>
               <Title text='Infomações gerais' size='1.2rem'/>
                  <S.InjuryDashboard>
                     <S.DashInfo>
                        <span>Lesões totais</span>
                        <span>12 lesões</span>
                     </S.DashInfo>
                     <S.DashInfo>
                        <span>Lesões nos últimos 6 meses</span>
                        <span>2 lesões</span>
                     </S.DashInfo>
                     <S.DashInfo>
                        <span>Total de dias lesionado</span>
                        <span>230 dias</span>
                     </S.DashInfo>
                  </S.InjuryDashboard>
            </S.Container>

            <S.Container>
               { injury ? <InjuryInfo injury={injury}/> : <S.NoInjury>Não há lesões selecionadas. Escolha uma lesão ao lado para visualizar suas informações.</S.NoInjury>}
            </S.Container>

            <S.Container>
               <Title text='Histório de lesões' size='1.2rem'/>
               <S.InjuryHist>
                  { allInjuries && allInjuries.map(injury => (
                  <S.Injury>
                     <S.Column>
                        <span>Gravidade</span>
                        <span>{calculateSeverity(injury.initialDate, injury.finalDate)}</span>
                     </S.Column>

                     <S.Column>
                        <span>Inicio</span>
                        <span>{injury.initialDate}</span>
                     </S.Column>
                     
                     <S.Column>
                        <span>Fim</span>
                        <span>{injury.finalDate}</span>
                     </S.Column>
                  </S.Injury>
                  )) }
               </S.InjuryHist>
            </S.Container>
         </S.InjuryGrid>
      </>
   )
}
 