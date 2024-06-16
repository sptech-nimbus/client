/* eslint-disable no-unused-vars */
import styled, { keyframes } from "styled-components";
import { Colors } from "@utils/Helpers";
import * as D from "@radix-ui/react-dialog";
import { SecondaryButton } from "../Button/Button";

const contentShow = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -48%) scale(.96);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const DrawerOverlay = styled(D.Overlay)` 
   background-color: ${Colors.gray900};
   position: fixed;
   inset: 0;
   opacity: .8;
   z-index: 1;
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
   animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

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

export const LoadingContent = styled(DialogContent)`
   background: none;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const DrawerTitle = styled(D.Title)`
   width: 100%;
   text-align: left;
   font-family: "Catamaran", sans-serif;
   color: ${Colors.orange500};
`

export const DialogTitle = styled(D.Title)`
   width: 90%;
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

// Delete Dialog
export const DialogDeleteContent = styled(DrawerContent)`
   min-width: 30vw;
   width: ${props => props.width};
   height: fit-content;
   max-width: 80vw;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   border-radius: 1rem;
   display: flex;
   text-align: center;
   flex-direction: column;
`

export const DeleteDialogTitle = styled(D.Title)`
   width: 100%;
   display: flex;
`

export const DeleteDescription = styled(D.Description)`
width: ${props => props.width};
display: ${props => props.display};
justify-content: ${props => props.justify};
align-items: ${props => props.align};
flex-direction: ${props => props.flexDirection};
gap: ${props => props.gap};
margin: ${props => props.margin};
`
export const InfoDeleteAthlete = styled(D.Description)`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: center;
`
export const ButtonDelete = styled(SecondaryButton)`
width: ${props => props.width};
font-size: ${props =>
      props.fontSize ? props.fontSize :
         props.size == `md` ? `1.1rem` :
            props.size == `sm` ? `.7rem` : `1rem`
   };
padding: ${props =>
      props.size == `md` ? `.3rem 3.3rem` :
         props.size == `sm` ? `.1rem 1.5rem` : `.1rem 1.5rem`
   };
border-radius: ${props =>
      props.size == `md` ? `.8rem` :
         props.size == `sm` ? `.5rem` : '.5rem'
   };
border: ${props =>
      props.size == `md` ? `3px` :
         props.size == `sm` ? `2px` : '2px'
   } solid ${props => props.color ? props.color : Colors.orange500};
background-color: ${props => props.color ? props.color : `transparent`};
color: ${props => props.fontColor ? props.fontColor : Colors.orange500};
cursor: pointer;
text-transform: capitalize;
font-weight: bold;
font-family: 'Catamaran', sans-serif;
transition: background-color .2s ease-in, border-color .2s ease-in, color .2s ease-in;
margin-top: ${props => props.$marginTop ? props.$marginTop : '5%'};

&:hover {
   border-color: ${Colors.orange300};
}

`
export const DelS = styled(D.Description)`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
`
export const InfoAthlete = styled(D.Description)`
width: 100%;
height: fit-content;
display: flex;
align-items: center;
flex-direction: column;
`
export const Container = styled(DrawerContent)`
width: 100%;
`

export const DeleteTitle = styled(D.Title)`

`

// Update
export const Mandatory = styled.span`
   color: ${Colors.red};
`

export const InputLine = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   width: 100%;
   gap: 1rem;
   justify-content: space-between;
`;

