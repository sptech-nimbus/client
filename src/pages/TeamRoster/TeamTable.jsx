/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import * as S from "./Team.styled";
import { Colors, calcAge } from "@utils/Helpers";

import { useNavigate } from "react-router-dom";
import { Pencil, Trash, Eye } from "@phosphor-icons/react";
import { DeleteDialog, UpdateDialog } from "@components/Dialog/Dialog";


export default function TeamTable({ players }) {
   const navigate = useNavigate();
   let playerRows;
   let hasData = false;

   if (players && players.length > 0) {
      playerRows = players.map(player => {
         return (
            <tr key={player.fullName}>
               <S.Td><S.PlayerTableImage src={player.picture} alt={`Imagem do jogador ${player.firstName} ${player.lastName}`} /></S.Td>
               <S.Td>{player.fullName}</S.Td>
               <S.Td>{player.position}</S.Td>
               <S.Td>{`${calcAge(player.birthDate)} anos`}</S.Td>
               <S.Td>{player.number}</S.Td>
               <S.TdActions>
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
               </S.TdActions>
            </tr>
         );
      });
   }

   return (
      <>
         {playerRows ?
            <S.TableWrapper>
               <S.Table>
                  <S.Thead>
                     <tr>
                        <S.ThImg></S.ThImg>
                        <S.Th>Nome</S.Th>
                        <S.Th>Posição</S.Th>
                        <S.Th>Idade</S.Th>
                        <S.Th>Número</S.Th>
                        <S.ThActions></S.ThActions>
                     </tr>
                  </S.Thead>
                  <S.Tbody>
                     {playerRows}
                  </S.Tbody>
               </S.Table>
            </S.TableWrapper> :
            <S.CardsContainer hasData={hasData}>
               <S.NotFoundContainer>
                  <S.NotFoundMessage>
                     Não foram encontrados jogadores.
                  </S.NotFoundMessage>
                  <span>Seu time não possui jogadores cadastrados ou não conseguimos encontrar eles.</span>
               </S.NotFoundContainer>
            </S.CardsContainer>
         }
      </>
   );
}