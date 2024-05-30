/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import * as S from "./Player.styled";
import { useLocation, useNavigate } from "react-router-dom";

import AthleteStats from "./Stats/AthleteStats";
import AthleteDesk from './Desk/AthleteDesk';
import AthleteInjuries from "./Injury/Injuries";

import Background from "@components/Background/Background";
import Sidebar from '@components/Sidebar/Sidebar';
import Switch from "@components/Switch/Switch";

import { useEffect, useState } from "react";

import athleteDesc from "@api/athleteDesc";

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function PlayerInfo() {
   const navigate = useNavigate();

   const [deskActive, setDeskActive] = useState(true);
   const [statsActive, setStatsActive] = useState(false);
   const [injuryActive, setInjuryActive] = useState(false);
   const [playerData, setPlayerData] = useState({});
   const [isComparison, setIsComparison] = useState(false);

   const query = useQuery();
   const playerId = query.get('id');
   const adversaryId = query.get('adversayId');

   useEffect(() => {
      async function fetchData() {
         const { data } = await athleteDesc.allInfo(playerId, localStorage.getItem('token'));
         
         setPlayerData(data.data);
      }

      fetchData();
   }, [playerId]);

   const handleVizualitionMode = () => setIsComparison(!isComparison);

   const handleStatsActive = (e) => {
      if (deskActive) setDeskActive(false);
      if (injuryActive) setInjuryActive(false);
      setStatsActive(true);
   }

   const handleDeskActive = (e) => {
      if (statsActive) setStatsActive(false);
      if (injuryActive) setInjuryActive(false);
      setDeskActive(true);
   }

   const handleInjuryActive = (e) => {
      if (deskActive) setDeskActive(false);
      if (statsActive) setStatsActive(false);
      setInjuryActive(true);
   }

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='team' />
         <S.ContentContainer>
            <S.TopLinkContainer>
               <S.Back size={30} weight="bold" onClick={() => navigate('/roster')}/>
               <S.TopLink active={deskActive} onClick={handleDeskActive}>Ficha do jogador</S.TopLink>
               <S.TopLink active={statsActive} onClick={handleStatsActive}>Estatísticas</S.TopLink>
               <S.TopLink active={injuryActive} onClick={handleInjuryActive}>Lesões</S.TopLink>
               <S.TopLink>
                  <Switch label='Comparação de jogadores' id='switch_comparacao' onCheckedChange={handleVizualitionMode} checked={isComparison}/>
               </S.TopLink>
            </S.TopLinkContainer>
            { deskActive && <AthleteDesk playerData={playerData} isComparison={isComparison}/> }
            { statsActive && <AthleteStats playerData={playerData} isComparison={isComparison}/> }
            { injuryActive && <AthleteInjuries playerData={playerData} /> }
         </S.ContentContainer>
      </S.PageContainer>
   )
}