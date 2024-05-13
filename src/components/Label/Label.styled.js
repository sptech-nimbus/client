import styled from "styled-components"

export const Label = styled.label`
   position: relative;
   width: 100%;
   display: flex;
   flex-direction: column;
   text-align: left;
   gap: 4px;
   font-size: ${props => props.fontSize ? props.fontSize : '.9rem'};
`