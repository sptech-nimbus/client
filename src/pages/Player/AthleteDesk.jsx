import * as S from "./Player.styled";

import Title from "@components/Title/Title";
import { DeleteDialog } from "@components/Dialog/Dialog";
import { PrimaryButton as Button } from "@components/Button/Button";
import { Trash, Pencil, FilePdf } from "@phosphor-icons/react";
import user from "@api/user";
import { useState } from "react";

export default function AthleteDesk() {
    

    return (
        <S.InfoWrapper>
            <S.InfoGrid>
                <S.Container>
                    <S.PlayerImg src="https://placehold.co/400x400" />
                </S.Container>

                <S.Container>
                    <Title text='Informações do jogador' size='1.3rem' />
                    <S.InfomationContainer>
                        <S.Information>
                            <S.Label>Nome completo:</S.Label>
                            <span>Yuri Oliveira da Silva</span>
                        </S.Information>

                        <S.Information>
                            <S.Label>Número: </S.Label>
                            <span>15</span>
                        </S.Information>

                        <S.Information>
                            <S.Label>Posição: </S.Label>
                            <span>Ala-armador</span>
                        </S.Information>

                        <S.Information>
                            <S.Label>Data de nascimento: </S.Label>
                            <span>15/12/2004</span>
                        </S.Information>

                        <S.Information>
                            <S.Label>Idade: </S.Label>
                            <span>19</span>
                        </S.Information>

                        <S.Flex>
                            <S.Information>
                                <S.Label>Altura (cm): </S.Label>
                                <span>192</span>
                            </S.Information>
                            <S.Information>
                                <S.Label>Peso (kg): </S.Label>
                                <span>65</span>
                            </S.Information>
                        </S.Flex>

                        <S.Information>
                            <S.Label>Endereço: </S.Label>
                            <span>Rua Haddock Lobo</span>
                        </S.Information>
                    </S.InfomationContainer>
                </S.Container>

                <S.Container>
                    <Title text='Atributos' size='1.3rem' />
                    <S.InfomationContainer>

                        <S.Information>
                            <S.Label>Categoria:</S.Label>
                            <span>Sub-20</span>
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
                    <Title text='Contatos' size='1.3rem' />
                    <S.InfomationContainer>
                        <S.Information>
                            <S.Label>E-mail:</S.Label>
                            <span>email@jogador.com</span>
                        </S.Information>

                        <S.Information>
                            <S.Label>Telefone 1:</S.Label>
                            <span>(11) 99999-9999</span>
                        </S.Information>

                        <S.Information>
                            <S.Label>Telefone 2:</S.Label>
                            <span>Não definido.</span>
                        </S.Information>
                    </S.InfomationContainer>
                </S.Container>
            </S.InfoGrid>
            <S.Buttons>
                <Button value='Editar' onClick={() => console.log("abiru")} />
                <DeleteDialog trigger = {
                    <Button value='Deletar' />    
                } />
                <Button value='Baixar PDF' />
            </S.Buttons>
       </S.InfoWrapper>

   )
}