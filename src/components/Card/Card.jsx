import * as S from "./Card.styled";

export default function Card({children, row, justCont, alignItems, gap}) {
   return(
      <S.CardContainer row={row} justCont={justCont} alignItems={alignItems} gap={gap}>
         {children}
      </S.CardContainer>
   )
}