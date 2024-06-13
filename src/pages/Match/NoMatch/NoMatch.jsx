import * as S from "./NoMatch.styled";
import { useNavigate } from "react-router-dom";

import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Button from "@components/Button/Button";

import { Colors } from "@utils/Helpers";

export default function NoMatch() {
   const navigate = useNavigate();

   return (
      <S.PageContainer>
         <Sidebar page='match' />
         <S.ContentContainer>
            <S.Container>
               <Title text='Nenhuma partida marcada para hoje foi encontrada.' color={Colors.orange100}/>
               <S.Texts>
                  <span>Clique no botão abaixo para ser redirecionado a tela de agendamento.</span>
                  <Button.Primary 
                  $marginTop="0rem" 
                  onClick={() => navigate('/events')} 
                  value="Ir para agendamento"
                  />
               </S.Texts>
            </S.Container>
         </S.ContentContainer>
      </S.PageContainer>
   )
}