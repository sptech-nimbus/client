import styled, { keyframes } from "styled-components";
import * as T from "@radix-ui/react-tooltip";
import { Colors } from "@utils/Helpers";


export const Arrow = styled(T.Arrow)`
   fill: ${Colors.gray700};

`

export const Trigger = styled(T.Trigger)`
   background-color: transparent;
   border: none;
   padding: none;
   margin: none;
   color: ${props => props.color? props.color : Colors.gray100};
`

export const TriggerInput = styled(Trigger)`
  position: absolute;
  right: -3rem;
`

export const Content = styled(T.Content)`
   max-width: 350px;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${Colors.gray700};
   padding: 10px;
   border-radius: 8px;
   font-size: .8rem;
   animation-name: ${props =>
   props.side == 'right'? slideRightAndFade : 
   props.side == 'top' ? slideUpAndFade :
   props.side == 'left' ? slideLeftAndFade :
   props.side == 'bottom' ? slideDownAndFade : 'unset'
   };
   animation-duration: 400ms;
   will-change: transform, opacity;
   animation-timing-function: cubic-bezier(.16, 1, .3, 1);
   box-shadow: 0px 11px 4px rgba(0, 0, 0, .01), 
               0px 6px 4px rgba(0, 0, 0, .05), 
               0px 3px 3px rgba(0, 0, 0, .09), 
               0px 1px 1px rgba(0, 0, 0, .1), 
               0px 0px 0px rgba(0, 0, 0, .1);
   gap: 4px;

   @media (max-width: 1150px) {
      max-width: 250px;
   }

   @media (max-width: 1000px) {
      max-width: 150px;
   }

   @media (max-width: 850px) {
      max-width: 120px;
   }
`

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
