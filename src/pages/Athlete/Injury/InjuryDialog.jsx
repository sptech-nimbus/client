import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { Colors } from '@utils/Helpers';
import { Dialog } from "@components/Dialog/Dialog";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";

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

const DialogContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   padding-bottom: 1rem;
`

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export function InjuryDialog() {
   const query = useQuery();
   const playerId = query.get('id');

   const [injuryData, setInjuryData] = useState({
      initialDate: '',
      finalDate: '',
      type: '',
      athleteId: playerId
   });

   const handleInputChange = (e) => {
      setInjuryData({
         ...injuryData,
         [e.target.name]: e.target.value
      });
      console.log(injuryData);
   }

   return (
      <Dialog
      title='Adicionar nova lesão' 
      trigger={<Button.Primary value='+ Adicionar lesão' marginTop="0px" fontSize="1.2rem" width="100%"/>}
      >
         <DialogContainer>
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
                     name='initialDate'
                     value={injuryData.initialDate}
                     onChange={handleInputChange}
                     />
                  </Label>
                  <Label>
                     Final
                     <Input.Default
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