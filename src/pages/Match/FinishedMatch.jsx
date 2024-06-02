import * as S from './styled/Match.styled';
import Sidebar from '@components/Sidebar/Sidebar';

export default function FinishedMatch({ matchData }) {
   console.log(matchData);

   return (
      <S.PageContainer>
         <Sidebar page='match' />
         <S.ContentContainer>
            
         </S.ContentContainer>
      </S.PageContainer>
   )
}