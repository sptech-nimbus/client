import { CalcAge } from "@utils/Helpers";
import { Pencil, Trash, Eye } from "@phosphor-icons/react";
import * as S from "./Team.styled.js";

export default function TeamTable({players}) {
   const playerRows = players.map(player => {
      return (
         <tr key={player.firstName + player.lastName}>
            <S.Td><S.PlayerTableImage src={player.picture} alt={`Imagem do jogador ${player.firstName} ${player.lastName}`} /></S.Td>
            <S.Td>{`${player.firstName} ${player.lastName}`}</S.Td>
            <S.Td>{player.position}</S.Td>
            <S.Td>{CalcAge(player.birthDate)}</S.Td>
            <S.Td>{player.number}</S.Td>
            <S.TdActions>
               <S.InfoButton>
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

   return (
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
      </S.TableWrapper>
   );
}