import styled from "styled-components";
import * as LS from '../Login/Login.styles';

export const LoaderContaiener = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const TeamImage = styled.img`
   width: 250px;
   height: 250px;
   align-self: center;
   object-fit: cover;
   object-position: center;
`

export const JoinTeamGrid = styled.div`
   display: flex;
   gap: 2rem;
   align-items: center;
   justify-content: center;
`

export const Form = styled.div`
   width: 25vw;
   display: flex;
   flex-direction: column;
   gap: 1.2rem;
`

export const JoinTeamText = styled.span`
   font-size: 1.1rem;
   padding-bottom: 1.5rem;
   font-weight: 600;
`