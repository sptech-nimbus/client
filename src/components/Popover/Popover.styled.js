import styled, { keyframes } from "styled-components";
import * as P from "@radix-ui/react-popover";
import { Colors } from "@utils/Helpers"

const slideUpAndFade = keyframes({
   '0%': { opacity: 0, transform: 'translateY(2px)' },
   '100%': { opacity: 1, transform: 'translateY(0)' },
 });
 
 const slideRightAndFade = keyframes({
   '0%': { opacity: 0, transform: 'translateX(-2px)' },
   '100%': { opacity: 1, transform: 'translateX(0)' },
 });
 
 const slideDownAndFade = keyframes({
   '0%': { opacity: 0, transform: 'translateY(-2px)' },
   '100%': { opacity: 1, transform: 'translateY(0)' },
 });
 
 const slideLeftAndFade = keyframes({
   '0%': { opacity: 0, transform: 'translateX(2px)' },
   '100%': { opacity: 1, transform: 'translateX(0)' },
 });

export const PContent = styled(P.Content)`
   border-radius: 4px;
   padding: .5rem;
   background-color: ${Colors.gray600};
   border: 1px solid ${Colors.gray600};
   box-shadow: hsl(206, 22%, 7% / 35%) 0px 10px 38px -10px, hsl(206, 22%, 7% / 20%) 0px 10px 20px -15px;
   animation-duration: 400ms;
   animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
   will-change: transform, opacity;

   &:focus {
      outline: none;

      box-shadow: none;
   }

   &[data-state='open'][data-side='top'] {
      animation-name: ${slideDownAndFade};
   }
   &[data-state='open'][data-side='right'] {
      animation-name: ${slideLeftAndFade};
   }
   &[data-state='open'][data-side='bottom'] {
      animation-name: ${slideUpAndFade};
   }
   &[data-state='open'][data-side='left'] {
      animation-name: ${slideRightAndFade};
   }
`

export const PArrow = styled(P.Arrow)`
   fill: ${Colors.gray600}
`