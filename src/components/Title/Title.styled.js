import styled from "styled-components";
import Colors from "@utils/Colors";

export const Span = styled.span`
   font-family: ${props => props.font ? props.font : "Catamaran"};
   color: ${props => props.color ? props.color : Colors.orange500};
   font-size: ${props => props.size ? props.size : "2rem"};
   font-weight: ${props => props.weight ? props.weight : "900"};
   text-transform: ${props => props.uppercase ? "uppercase" : "none"};
   margin: 0;
   padding: 0;
`