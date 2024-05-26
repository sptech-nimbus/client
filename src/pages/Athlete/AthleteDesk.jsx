import * as S from "./Player.styled";
import { useState, useEffect } from 'react';

import Title from "@components/Title/Title";
import { DeleteDialog } from "@components/Dialog/Dialog";
import { PrimaryButton as Button } from "@components/Button/Button";

import DeskComparison from './DeskComparison';

export default function AthleteDesk({ playerData, isComparison }) {
   let { birthDate } = playerData;
   birthDate = new Date(birthDate).toLocaleDateString('pt-BR');

   return isComparison ? <DeskComparison playerData={playerData}/> : (
      <S.InfoWrapper>
      <S.InfoGrid>
            <S.Container>
               <S.PlayerImg src={playerData.picture}/>
            </S.Container>
            
            <S.Container>
               <Title text='Informações do jogador' size='1.3rem'/>
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>Nome completo:</S.Label>  
                     <span>{playerData.firstName} {playerData.lastName}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Número: </S.Label>
                     <span>{playerData.number}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Posição: </S.Label>
                     <span>{playerData.position}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Data de nascimento: </S.Label>
                     <span>{birthDate}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Idade: </S.Label>
                     <span>{playerData.age}</span>
                  </S.Information>

                  <S.Flex>
                     <S.Information>
                        <S.Label>Altura (cm): </S.Label>
                        <span>{playerData.height}</span>
                     </S.Information>
                     <S.Information>
                        <S.Label>Peso (kg): </S.Label>
                        <span>{playerData.weight}</span>
                     </S.Information>
                  </S.Flex>

                  <S.Information>
                     <S.Label>Endereço: </S.Label>
                     <span>{playerData.address}</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Atributos' size='1.3rem'/>
               <S.InfomationContainer>

                  <S.Information>
                     <S.Label>Categoria:</S.Label>
                     <span>{playerData.category}</span>
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
               <Title text='Contatos' size='1.3rem'/>
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>E-mail:</S.Label>
                     <span>{playerData.email}</span>
                  </S.Information>
                  
                  <S.Information>
                     <S.Label>Telefone 1:</S.Label>
                     <span>{playerData.phone}</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Telefone 2:</S.Label>
                     <span>Não definido.</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>
      </S.InfoGrid>
      <S.Buttons>
         <Button value='Editar'/>
         <Button value='Deletar'/>
         <Button value='Baixar PDF'/>
      </S.Buttons>
   </S.InfoWrapper>
   )
}