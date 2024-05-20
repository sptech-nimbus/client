import * as S from './NotFound.styled';

import Background from "@components/Background/Background";
import Title from "@components/Title/Title";
import { Colors } from "@utils/Helpers";

export default function NotFound() {
   return (
      <S.Wrapper>
         <Background.Default />
         <Title text='404' size='15rem'/>
         <Title text='Nenhuma página foi encontrada.' color={Colors.orange100}/>
      </S.Wrapper>
   )
}