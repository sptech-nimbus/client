import * as S from './Dashboard.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";

export default function Dashboard() {
   return (
      <S.PageContainer>
         <S.Background />
         <Sidebar page='dashboard' />
         <S.ContentContainer>
            <S.DashGrid>
               <S.Container></S.Container>
               <S.Container></S.Container>
               <S.Container></S.Container>
               <S.Container></S.Container>
               <S.Container></S.Container>
            </S.DashGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}