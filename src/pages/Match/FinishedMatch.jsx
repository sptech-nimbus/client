import * as S from './Match.styled';
import Sidebar from '@components/Sidebar/Sidebar';

export default function FinishedMatch({ matchData }) {
   console.log(matchData);
   
   return (
      <S.PageContainer>
         <Sidebar page='match' />
      </S.PageContainer>
   )
}