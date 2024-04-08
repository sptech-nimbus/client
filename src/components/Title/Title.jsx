import * as S from "./Title.styled";

export default function Title({size, color, font, text, uppercase}) {
   return ( 
      <S.Span size={size} color={color} font={font} uppercase={uppercase}>
         {text ? text : "Título"}
      </S.Span>
   )
}