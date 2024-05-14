import { useEffect } from 'react';
import * as S from './MyTeams.styled';
import { useNavigate } from 'react-router-dom';

import Background from "@components/Background/Background";
import { SecondaryButton as Button } from '@components/Button/Button';

export default function MyTeams() {
   const navigate = useNavigate();
   const coachTeams = [
      {id: 1, name: 'Meu time', picture: 'https://placehold.co/250x250'}, 
      {id: 2, name: 'Meu time', picture: 'https://placehold.co/250x250'},
      {id: 3, name: 'Meu time', picture: 'https://placehold.co/250x250'},
   ];
   
   useEffect(() => {
      if(coachTeams.length == 1) {
         navigate('/home');
      }
   }, []);

   let teamsElements = coachTeams.map(team => (
      <S.Team key={team.id}>
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