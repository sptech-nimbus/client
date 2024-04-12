import styled, { keyframes } from "styled-components";
import Colors from "@utils/Colors";
import * as D from "@radix-ui/react-dialog";

export const DialogOverlay = styled(D.Overlay)` 
   background-color: ${Colors.gray900};
   position: fixed;
   inset: 0;
   opacity: .5;
   transition: all .5s ease-in-out;
`

export const DialogContent = styled(D.Content)`
   width: 40vw;
   height: 100vh;
   max-width: 500px;
   background-color: ${Colors.gray700};
   position: fixed;
   top: 0;
   right: 0;
   &:focus { outline: 'none' }
`

export const DialogTitle = styled(D.Title)`
   width: 100%;
   text-align: center;
   font-family: "Catamaran", sans-serif;
`

export const DialogHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   padding: 0 3rem;
`

export const DialogDescription = styled(D.Description)`
   width: 100%;
   padding: 1rem 3rem;
`

export const DialogClose = styled(D.Close)`
   background: none;
   display: flex;
   align-items: center;
   justify-content: center;
   border: none;
   outline: none;
   cursor: pointer;
   color: ${Colors.gray500};
   font-size: 1.5rem;
   transition: all .1s ease-in;

   &:hover {
      color: ${Colors.gray200};
   }
`

export const DialogTrigger = styled(D.Trigger)`
   background: none;
   border: none;
   color: ${Colors.orange500};
   cursor: pointer;
   padding: .3rem .5rem;
   border-radius: .3rem;
   transition: all .1s ease-in;

   &:hover {
      background: ${Colors.gray700};
   }

   &:active {
      color: ${Colors.orange300};
   }
`