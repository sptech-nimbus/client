/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import * as S from "../Player.styled.js";
import { calcAge } from "@utils/Helpers";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAuth } from "@contexts/auth";

import Title from "@components/Title/Title";
import { DeleteDialog, UpdateDialog } from "@components/Dialog/Dialog";
import { PrimaryButton as Button } from "@components/Button/Button";

import DeskComparison from './DeskComparison';
import athlete from '@api/athlete';
import { useLocation } from "react-router-dom";

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function AthleteDesk({ playerData, adversaryData, isComparison }) {
   const birthDateString = playerData.birthDate
      ? new Date(playerData.birthDate).toLocaleDateString('pt-br')
      : 'Data não disponível';

   const query = useQuery();
   const starter = query.get('isStarting');
   const playerId = query.get('id');

   const toggleStarter = async () => {
      const changeStarter = starter === 'true' ? false : true;

      const athleteUpdate = {
         firstName: playerData.firstName,
         lastName: playerData.lastName,
         birthDate: playerData.birthDate,
         phone: playerData.phone,
         category: playerData.category,
         isStarting: changeStarter,
         picture: playerData.picture
      }

      try {
         const res = await athlete.put(playerId, athleteUpdate, localStorage.getItem('token'));
         console.log(res);
      }
      catch (err) {
         console.log(err);
      }
   }

   return isComparison ? <DeskComparison playerData={playerData} adversaryData={adversaryData} /> : (
      <S.InfoWrapper>
         <S.InfoGrid>
            <S.Container>
               <S.PlayerImg src={playerData.picture ?? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} />
            </S.Container>

            <S.Container>
               <Title text='Informações do jogador' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>Nome completo:</S.Label>
                     <span>{playerData.firstName} {playerData.lastName}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Número: </S.Label>
                     <span>{playerData.number ?? 'Não definido'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Posição: </S.Label>
                     <span>{playerData.position ?? 'Não definido'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Data de nascimento: </S.Label>
                     <span>{birthDateString}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Idade: </S.Label>
                     <span>{calcAge(playerData.birthDate)}</span>
                  </S.Information>

                  <S.Flex>
                     <S.Information>
                        <S.Label>Altura (m): </S.Label>
                        <span>{playerData.height ?? 'Não definido'}</span>
                     </S.Information>
                     <S.Information>
                        <S.Label>Peso (kg): </S.Label>
                        <span>{playerData.weight ?? 'Não definido'}</span>
                     </S.Information>
                  </S.Flex>

                  <S.Information>
                     <S.Label>Endereço: </S.Label>
                     <span>{playerData.address ?? 'Não definido'}</span>
                  </S.Information>
                  <S.Information>
                     <S.Label>Titular: </S.Label>
                     <span>{starter === 'true' ? 'Sim' : 'Não'}</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Atributos' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>Categoria:</S.Label>
                     <span>{playerData.category ?? 'Não definido.'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Pontos marcados:</S.Label>
                     <span>{playerData.pts} pontos</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Assistências:</S.Label>
                     <span>{playerData.ast} assistências</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Contatos' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>E-mail:</S.Label>
                     <span>{playerData.email ?? 'Não definido.'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Telefone 1:</S.Label>
                     <span>{playerData.phone ?? 'Não definido.'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Telefone 2:</S.Label>
                     <span>{playerData.phone2 ?? 'Não definido.'}</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>
         </S.InfoGrid>
         {localStorage.getItem('type') === 'Athlete' &&
            <S.Buttons>
               <UpdateDialog athleteInfo={playerData} trigger={<Button value='Editar' />} />
            </S.Buttons>
         }
         {localStorage.getItem('type') === 'Coach' &&
            <S.Buttons>
               <DeleteDialog athleteInfo={playerData} trigger={<Button value='Deletar' />} />
               <Button value='Mudar titularidade' $marginTop='0.5rem' onClick={toggleStarter} />
            </S.Buttons>
         }
      </S.InfoWrapper>
   );
}

AthleteDesk.propTypes = {
   playerData: PropTypes.object.isRequired,
   isComparison: PropTypes.bool.isRequired,
   onSubmit: PropTypes.func,
};
