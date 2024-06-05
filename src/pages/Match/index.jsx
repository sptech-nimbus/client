import { useEffect, useState } from "react";
import OnGoingMatch from "./OnGoingMatch/OnGoingMatch";
import FinishedMatch from "./FinishedMatch/FinishedMatch";

import Loader, { LoaderContainer } from '@components/Loader/Loader';

import axios from "axios";
import athlete from '@api/athlete';

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

   return isLoading ? <Loader /> : isMatchFinished ? <FinishedMatch matchData={matchData}/> : <OnGoingMatch allPlayers={allPlayers} setMatchData={setMatchData}/>
}