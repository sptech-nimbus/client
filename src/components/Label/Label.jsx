import * as S from './Label.styled';

export default function Label({text, children, fontSize}) {
   return (
      <S.Label fontSize={fontSize}>
         {text}
         {children}
      </S.Label>
   )
}
