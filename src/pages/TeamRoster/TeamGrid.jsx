import * as S from "./Team.styled";
import Card from "@components/Card/Card";
import { Eye } from "@phosphor-icons/react";

export default function TeamGrid({players}) {
   let playerCards;
   let hasData = false;

   if(players && players.length > 0) {
      hasData = true;
      playerCards =  players.map(player => {
         return (
            <Card width="250px">
            <S.PlayerImage src={player.picture}/>
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
      });
   } 

   return(
      <S.CardsContainer hasData={hasData}>
         {playerCards ?
         playerCards :
         <S.NotFoundMessage>
            Não foram encontrados jogadores.
         </S.NotFoundMessage>
         }
      </S.CardsContainer>
   )
}