import * as LS from '../Login/Login.styles'
import styled from 'styled-components'

export const Form = styled(LS.Form)`
   top: 25%;
`

export const FormStepThree = styled(LS.Form)`
   top: 15%;
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