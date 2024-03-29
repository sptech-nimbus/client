import styled from "styled-components";
import { Colors } from "../../values/colors";

export const PrimaryButton = styled.input`
   font-size: ${props => 
      props.size == `xl` ? `2rem` : 
      props.size == `md` ? `1.5rem` : 
      props.size == `sm` ? `1.2rem` : `1.2rem`
   };
   padding: ${props => 
      props.size == `xl` ? `1rem 5rem` : 
      props.size == `md` ? `0.5rem 3.5rem` : 
      props.size == `sm` ? `0.1rem 1.5rem` : `0.1rem 1.5rem`
   };
   cursor: pointer;
   text-transform: capitalize;
   font-weight: bold;
   border-radius: ${props => 
      props.size == `xl` ? `2rem` : 
      props.size == `md` ? `1.5rem` : 
      props.size == `sm` ? `1rem` : '1rem'
   };
   border: none;
   background-color: ${Colors.orange500};
   font-family: 'Catamaran';
   border: ${props => 
      props.size == `xl` ? `8px` : 
      props.size == `md` ? `5.3px` : 
      props.size == `sm` ? `4px` : '4px'
   } solid ${Colors.orange500};
   color: ${Colors.orange100};
   transition: background-color .2s ease-in, border-color .2s ease-in, color .2s ease-in;

   &:hover {
      background-color: ${Colors.orange300};
      border-color: ${Colors.orange300};
   }

   &:active {
      transition: none;
      background-color: ${Colors.orange500};
      border-color: ${Colors.orange500};
      margin-top: 1px;
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
