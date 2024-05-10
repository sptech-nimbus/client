import * as Login from "../Login/Login.styles";

import styled from "styled-components";
import Colors from "@utils/Helpers";

export const Form = styled(Login.Form)`
   top: 35%;
`

export const Header = styled(Login.Header)`

`

export const DescriptionTitle = styled.span`
   font-weight: 600;
   font-size: 1.5rem;
`

export const Description = styled.span`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   position: absolute;
   top: 18%;
   width: 40vw;
`