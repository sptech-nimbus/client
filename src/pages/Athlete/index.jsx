import * as S from "./Player.styled";

import AthleteStats from "./AthleteStats";
import AthleteDesk from './AthleteDesk';

import Background from "@components/Background/Background";
import Sidebar from '@components/Sidebar/Sidebar';
import Title from "@components/Title/Title";
import { useState } from "react";
import get from "@api/user";

export default function PlayerInfo() {
    const [deskActive, setDeskActive] = useState(true);
    const [statsActive, setStatsActive] = useState(false);

   const handleStatsActive = (e) => {
      if(deskActive) setDeskActive(!deskActive);
      if(!statsActive) setStatsActive(!statsActive)
   }

   const handleDeskActive = (e) => {
      if(statsActive) setStatsActive(!statsActive);
      if(!deskActive) setDeskActive(!deskActive);
    }

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='team'/>
         <S.ContentContainer>
            <S.TopLinkContainer>
               <S.TopLink active={deskActive} onClick={handleDeskActive}>Ficha do jogador</S.TopLink>
               <S.TopLink active={statsActive} onClick={handleStatsActive}>Estatísticas</S.TopLink>
            </S.TopLinkContainer>
            {deskActive ? 
            <AthleteDesk /> :
            <AthleteStats />}
         </S.ContentContainer>
      </S.PageContainer>
   )
}