import styled from "styled-components"

export const Label = styled.label`
   display: flex;
   flex-direction: column;
   text-align: left;
   gap: 4px;
   font-size: ${props => props.fontSize ? props.fontSize : '0.9rem'};
`