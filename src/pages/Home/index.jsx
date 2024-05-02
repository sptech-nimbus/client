import * as S from './Home.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";

export default function Home() {
   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='home'/>
         <S.ContentContainer>
            <S.HomeGrid>
               <S.Container>

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