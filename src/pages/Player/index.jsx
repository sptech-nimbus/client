import * as S from "./Player.styled";

import AthleteStats from "./AthleteStats";
import AthleteDesk from './AthleteDesk';

import Background from "@components/Background/Background";
import Sidebar from '@components/Sidebar/Sidebar';
import Title from "@components/Title/Title";

export default function PlayerInfo() {
   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='team'/>
         <S.ContentContainer>
            <AthleteDesk />
         </S.ContentContainer>
      </S.PageContainer>
   )
}