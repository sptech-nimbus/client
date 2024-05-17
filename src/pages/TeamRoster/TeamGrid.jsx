import * as S from "./Team.styled";
import Card from "@components/Card/Card";
import { Pencil, Trash, Eye } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Dialog } from '@components/Dialog';

export default function TeamGrid({ players }) {
   const navigate = useNavigate();
   
   const athletes = players.map(player => {
      return { ...player, fullName: `${player.firstName} ${player.lastName}` }
   })

   let playerCards;
   let hasData = false;

   if(athletes && athletes.length > 0) {
      hasData = true;
      playerCards =  athletes.map(player => {
         return (
            <Card width="250px" key={player.fullName}>
            <S.PlayerImage src={player.picture}/>
            <S.PlayerName>
               {player.fullName}
            </S.PlayerName>
            <S.PlayerLine>
               <S.PlayerPosition>
                  {player.position}
               </S.PlayerPosition>
               <S.Buttons>
                  <S.ShowInfoButton onClick={() => navigate('/athlete')}>
                     <Eye size={24} weight="bold"/>
                  </S.ShowInfoButton>
                  <S.ShowInfoButton>
                     <Pencil size={24} weight="bold"/>
                         </S.ShowInfoButton>
                         <DeleteDialog trigger />
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