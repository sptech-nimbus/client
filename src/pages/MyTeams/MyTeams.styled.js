import styled from "styled-components";
import Colors from "@utils/Helpers";

export const Header = styled.header`
   width: 100vw;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
`

export const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1.5rem;
`

export const TeamsContainer = styled.div`
   display: flex;
   flex-direction: ${props => props.$hasTeams ? 'row' : 'column'};
   align-items: center;
   gap: ${props => props.$hasTeams ? '2rem' : '1rem'};
`

export const Team = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1rem;
   cursor: pointer;
`

export const TeamImage = styled.img`
   border-radius: 1rem;
   width: 250px;
   height: 250px;
   object-fit: cover;
   object-position: center;
`

export const TeamName = styled.span`
   width: 100%;
   text-align: center;
   font-size: 1.2rem;
   font-weight: 600;
   font-family: 'Catamaran', sans-serif;
`

export const NoTeams = styled.span`
   font-weight: 600;
   font-size: 2rem;
`

export const NoTeamsDescription = styled.span`
   
`