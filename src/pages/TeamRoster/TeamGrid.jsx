import * as S from "./Team.styled";
import Card from "@components/Card/Card";
import { Eye } from "@phosphor-icons/react";

export default function TeamGrid(players) {
   // const playerCards = players.map(player => {
   //    return 
   // });

   return(
      <>
         <Card width="200px">
            <S.PlayerImage />
            <S.PlayerName>
               Nome do Jogador
            </S.PlayerName>
            <S.PlayerLine>
               <S.PlayerPosition>
                  Posição
               </S.PlayerPosition>
               <S.ShowInfoButton>
                  <Eye size={24} weight="bold"/>
               </S.ShowInfoButton>
            </S.PlayerLine>
         </Card>
      </>
   )
}