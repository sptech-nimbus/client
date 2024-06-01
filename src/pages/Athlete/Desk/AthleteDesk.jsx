/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import * as S from "../Player.styled.js";
import { Colors, calcAge } from "@utils/Helpers";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import { useAuth } from "@contexts/auth";

import Title from "@components/Title/Title";
import { DeleteDialog, UpdateDialog } from "@components/Dialog/Dialog";
import { PrimaryButton as Button } from "@components/Button/Button";
import athleteDesc from "@api/athleteDesc";
import DeskComparison from './DeskComparison';

export default function AthleteDesk({ playerData, isComparison }) {
   const { token } = useAuth();
   const [id, setId] = useState(localStorage.getItem('id'))
   const [persona, setPersona] = useState({});
   const [hasFetchedData, setHasFetchedData] = useState(false);

   useEffect(() => {
      async function fetchData() {
         if (id && token && !hasFetchedData) {
            try {
               const response = await athleteDesc.allInfo(id, token);

               setPersona(response.data.data);
               setHasFetchedData(true);
            } catch (error) {
               console.error('Erro ao buscar os dados do atleta:', error);
            }
         }
      }
      fetchData();
   }, [id, token, hasFetchedData]);

   const birthDateString = persona.birthDate 
   ? new Date(persona.birthDate).toLocaleDateString('pt-br') 
   : 'Data não disponível';

   return isComparison ? <DeskComparison playerData={playerData}/> : (
      <S.InfoWrapper>
         <S.InfoGrid>
            <S.Container>
               <S.PlayerImg src={persona.picture} />
            </S.Container>
            
            <S.Container>
               <Title text='Informações do jogador' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>Nome completo:</S.Label>
                     <span>{persona.firstName} {persona.lastName}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Número: </S.Label>
                     <span>{persona.number ?? 'Não definido'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Posição: </S.Label>
                     <span>{persona.position ?? 'Não definido'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Data de nascimento: </S.Label>
                     <span>{birthDateString}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Idade: </S.Label>
                     <span>{calcAge(persona.birthDate)}</span>
                  </S.Information>

                  <S.Flex>
                     <S.Information>
                        <S.Label>Altura (cm): </S.Label>
                        <span>{persona.height ?? 'Não definido'}</span>
                     </S.Information>
                     <S.Information>
                        <S.Label>Peso (kg): </S.Label>
                        <span>{persona.weight ?? 'Não definido'}</span>
                     </S.Information>
                  </S.Flex>

                  <S.Information>
                     <S.Label>Endereço: </S.Label>
                     <span>{persona.address ?? 'Não definido'}</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Atributos' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>Categoria:</S.Label>
                     <span>{persona.category ?? 'Não definido.'}</span>
                  </S.Information>
                  
                  <S.Information>
                     <S.Label>Pontos marcados:</S.Label>
                     <span>{persona.pts} pontos</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Assistências:</S.Label>
                     <span>{persona.ast} assistências</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Contatos' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>E-mail:</S.Label>
                     <span>{persona.email ?? 'Não definido.'}</span>
                  </S.Information>
                  
                  <S.Information>
                     <S.Label>Telefone 1:</S.Label>
                     <span>{persona.phone ?? 'Não definido.'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Telefone 2:</S.Label>
                     <span>{persona.phone2 ?? 'Não definido.'}</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>
         </S.InfoGrid>
         <S.Buttons>
            <UpdateDialog athlete={persona} trigger={<Button value='Editar'/>} />
            <DeleteDialog athlete={persona} trigger={<Button value='Deletar' />} />
            <Button value='Baixar PDF' />
         </S.Buttons>
      </S.InfoWrapper>
   );
}

AthleteDesk.propTypes = {
   playerData: PropTypes.object.isRequired,
   isComparison: PropTypes.bool.isRequired,
   onSubmit: PropTypes.func,
};
