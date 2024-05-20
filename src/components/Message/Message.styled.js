import styled, { css } from "styled-components";
import { Colors } from "@utils/Helpers";

let isSender;

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   padding: 8px 1rem;
   background-color: ${Colors.gray700};
   border-radius: 1.5rem 1.5rem 1.5rem 0;
   border: 1px solid #303030;

   ${props => props.isSender && css`
      padding-top: 1rem;
      background-color: ${Colors.orange600};
      border-radius: 1.5rem 1.5rem 0 1.5rem;
   `}
`

export const User = styled.span`
   font-weight: 600;
   padding-block: 4px;
   color: ${Colors.orange100};
   ${props => props.isSender && css`
      display: none;
   `}
`

export const Content = styled.span`
   max-width: 30vw;
   max-height: 16vh;
   font-size: 14px;
`

export const Date = styled.span`
   width: 100%;
   text-align: right;
   font-size: smaller;
`