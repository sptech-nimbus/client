import * as S from "./Card.styled";

export default function Card({children, row, justCont, alignItems, gap, width}) {
   return(
      <S.CardContainer row={row} justCont={justCont} alignItems={alignItems} gap={gap} width={width}>
         {children}
      </S.CardContainer>
   )
}