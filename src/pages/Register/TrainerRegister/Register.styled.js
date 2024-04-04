import * as LS from '@pages/Login/Login.styles'
import { Colors } from "@utils/Colors";
import styled from 'styled-components'

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
   top: 25%;
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
`

export const InputContainer = styled.div`
   width: fit-content;
   display: flex;
   gap: 1rem;
`