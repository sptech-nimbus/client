import * as S from './Label.styled';

export default function Label({text, children, fontSize, ...props}) {
   return (
      <S.Label fontSize={fontSize} {...props}>
         {text}
         {children}
      </S.Label>
   )
}
