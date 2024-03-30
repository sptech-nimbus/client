import * as S from './Label.styled';

export default function Label({text, children}) {
   return (
      <S.Label>
         {text}
         {children}
      </S.Label>
   )
}
