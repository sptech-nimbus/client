import * as S from "./Card.styled";

export default function Card({children, row, justCont, alignItems, gap, width, onClick}) {
   return(
      <S.CardContainer 
      row={row} 
      justCont={justCont} 
      alignItems={alignItems} 
      gap={gap} 
      width={width} 
      onClick={onClick}
      >
         {children}
      </S.CardContainer>
   )
}