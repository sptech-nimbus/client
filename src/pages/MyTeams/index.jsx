/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import * as S from './MyTeams.styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/auth';

import Background from "@components/Background/Background";
import { SecondaryButton as Button } from '@components/Button/Button';

import team from '../../api/team';

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function MyTeams() {
   const navigate = useNavigate();
   const { chooseTeam } = useAuth();
   const [coachTeams, setCoachTeams] = useState([]);

   const query = useQuery();
   const auto = query.get('auto');

   async function fetchData() {
      const { data } = await team.getAllTeams(localStorage.getItem('token'));
      setCoachTeams(data.data);
   }
   useEffect(() => {
      fetchData()
   }, [])

   useEffect(() => {
      if (coachTeams.length === 1 && auto !== 'false') {
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

   const getTeamInitials = (name) => {
      const nameArray = name.split(' ');
      let initials = '';

      nameArray.forEach(element => initials += element[0]);

      return initials;
   }

   const teamsElements = coachTeams.map(team => (
      <S.Team key={team.id} onClick={() => handleTeamSelection(team.id)}>
         { team.picture ? <S.TeamImage src={team.picture} /> : <S.TemplateImage>{getTeamInitials(team.name)}</S.TemplateImage> }
         <S.TeamName>{team.name}</S.TeamName>
      </S.Team>
   ));

   return (
      <S.Header>
         <Background.Default />
         <S.ContentContainer>
            <S.TeamsContainer $hasTeams={teamsElements.length == 0}>
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