import styled from "styled-components";
import { Colors } from "@utils/Helpers";

const calcLineHeight = (size) => {
  let value = parseFloat(size);
  let unit = size.match(/[a-zA-Z]+/);

  value *= 1.2;

  return value + unit;
}

export const Span = styled.span`
   display: inline-block;
   font-family: ${props => props.font ? props.font : "Catamaran"};
   color: ${props => props.color ? props.color : Colors.orange500};
   font-size: ${props => props.size ? props.size : "2rem"};
   font-weight: ${props => props.weight ? props.weight : "900"};
   text-transform: ${props => props.$uppercase ? "uppercase" : "none"};
   margin: 0;
   padding: 0;
   line-height: ${props => props.size ? calcLineHeight(props.size) : "2.1rem"};
`