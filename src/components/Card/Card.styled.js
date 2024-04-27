import styled from "styled-components";

export const CardContainer = styled.div`
   width: ${props => props.width};
   display: flex;
   flex-direction: ${props => props.row ? "row" : "column"};
   gap: ${props => props.gap ? props.gap : ".3rem"};
   justify-content: ${props => props.justCont ? props.justCont : "center"};
   align-items: ${props => props.alignItems ? props.alignItems : "center"};
   background-color: ${props => props.background ? props.background : "transparent"};
   border-radius: 1.2rem;
   cursor: pointer;
`