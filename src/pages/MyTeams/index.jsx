/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import * as S from './MyTeams.styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth';

import Background from "@components/Background/Background";
import { SecondaryButton as Button } from '@components/Button/Button';

import team from '../../api/team';

export default function MyTeams() {
   const navigate = useNavigate();
   const { chooseTeam } = useAuth();
   const [coachTeams, setCoachTeams] = useState([]);

   async function fetchData() {
      const { data } = await team.getAllTeams(localStorage.getItem('token'));
      console.log(data)
      setCoachTeams(data.data);
   }
   fetchData();
   
   console.log(coachTeams)
   
   useEffect(() => {
      if (coachTeams.length === 1) {
         chooseTeam(coachTeams[0].id);
         localStorage.setItem('teamId',coachTeams[0].id);
         navigate('/home');
      }
   }, [coachTeams]);

   const handleTeamSelection = (teamId) => {
      chooseTeam(teamId);
      if (teamId) {
         navigate('/home');
      }
   };

   const teamsElements = coachTeams.map(team => (
      <S.Team key={team.id} onClick={() => handleTeamSelection(team.id)}>
         <S.TeamImage src={team.picture} />
         <S.TeamName>{team.name}</S.TeamName>
      </S.Team>
   ));

   return (
      <S.Header>
         <Background.Default />
         <S.ContentContainer>
            <S.TeamsContainer hasTeams={teamsElements.length == 0}>
               {teamsElements.length !== 0
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
   );
}