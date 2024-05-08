import styled, { keyframes } from "styled-components";
import Colors from "@utils/Colors";
import * as D from "@radix-ui/react-dialog";

export const DrawerOverlay = styled(D.Overlay)` 
   background-color: ${Colors.gray900};
   position: fixed;
   inset: 0;
   opacity: .8;
   z-index: 1;
   transition: all .5s ease-in-out;
`

export const DrawerContent = styled(D.Content)`
   width: 30vw;
   height: 100vh;
   max-width: 400px;
   background-color: ${Colors.gray700};
   position: fixed;
   top: 0;
   right: 0;
   z-index: 1;
   &:focus { outline: 'none' }
   overflow-y: auto;

   &::-webkit-scrollbar {
      width: 8px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: ${Colors.gray800};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 10px;
      transition: all .2s ease-in;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: ${Colors.orange300}; 
   }
`

export const DialogContent = styled(DrawerContent)`
   min-width: 30vw;
   max-width: 50vw;
   height: fit-content;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   border-radius: 1rem;
`

export const DrawerTitle = styled(D.Title)`
   width: 100%;
   text-align: left;
   font-family: "Catamaran", sans-serif;
   color: ${Colors.orange500};
`

export const DialogTitle = styled(D.Title)`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
`

export const DrawerHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   padding: 0 3rem;
`

export const DrawerDescription = styled(D.Description)`
   width: 100%;
   padding: 0rem 3rem;
`

export const DrawerClose = styled(D.Close)`
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

export const DrawerTrigger = styled(D.Trigger)`
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

export const DialogTrigger = styled(D.Trigger)`
   background: none;
   border: none;
`