import styled from "styled-components";

import { useEffect, useState } from "react";
import OnGoingMatch from "./OnGoingMatch/OnGoingMatch";
import FinishedMatch from "./FinishedMatch/FinishedMatch";
import NoMatch from "./NoMatch/NoMatch";

import Loader from '@components/Loader/Loader';

import athlete from '@api/athlete';
import game from '@api/game';
import team from '@api/team';

import Utils from '@utils/Helpers';

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
   const [challenger, setChallenger] = useState({});
   const [challenged, setChallenged] = useState({});
   const [isChallenger, setIsChallenger] = useState(false);

   const fetchPlayers = async () => {
      try {
         setIsLoading(true);
         const response = await athlete.byTeam(
            sessionStorage.getItem('teamId'),
            localStorage.getItem('token')
         );

         if (response.status === 200) {
            setAllPlayers(response.data.data);
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   const fetchGames = async () => {
      try {
         const response = await game.getByTeam(
            sessionStorage.getItem('teamId'),
            localStorage.getItem('token')
         );

         if (response.status === 200) {
            return response.data.data;
         }
      }
      catch (err) {
         console.log(err);
      }
   }

   const [gamesToday, setGamesToday] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         await fetchPlayers();
         const games = await fetchGames();
         console.log('------------------------------');
         console.log('games', games);
         console.log('------------------------------');

         const gamesTodayFilter = games.filter(game => {
            const today = new Date().toLocaleDateString('pt-br');
            const initialDate = new Date(game.inicialDateTime).toLocaleDateString('pt-br');

            return (today === initialDate) && game.confirmed && !game.gameResult;
            // return game.confirmed && !game.gameResult;
         });
         console.log(gamesTodayFilter);
         setGamesToday(gamesTodayFilter);

         if (gamesTodayFilter.length > 0) {
            const challengerRes = await team.get(gamesTodayFilter[0].challenger, localStorage.getItem('token'));
            const challengedRes = await team.get(gamesTodayFilter[0].challenged, localStorage.getItem('token'));

            if (gamesTodayFilter[0].challenger === sessionStorage.getItem('teamId')) {
               setIsChallenger(true);
            }

            setChallenged({ ...challengedRes.data.data, initials: Utils.getTeamInitials(challengedRes.data.data.name) });
            setChallenger({ ...challengerRes.data.data, initials: Utils.getTeamInitials(challengerRes.data.data.name) });
         }

         setIsLoading(false);
      }

      fetchData()
   }, []);

   console.log('é challenger?', isChallenger);

   return isLoading ? (
      <LoaderContainer>
         <Loader />
      </LoaderContainer>
   ) : isMatchFinished ? (
      <FinishedMatch isChallenger={isChallenger} />
   ) : gamesToday.length > 0 ? (
      <OnGoingMatch
         teams={{ challenger, challenged }}
         gameId={gamesToday[0] ? gamesToday[0].id : null}
         allPlayers={allPlayers}
      />
   ) : <NoMatch />
}