import Sidebar from "@components/Sidebar/Sidebar";
import * as S from "./Team.styled"

export default function TeamRoster() {
   return(
      <S.MainContainer>
         <Sidebar page='team'/>
      </S.MainContainer>
   )
}