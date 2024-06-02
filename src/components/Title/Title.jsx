import * as S from "./Title.styled";

export default function Title({size, color, font, text, weight, uppercase, ...props}) {
   return ( 
      <S.Span 
      size={size} 
      color={color} 
      font={font} 
      $uppercase={uppercase ? 1 : 0} 
      weight={weight} 
      {...props}>
         {text ?? "Título"}
      </S.Span>
   )
}