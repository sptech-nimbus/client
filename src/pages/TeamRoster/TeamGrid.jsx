import * as S from "./Team.styled";
import Card from "@components/Card/Card";
import { Eye } from "@phosphor-icons/react";

export default function TeamGrid({players}) {
   const playerCards =  players.map(player => {
      return (
         <Card width="250px">
         <S.PlayerImage />
         <S.PlayerName>
            {`${player.firstName} ${player.lastName}`}
         </S.PlayerName>
         <S.PlayerLine>
            <S.PlayerPosition>
               {player.position}
            </S.PlayerPosition>
            <S.ShowInfoButton>
               <Eye size={24} weight="bold"/>
            </S.ShowInfoButton>
         </S.PlayerLine>
      </Card>
      )
   }) 

   return(
      <S.CardsContainer>
         {playerCards}
      </S.CardsContainer>
   )
}