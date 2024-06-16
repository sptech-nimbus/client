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

export default function AthleteDesk({ playerData, adversaryData, isComparison }) {
   const birthDateString = playerData.birthDate
      ? new Date(playerData.birthDate).toLocaleDateString('pt-br')
      : 'Data não disponível';

   return isComparison ? <DeskComparison playerData={playerData} adversaryData={adversaryData} /> : (
      <S.InfoWrapper>
         <S.InfoGrid>
            <S.Container>
               <S.PlayerImg src={playerData.picture} />
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
      </S.InfoWrapper>
   );
}

AthleteDesk.propTypes = {
   playerData: PropTypes.object.isRequired,
   isComparison: PropTypes.bool.isRequired,
   onSubmit: PropTypes.func,
};
