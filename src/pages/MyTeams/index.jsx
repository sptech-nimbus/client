/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import * as S from './MyTeams.styled';
import { useNavigate, useLocation } from 'react-router-dom';
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
   const [reqStatus, setReqStatus] = useState();

   const query = useQuery();
   const auto = query.get('auto');
   let isOk = false;

   async function fetchData() {
      if(localStorage.getItem('typeUser') === 'Coach'){
         const response = await team.byUser(localStorage.getItem('personaId'), localStorage.getItem('token'));
         setReqStatus(response.status);
         setCoachTeams(response.data.data);
      } else {
         team.byAthlete(localStorage.getItem('personaId'), localStorage.getItem('token')).
         then(response => {   
            localStorage.setItem('teamId', response.data.data.id)
            if (response.status === 200){
               team.get(localStorage.getItem('teamId'), localStorage.getItem('token')).
               then(r => {
                  console.log(r.data.data)
                  if (r.status === 200) {
                     setReqStatus(r.status);
                     setCoachTeams([r.data.data]);
                     isOk = true;
                  }
               })
            }
         });        
      }
   }
   
   async function teams() {
      if (coachTeams.length === 1 && auto !== 'false' && isOk !== false) {
         chooseTeam(coachTeams[0].id);
         navigate('/home');
      }
   }
   
   useEffect(() => {
      
   }, []);
   
   useEffect(() => {
      fetchData()
      teams()      
      
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

   return (
      <S.Header>
         <Background.Default />
         <S.ContentContainer>
            <S.TeamsContainer $hasTeams={reqStatus === 200}>
               {reqStatus === 200
                  ? coachTeams.map(team => (
                     <S.Team key={team.id} onClick={() => handleTeamSelection(team.id)}>
                        { team.picture ? <S.TeamImage src={team.picture} /> : <S.TemplateImage>{getTeamInitials(team.name)}</S.TemplateImage> }
                        <S.TeamName>{team.name}</S.TeamName>
                     </S.Team>
                  ))
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