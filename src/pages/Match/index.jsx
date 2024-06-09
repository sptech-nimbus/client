import styled from "styled-components";

import { useEffect, useState } from "react";
import OnGoingMatch from "./OnGoingMatch/OnGoingMatch";
import FinishedMatch from "./FinishedMatch/FinishedMatch";

import Loader from '@components/Loader/Loader';

import athlete from '@api/athlete';

const LoaderContainer = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`

export default function Match({ isMatchFinished }) {
   const [isLoading, setIsLoading] = useState(false);
   const [allPlayers, setAllPlayers] = useState([]);
   const [matchData, setMatchData] = useState();

   useEffect(() => {
      async function fetchData() {
         try {
            setIsLoading(true);
            // const { data } = await axios.get(`https://6642243c3d66a67b34366411.mockapi.io/nimbus/athletes`);
            const { data } = await athlete.byTeam(
               localStorage.getItem('teamId'),
               localStorage.getItem('token')
            );
            console.log(data.data);
            setAllPlayers(data.data);
         }
         catch(err) {
            console.log(err);
         }
         finally {
            setIsLoading(false);
         }
      }

      fetchData();
   }, []);

   return isLoading ? 
   <LoaderContainer>
      <Loader />
   </LoaderContainer> : isMatchFinished ? 
   <FinishedMatch matchData={matchData}/> : <OnGoingMatch allPlayers={allPlayers} setMatchData={setMatchData}/>
}