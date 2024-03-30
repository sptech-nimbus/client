import * as LS from '../Login/Login.styles'
import styled from 'styled-components'

export const Form = styled(LS.Form)`
   top: 25%;
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