/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import * as S from './MyTeams.styled';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth';

import Background from "@components/Background/Background";
import { SecondaryButton as Button } from '@components/Button/Button';

import team from '@api/team';

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function MyTeams() {
   const navigate = useNavigate();
   const { chooseTeam } = useAuth();
   const [coachTeams, setCoachTeams] = useState([]);
   const [athleteTeam, setAthleteTeam] = useState({});
   const [reqStatus, setReqStatus] = useState();

   const query = useQuery();
   const auto = query.get('auto');

   async function fetchData() {
      if (localStorage.getItem('type') == 'Coach') {
         const response = await team.byUser(localStorage.getItem('personaId'), localStorage.getItem('token'));
         setReqStatus(response.status);
         setCoachTeams(response.data.data);
      }
      else {
         const response = await team.byAthlete(localStorage.getItem('personaId'), localStorage.getItem('token'));
         setReqStatus(response.status);
         setAthleteTeam(response.data.data);
         sessionStorage.setItem('teamId', response.data.data.id);
      }
   }

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      console.log('athleteTeam', athleteTeam);
      if (localStorage.getItem('type') === "Coach") {
         if (coachTeams.length === 1 && auto !== 'false') {
            chooseTeam(coachTeams[0].id);
            sessionStorage.setItem('teamId', coachTeams[0].id);
         }
      }
      else {
         chooseTeam(athleteTeam.id);
      }
   }, [coachTeams, athleteTeam]);

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
   console.log(localStorage.type);
   return (
      <S.Header>
         <Background.Default />
         <S.ContentContainer>
            <S.TeamsContainer $hasTeams={reqStatus === 200}>
               {
                  reqStatus === 200 && localStorage.getItem('type') === 'Coach'
                     ? coachTeams.map(team => (
                        <S.Team key={team.id} onClick={() => handleTeamSelection(team.id)}>
                           {team.picture ? <S.TeamImage src={team.picture} /> : <S.TemplateImage>{getTeamInitials(team.name)}</S.TemplateImage>}
                           <S.TeamName>{team.name}</S.TeamName>
                        </S.Team>
                     ))
                     : reqStatus === 200 && localStorage.getItem('type') === 'Athlete'
                        ? (
                           <S.Team key={athleteTeam.id} onClick={() => handleTeamSelection(athleteTeam.id)}>
                              {athleteTeam.picture ? <S.TeamImage src={athleteTeam.picture} /> : <S.TemplateImage>{getTeamInitials(athleteTeam.name)}</S.TemplateImage>}
                              <S.TeamName>{athleteTeam.name}</S.TeamName>
                           </S.Team>
                        ) : (
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