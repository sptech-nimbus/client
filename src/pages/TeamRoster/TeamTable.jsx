import { useNavigate } from "react-router-dom";
import { calcAge } from "@utils/Helpers";
import { Pencil, Trash, Eye } from "@phosphor-icons/react";
import * as S from "./Team.styled.js";

export default function TeamTable({players}) {
   const navigate = useNavigate();
   let playerRows;
   let hasData = false;

   if(players && players.length > 0) {
      playerRows = players.map(player => {
         return (
            <tr key={player.fullName}>
               <S.Td><S.PlayerTableImage src={player.picture} alt={`Imagem do jogador ${player.firstName} ${player.lastName}`} /></S.Td>
               <S.Td>{player.fullName}</S.Td>
               <S.Td>{player.position}</S.Td>
               <S.Td>{`${calcAge(player.birthDate)} anos`}</S.Td>
               <S.Td>{player.number}</S.Td>
               <S.TdActions>
                  <S.InfoButton onClick={() => navigate('/athlete')}>
                     <Eye />
                  </S.InfoButton>
                  <S.EditButton>
                     <Pencil />
                  </S.EditButton>
                  <S.DeleteButton>
                     <Trash />
                  </S.DeleteButton>
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
            <S.NotFoundMessage>Não foram encontrados jogadores.</S.NotFoundMessage>
         </S.CardsContainer>
         }
      </>
   );
}