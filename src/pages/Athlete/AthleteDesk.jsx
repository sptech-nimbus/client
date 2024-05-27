/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import * as S from "./Player.styled";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO, differenceInYears } from 'date-fns';

import Title from "@components/Title/Title";
import { DeleteDialog } from "@components/Dialog/Dialog";
import { PrimaryButton as Button } from "@components/Button/Button";
import user from "@api/user";
import DeskComparison from './DeskComparison';

export default function AthleteDesk({ playerData, isComparison }) {
   const [id, setId] = useState(localStorage.getItem('id'));
   const [token, setToken] = useState(localStorage.getItem('token'));
   const [persona, setPersona] = useState({});
   const [athleteDesc, setAthleteDesc] = useState({});
   const [hasFetchedData, setHasFetchedData] = useState(false);

   useEffect(() => {
      async function fetchData() {
         if (id && token && !hasFetchedData) {
            try {
               const response = await user.get(id, token);
               console.log(response.data.data);
               setPersona(response.data.data);
               setAthleteDesc(response.data.data.athleteDesc);
               setHasFetchedData(true);
            } catch (error) {
               console.error('Erro ao buscar os dados do atleta:', error);
            }
         }
      }
      fetchData();
   }, [id, token, hasFetchedData]);

   const calculateAge = (birthDate) => {
      if (!birthDate) return 'Não disponível';
      const birthDateParsed = parseISO(birthDate);
      return differenceInYears(new Date(), birthDateParsed);
   };

   const birthDate = persona.birthDate 
      ? format(parseISO(persona.birthDate), 'dd/MM/yyyy') 
      : 'Data não disponível';

   const age = persona.birthDate ? calculateAge(persona.birthDate) : 'Não disponível';


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
                     <span>{athleteDesc.number ? athleteDesc.number : 'Não definido'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Posição: </S.Label>
                     <span>{athleteDesc.position ? athleteDesc.position : 'Não definido'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Data de nascimento: </S.Label>
                     <span>{birthDate}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Idade: </S.Label>
                     <span>{age}</span>
                  </S.Information>

                  <S.Flex>
                     <S.Information>
                        <S.Label>Altura (cm): </S.Label>
                        <span>{athleteDesc.height ? athleteDesc.height : 'Não definido'}</span>
                     </S.Information>
                     <S.Information>
                        <S.Label>Peso (kg): </S.Label>
                        <span>{athleteDesc.weight ? athleteDesc.weight : 'Não definido'}</span>
                     </S.Information>
                  </S.Flex>

                  <S.Information>
                     <S.Label>Endereço: </S.Label>
                     <span>{athleteDesc.address ? athleteDesc.address : 'Não definido'}</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Atributos' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>Categoria:</S.Label>
                     <span>{persona.category ? persona.category : 'Não definido.'}</span>
                  </S.Information>
                  
                  <S.Information>
                     <S.Label>Pontos marcados:</S.Label>
                     <span>{athleteDesc.pts} pontos</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Assistências:</S.Label>
                     <span>{athleteDesc.ast} assistências</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Contatos' size='1.3rem' />
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>E-mail:</S.Label>
                     <span>{persona.email ? persona.email : 'Não definido.'}</span>
                  </S.Information>
                  
                  <S.Information>
                     <S.Label>Telefone 1:</S.Label>
                     <span>{persona.phone ? persona.phone : 'Não definido.'}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Telefone 2:</S.Label>
                     <span>{persona.phone2 ? persona.phone2 : 'Não definido.'}</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>
         </S.InfoGrid>
         <S.Buttons>
            <Button value='Editar' />
            <Button value='Deletar' />
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