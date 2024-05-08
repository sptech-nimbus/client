import * as S from "./Team.styled";
import Card from "@components/Card/Card";
import { Pencil, Trash, Eye } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function TeamGrid({players}) {
   const navigate = useNavigate();

   let playerCards;
   let hasData = false;

   if(players && players.length > 0) {
      hasData = true;
      playerCards =  players.map(player => {
         return (
            <Card width="250px" key={player.fullName} onClick={() => navigate('/athlete')}>
            <S.PlayerImage src={player.picture}/>
            <S.PlayerName>
               {player.fullName}
            </S.PlayerName>
            <S.PlayerLine>
               <S.PlayerPosition>
                  {player.position}
               </S.PlayerPosition>
               <S.Buttons>
                  <S.ShowInfoButton>
                     <Eye size={24} weight="bold"/>
                  </S.ShowInfoButton>
                  <S.ShowInfoButton>
                     <Pencil size={24} weight="bold"/>
                  </S.ShowInfoButton>
                  <S.ShowInfoButton>
                     <Trash size={24} weight="bold"/>
                  </S.ShowInfoButton>
               </S.Buttons>
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