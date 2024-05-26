/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import * as S from "./Player.styled";
import { useLocation } from "react-router-dom";

import AthleteStats from "./AthleteStats";
import AthleteDesk from './AthleteDesk';

import Background from "@components/Background/Background";
import Sidebar from '@components/Sidebar/Sidebar';
import Title from "@components/Title/Title";

import { useEffect, useState } from "react";

import axios from 'axios';

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function PlayerInfo() {
   const [deskActive, setDeskActive] = useState(true);
   const [statsActive, setStatsActive] = useState(false);
   const [playerData, setPlayerData] = useState({});
   
   const query = useQuery();
   const playerId = query.get('id');

   useEffect(() => {
      async function fetchData() {
         //requisição de mock api - substituir pela requisição correta ao backend
         // const { data } = await axios.get(`https://6642243c3d66a67b34366411.mockapi.io/nimbus/athlete/${playerId}`);
         // setPlayerData(data);
         // console.log(data);
      }

      fetchData();
   }, [playerId]);
  
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
            <AthleteDesk playerData={playerData}/> :
            <AthleteStats playerData={playerData}/>}
         </S.ContentContainer>
      </S.PageContainer>
   )
}