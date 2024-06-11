import styled from "styled-components";

import { useEffect, useState } from "react";
import OnGoingMatch from "./OnGoingMatch/OnGoingMatch";
import FinishedMatch from "./FinishedMatch/FinishedMatch";

import Loader from '@components/Loader/Loader';

import athlete from '@api/athlete';
import game from '@api/game';
import team from '@api/team';

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

   const fetchPlayers = async () => {
      try {
         setIsLoading(true);
         const response = await athlete.byTeam(
            sessionStorage.getItem('teamId'),
            localStorage.getItem('token')
         );

         if(response.status === 200) {
            setAllPlayers(response.data.data);
         }
      }
      catch(err) {
         console.log(err);
      }
   }

   const fetchGames = async () => {
      try {
         const response = await game.getByTeam(
            sessionStorage.getItem('teamId'),
            localStorage.getItem('token')
         );

         if(response.status === 200) {
            return response.data.data;
         }
      }
      catch(err) {
         console.log(err);
      }
   }

   const fetchTeam = async (teamId) => {
      try {
         const response = await team.get(
            teamId,
            localStorage.getItem('token')
         )

         return response;
      }
      catch(err) {
         console.log(err);
      }
   }
   
   useEffect(() => {
      const fetchData = async () => {
         await fetchPlayers();
         const games = await fetchGames();
         
         const gamesToday = games.filter(game => {
            const today = new Date().toLocaleDateString('pt-br');
            const initialDate = new Date(game.inicialDateTime).toLocaleDateString('pt-br');

            return today === initialDate && game.confirmed == true;
         });

         console.log(gamesToday);

         // const challengerId = gamesToday[0].challenger;
         // const challengedId = gamesToday[0].challenged;

         // const challenger = await fetchTeam(challengerId);
         // const challenged = await fetchTeam(challengedId);

         // console.log(challenger);
         // console.log(challenged);

         setIsLoading(false);
      }

      fetchData()
   }, []);

   return isLoading ? 
   <LoaderContainer>
      <Loader />
   </LoaderContainer> : isMatchFinished ? 
   <FinishedMatch/> : <OnGoingMatch allPlayers={allPlayers}/>
}