import { useEffect, useState } from 'react';
import * as S from './MyTeams.styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth';

import Background from "@components/Background/Background";
import { SecondaryButton as Button } from '@components/Button/Button';

import axios from 'axios';

export default function MyTeams() {
   const navigate = useNavigate();
   const { chooseTeam, teamId } = useAuth();
   const [coachTeams, setCoachTeams] = useState([]);

   useEffect(() => {
      async function fetchData() {
         //requisição de mock api - substituir pela requisição correta ao backend
         const { data } = await axios.get('https://6642243c3d66a67b34366411.mockapi.io/nimbus/teams');
         console.log(data);
         setCoachTeams(data);
      }
      fetchData();
   }, []);
   
   useEffect(() => {
      if(coachTeams.length == 1) {
         chooseTeam(coachTeams[0].id);
         navigate('/home');
      }
   }, [coachTeams]);

   const handleTeamSelection = (teamId) => {
      chooseTeam(teamId);
      if(teamId) {
         navigate('/home'); 
      }
   }

   let teamsElements = coachTeams.map(team => (
      <S.Team key={team.id} onClick={() => handleTeamSelection(team.id)}>
         <S.TeamImage src={team.picture}/>
         <S.TeamName>{team.name}</S.TeamName>
      </S.Team>
   ));

   return (
      <S.Header>
         <Background.Default />
         <S.ContentContainer>
            <S.TeamsContainer hasTeams={teamsElements.length == 0 ? false : true}>
               {teamsElements.length != 0 
                  ? teamsElements
                  : (
                     <>
                        <S.NoTeams>Não há times cadastrados.</S.NoTeams>
                        <S.NoTeamsDescription>Cadastre um time e peça para seus jogadores se associarem a ele para desfrutar do nosso sistema!</S.NoTeamsDescription>
                     </>
                  )
               }
            </S.TeamsContainer>
            <Button
               value='Adicionar novo time'
               width='200px'
               onClick={() => navigate('/register/team')}
            />
         </S.ContentContainer>
      </S.Header>
   )
}