import styled from "styled-components";
import Colors from "@utils/Colors";

export const PrimaryButton = styled.input`
   width: ${props => props.width};
   font-size: ${props => 
      props.fontSize ? props.fontSize :
      props.size == `md` ? `1.1rem` : 
      props.size == `sm` ? `.7rem` : `1rem`
   };
   padding: ${props => 
      props.size == `md` ? `.5rem 3.3rem` : 
      props.size == `sm` ? `.1rem 1.5rem` : `.1rem 1.5rem`
   };
   border-radius: ${props => 
      props.size == `md` ? `.8rem` : 
      props.size == `sm` ? `.5rem` : '.5rem'
   };
   border: ${props => 
      props.size == `md` ? `3px` : 
      props.size == `sm` ? `2px` : '2px'
   } solid ${Colors.orange500};
   background-color: ${Colors.orange500};
   color: ${Colors.orange100};
   cursor: pointer;
   text-transform: capitalize;
   font-weight: bold;
   font-family: 'Catamaran', sans-serif;
   transition: background-color .2s ease-in, border-color .2s ease-in, color .2s ease-in;
   margin-top: 5%;

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
   color: ${Colors.orange500};

   &:hover {
      background-color: transparent;
      color: ${Colors.orange300};
   }
`
