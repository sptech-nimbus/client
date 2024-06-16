import styled, { css } from "styled-components";
import { Colors } from "@utils/Helpers";

export const PrimaryButton = styled.input`
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
   background-color: ${props => props.color ? props.color : Colors.orange500};
   color: ${props => props.fontColor ? props.fontColor : Colors.orange100};
   cursor: pointer;
   text-transform: capitalize;
   font-weight: bold;
   font-family: 'Catamaran', sans-serif;
   transition: background-color .2s ease-in, border-color .2s ease-in, color .2s ease-in;
   margin-top: ${props => props.$marginTop ? props.$marginTop : '5%'};

   &:hover {
      background-color: ${Colors.orange300};
      border-color: ${Colors.orange300};
   }

   &:active {
      transition: none;
      background-color: ${Colors.orange500};
      border-color: ${Colors.orange500};
   }
`

export const SecondaryButton = styled(PrimaryButton)`
   background-color: transparent;
   color: ${props => props.fontColor ? props.fontColor : Colors.orange500};

   &:hover {
      background-color: transparent;
      color: ${Colors.orange300};
   }
`

export const PillButtons = styled.div`
   display: flex;
   width: 100%;
`

export const RightButton = styled.button`
   width: 100%;
   border-radius: 0 1rem 1rem 0;
   border: 2px solid ${props => props.color ?? Colors.orange500};
   border-left: 1px;
   padding: .6rem;
   cursor: pointer;
   font-size: 1rem;
   font-weight: 600;
   color: ${props => props.color ?? Colors.orange500};
   background-color: ${props => props.$active ? props.color : 'transparent'};
   ${props => props.active && css`
      background-color: ${props => props.color ?? Colors.orange500};
      color: ${props => props.fontColor ?? Colors.orange100};
   `}
`

export const LeftButton = styled(RightButton)`
   border-radius: 1rem 0 0 1rem;
   border: 2px solid ${props => props.color ?? Colors.orange500};
`