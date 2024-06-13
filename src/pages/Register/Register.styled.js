import * as LS from '@pages/Login/Login.styles'
import { Colors } from "@utils/Helpers";
import styled, { css } from 'styled-components';

export const Mandatory = styled.span`
   color: ${Colors.red};
`

export const StepperWrapper = styled.div`
   position: absolute;
   top: 13%;

   @media (min-width: 1700px) {
     top: 14%;
   }
`

export const Form = styled(LS.Form)`
   top: 20%;
`

export const FormStepThree = styled(LS.Form)`
   top: 15%;

   @media (min-width: 1700px) {
      top: 20%;
   }
`

export const Text = styled.span`
   position: absolute;
   width: 20vw;
   text-align: left;
   top: 28%;
   left: 65%;
   
   @media (min-width: 1700px) {
      font-size: 1.5rem;
   }
`
export const InputLine = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   width: 100%;
   gap: 1rem;
   justify-content: space-between;
`;

export const TabsRoot = styled.div`
  position: relative;
  flex-direction: column;
`;

export const TabsList = styled.div`
  flex-shrink: 0;
  display: flex;
`;

export const TabsTrigger = styled.button`
  font-family: inherit;
  background-color: transparent;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: ${Colors.orange100};
  border: none;
  font-weight: 600;
  border-bottom: 4px solid transparent;
  cursor: pointer;
 
  ${props => props.$active && `
    border-bottom: 4px solid #FF7425;
  `}
`;

export const TabsContent = styled.div`
    flex-grow: 1;
`
