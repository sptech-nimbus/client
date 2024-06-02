import * as S from './styled/FinishedMatch.styled';

import Sidebar from '@components/Sidebar/Sidebar';
import Title from '@components/Title/Title';

export default function FinishedMatch({ matchData }) {
   // console.log(matchData);

   return (
      <S.PageContainer>
         <Sidebar page='match' />
         <S.ContentContainer>
            <Title text='Partida finalizda' $uppercase/>
            <S.FinishedMatchGrid>
               <S.Container>
                  <Title text='Times' size='1.2rem'/>
                  <S.TeamsContainer>
                     
                  </S.TeamsContainer>
               </S.Container>

               <S.Container></S.Container>

               <S.Container></S.Container>

               <S.Container></S.Container>
            </S.FinishedMatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}