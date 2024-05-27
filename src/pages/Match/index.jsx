import * as S from './Match.styled';
import { useState } from 'react';

import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";

export default function RegisterStats() {
   const [challenger, setChallenger] = useState({ 
      name: 'Nome challenger',
      picture: 'https://i.pinimg.com/originals/64/3b/db/643bdb48540f70aed4c55ce2e3cee473.png',
      pts: 132
   });
   const [challenged, setChallenged] = useState({ 
      name: 'Nome challenged',
      picture: 'https://1000logos.net/wp-content/uploads/2017/12/Los-Angeles-Clippers-Logo.png',
      pts: 120 
   });

   return (
      <S.PageContainer>
         <Sidebar page='match'/>
         <S.ContentContainer>
            <Title text='Partida em andamento' uppercase/>
            <S.MatchGrid>
               <S.Container>
                  <S.TitleContainer>
                     <Title text='Times' size='1.2rem'/>
                  </S.TitleContainer>
                  <S.TeamsContainer>
                     <S.Team>
                        <S.TeamImage src={challenger.picture} isWinning={challenger.pts > challenged.pts}/>
                        <S.TeamName>{challenger.name}</S.TeamName>
                     </S.Team>
                     <S.Versus>VS</S.Versus>
                     <S.Team>
                        <S.TeamImage src={challenged.picture} isWinning={challenged.pts > challenger.pts}/>
                        <S.TeamName>{challenged.name}</S.TeamName>
                     </S.Team>
                  </S.TeamsContainer>
               </S.Container>

               <S.Container>
                  <S.OnGoingPts>
                     <S.Pts isWinning={challenger.pts > challenged.pts}>{challenger.pts}</S.Pts>
                     <S.Versus>X</S.Versus>
                     <S.Pts isWinning={challenged.pts > challenger.pts}>{challenged.pts}</S.Pts>
                  </S.OnGoingPts>
                  <S.TitleContainer>
                     <Title text='Estatísticas do seu time' size='1.2rem'/>
                  </S.TitleContainer>
                  <S.StatsContainer>
                     <S.Flex>
                        <span><S.StatsLabel>Rebotes ofensivos:</S.StatsLabel> 5</span>
                        <span><S.StatsLabel>Rebotes defensivos:</S.StatsLabel> 7</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Tocos:</S.StatsLabel> 3</span>
                        <span><S.StatsLabel>Roubos:</S.StatsLabel> 4</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Faltas:</S.StatsLabel> 4</span>
                        <span><S.StatsLabel>Turnovers:</S.StatsLabel> 2</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Assistências:</S.StatsLabel> 6</span>
                        <span><S.StatsLabel>Lances livres:</S.StatsLabel> 8/10</span>
                     </S.Flex>
                     <S.Flex>
                        <span><S.StatsLabel>Arremessos de 3 pontos:</S.StatsLabel> 3/7</span>
                        <span><S.StatsLabel>Arremessos de 2 pontos:</S.StatsLabel> 3/7</span>
                     </S.Flex>
                  </S.StatsContainer>
               </S.Container>

               <S.Container>
                  <Title text='Jogadores do seu time' size='1.2rem'/>
                  <S.AthletesList>
                     <S.Athlete>
                        <S.AthleteInfo>
                           <S.AthleteImage />

                           <S.Column>
                              <S.AthleteName>Nome do jogador</S.AthleteName>
                              <S.isPlaying isPlaying>Jogando</S.isPlaying>
                           </S.Column>
                        </S.AthleteInfo>

                        <S.AddPoints>
                           <S.AddButton>+1</S.AddButton>
                           <S.AddButton>+2</S.AddButton>
                           <S.AddButton>+3</S.AddButton>
                        </S.AddPoints>
                     </S.Athlete>
                  </S.AthletesList>
               </S.Container>
            </S.MatchGrid>
         </S.ContentContainer>
      </S.PageContainer>
   )
}