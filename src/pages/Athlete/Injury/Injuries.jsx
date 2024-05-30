import * as S from '../Player.styled.js';

import Title from "@components/Title/Title";
import Severity, { calculateSeverity } from './Severity.jsx';

export default function AthleteInjuries({ playerData }) {   
   return (
      <S.InjuryGrid>
         <S.Container>
            
         </S.Container>

         <S.Container>
            <Title text='Informações da lesão' size='1.2rem'/>
            <S.InjuryInfo>
               <S.Flex>
                  <S.InfoContainer>
                     <span>Gravidade</span>
                     <Severity initialDate="2024-05-29" finalDate="2024-06-05"/>
                  </S.InfoContainer>
                  <S.InfoContainer>
                     <span>Data inicial</span>
                     <span>10.10.24</span>
                  </S.InfoContainer>
                  <S.InfoContainer>
                     <span>Data final</span>
                     <span>10.10.24</span>
                  </S.InfoContainer>
               </S.Flex>
            </S.InjuryInfo>

            <S.Flex>
               <S.InfoContainer>
                  <span>Período</span>
                  <span>6 meses</span>
               </S.InfoContainer>
            </S.Flex>

            <S.Flex>
               <S.InfoContainer>
                  <span>Tipo</span>
                  <span>6 meses</span>
               </S.InfoContainer>
            </S.Flex>
         </S.Container>

         <S.Container>
            <Title text='Histório de lesões' size='1.2rem'/>
            <S.InjuryHist>
               <S.Injury>
                  <S.Column>
                     <span>Gravidade</span>
                     <span>{calculateSeverity("2024-05-29", "2024-06-05")}</span>
                  </S.Column>

                  <S.Column>
                     <span>Inicio</span>
                     <span>10.10.24</span>
                  </S.Column>
                  
                  <S.Column>
                     <span>Fim</span>
                     <span>10.10.24</span>
                  </S.Column>
               </S.Injury>
            </S.InjuryHist>
         </S.Container>
      </S.InjuryGrid>
   )
}