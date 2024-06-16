import { useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";

import { Colors } from '@utils/Helpers';
import { Dialog } from "@components/Dialog/Dialog";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";

import injury from "@api/injury";

const Flex = styled.div`
   display: flex;
   gap: 1rem;
`

const Column = styled.div`
   padding-top: 1rem;
   display: flex;
   flex-direction: column;
   gap: .5rem;

   span {
      color: ${Colors.orange100};
      font-weight: 600;
   }
`

const DialogContainer = styled.form`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   padding-bottom: 1rem;
`

export function InjuryDialog({ playerId }) {
   const [injuryData, setInjuryData] = useState({
      inicialDate: '',
      finalDate: '',
      type: '',
      athlete: {
         id: playerId
      }
   });

   const handleInputChange = (e) => {
      setInjuryData({
         ...injuryData,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (injuryData.finalDate && injuryData.inicialDate && injuryData.type) {
         try {
            await injury.post(injuryData, localStorage.getItem('token'));

            setInjuryData({
               inicialDate: '',
               finalDate: '',
               type: '',
               athleteId: playerId
            });

            window.location.reload();
         }
         catch (err) {
            if (err.response) {
               toast.error(`Erro do servidor: ${err.response.status} - ${err.response.message}`)
            }
            else if (err.request) {
               toast.error(`Erro na requisição: O servidor não respondeu. Por favor, aguarde um momento antes de tentar novamente.`);
            }
            else {
               toast.error(`Erro: ${err.message}`);
            }
         }
      }
      else {
         if (!injuryData.inicialDate) toast.error(`Preencha o período inicial do tratamento.`)
         if (!injuryData.finalDate) toast.error(`Preencha o período final do tratamento.`)
         if (!injuryData.type) toast.error(`Preencha o tipo da lesão.`);
      }
   }

   return (
      <Dialog
         title='Adicionar nova lesão'
         trigger={<Button.Primary value='+ Adicionar lesão' $marginTop="0px" fontSize="1.2rem" width="100%" />}
      >
         <DialogContainer onSubmit={handleSubmit}>
            <Label>
               Tipo de lesão
               <Input.Default
                  name='type'
                  value={injuryData.type}
                  onChange={handleInputChange}
               />
            </Label>

            <Column>
               <span>Tempo de recuperação</span>
               <Flex>
                  <Label>
                     Início
                     <Input.Default
                        type='date'
                        name='inicialDate'
                        value={injuryData.inicialDate}
                        onChange={handleInputChange}
                     />
                  </Label>
                  <Label>
                     Final
                     <Input.Default
                        type='date'
                        name='finalDate'
                        value={injuryData.finalDate}
                        onChange={handleInputChange}
                     />
                  </Label>
               </Flex>
            </Column>

            <Button.Primary
               width="100%"
               value="Adicionar lesão"
               fontSize="1.2rem"
            />
         </DialogContainer>
      </Dialog>
   )
}