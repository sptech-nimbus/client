/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import * as S from "./Team.styled";
import { Colors } from "@utils/Helpers";

import Card from "@components/Card/Card";
import { Pencil, Trash, Eye, Star, Bandaids } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { DeleteDialog, UpdateDialog } from "@components/Dialog/Dialog";

export default function TeamGrid({ players }) {
   console.log(players);
   const navigate = useNavigate();

   const athletes = players.map(player => {
      return { ...player, fullName: `${player.firstName} ${player.lastName}` }
   });

   const isInjuried = (injury) => {
      const today = new Date();
      const inicialDate = new Date(injury.inicialDate);
      const finalDate = new Date(injury.finalDate);

      return today >= inicialDate && today <= finalDate;
   }

   let playerCards;
   let hasData = false;

   if (athletes && athletes.length > 0) {
      hasData = true;
      playerCards = athletes.map(player => {
         const activeInjuries = player.injuries.filter(isInjuried);
         return (
            <Card width="250px" key={player.id}>
               <S.PlayerImage src={player.picture ?? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} />
               <S.PlayerName>
                  {player.fullName}
                  <S.NameIcons>
                     <Star
                        weight={player.isStarting ? 'fill' : 'regular'}
                        color={Colors.orange500}
                     />
                     <Bandaids
                        weight={activeInjuries != 0 ? 'fill' : 'regular'}
                        color={Colors.orange300}
                     />
                  </S.NameIcons>
               </S.PlayerName>
               <S.PlayerLine>
                  <S.PlayerPosition>
                     {player.athleteDesc.position}
                  </S.PlayerPosition>
                  <S.Buttons>
                     <S.ShowInfoButton onClick={() => navigate(`/athlete?id=${player.id}`, localStorage.setItem('personaId', player.id))}>
                        <Eye size={24} weight="bold" />
                     </S.ShowInfoButton>
                     <UpdateDialog athleteInfo={player}
                        trigger={
                           <S.ShowInfoButton style={{ backgroundColor: `${Colors.green}` }}>
                              <Pencil size={26} weight="bold" />
                           </S.ShowInfoButton>
                        }
                     />
                     <DeleteDialog athlete={player}
                        trigger={
                           <S.ShowInfoButton style={{ backgroundColor: `${Colors.red}` }}>
                              <Trash size={26} weight="bold" />
                           </S.ShowInfoButton>
                        }
                     />
                  </S.Buttons>
               </S.PlayerLine>
            </Card>
         )
      });
   }

   return (
      <S.CardsContainer $hasData={hasData}>
         {playerCards ??
            (
               <S.NotFoundContainer>
                  <S.NotFoundMessage>
                     Não foram encontrados jogadores.
                  </S.NotFoundMessage>
                  <span>Seu time não possui jogadores cadastrados ou não conseguimos encontrar eles.</span>
               </S.NotFoundContainer>
            )
         }
      </S.CardsContainer>
   )
}