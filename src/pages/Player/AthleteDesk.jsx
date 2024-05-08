import * as S from "./Player.styled";

import Title from "@components/Title/Title";
import { PrimaryButton as Button } from "@components/Button/Button";
import { Trash, Pencil, FilePdf } from "@phosphor-icons/react";
import user from "@api/user";

export default function AthleteDesk() {

   return (
      <S.InfoWrapper>
      <S.InfoGrid>
            <S.Container>
               <S.PlayerImg src="https://placehold.co/400x400"/>
            </S.Container>
            
            <S.Container>
               <Title text='Informações do jogador' size='1.3rem'/>
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>Nome completo:</S.Label>  
                     <span>Michael Teixeira</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Número: </S.Label>
                     <span></span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Posição: </S.Label>
                     <span>Pivo</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Data de nascimento: </S.Label>
                     <span>01/03/2002</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Idade: </S.Label>
                     <span>22</span>
                  </S.Information>

                  <S.Flex>
                     <S.Information>
                        <S.Label>Altura (cm): </S.Label>
                        <span>193</span>
                     </S.Information>
                     <S.Information>
                        <S.Label>Peso (kg): </S.Label>
                        <span>90</span>
                     </S.Information>
                  </S.Flex>

                  <S.Information>
                     <S.Label>Endereço: </S.Label>
                     <span>Rua Haddock Lobo</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Atributos' size='1.3rem'/>
               <S.InfomationContainer>

                  <S.Information>
                     <S.Label>Categoria:</S.Label>
                     <span>Sub-25</span>
                  </S.Information>
                  
                  <S.Information>
                     <S.Label>Pontos marcados:</S.Label>
                     <span>30 pontos</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Assistências:</S.Label>
                     <span>40 assistências</span>
                  </S.Information>

               </S.InfomationContainer>
            </S.Container>

            <S.Container>
               <Title text='Contatos' size='1.3rem'/>
               <S.InfomationContainer>
                  <S.Information>
                     <S.Label>E-mail:</S.Label>
                     <span>michaelhenrique0022gmail.com</span>
                  </S.Information>
                  
                  <S.Information>
                     <S.Label>Telefone 1:</S.Label>
                     <span>(11) 95577-7482</span>
                  </S.Information>

                  <S.Information>
                     <S.Label>Telefone 2:</S.Label>
                     <span>Não definido.</span>
                  </S.Information>
               </S.InfomationContainer>
            </S.Container>
      </S.InfoGrid>
      <S.Buttons>
               <Button
                   value='Editar'
                   onClick={handleSubmit}
               />
         <Button value='Deletar'/>
         <Button value='Baixar PDF'/>
      </S.Buttons>
   </S.InfoWrapper>
   )
}