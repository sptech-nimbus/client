import * as S from '../Player.styled';
import Severity from './Severity';
import Title from "@components/Title/Title";

export default function InjuryInfo({ injury }) {
   return (
      <>
      <Title text='Informações da lesão' size='1.2rem'/>
      <S.InjuryInfo>
         <S.Flex>
            <S.InfoContainer>
               <span>Gravidade</span>
               <Severity initialDate={injury.initialDate} finalDate={injury.finalDate}/>
            </S.InfoContainer>
            <S.InfoContainer>
               <span>Data inicial</span>
               <span>{injury.initialDate}</span>
            </S.InfoContainer>
            <S.InfoContainer>
               <span>Data final</span>
               <span>{injury.finalDate}</span>
            </S.InfoContainer>
         </S.Flex>
      </S.InjuryInfo>

      <S.Flex>
         <S.InfoContainer>
            <span>Período</span>
            <span>6 meses</span>
         </S.InfoContainer>
      </S.Flex>

      <S.Flex>
         <S.InfoContainer>
            <span>Tipo</span>
            <span>{injury.type}</span>
         </S.InfoContainer>
      </S.Flex>
      </>
   )
}