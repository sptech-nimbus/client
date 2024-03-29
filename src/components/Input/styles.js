import styled from "styled-components";
import { Colors } from "../../values/colors";

export const IconWrapper = styled.span`
   display: flex;
   align-items: center;
   justify-content: center;
   align-self: flex-end;
`

export const Wrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   background-color: #212121;
   border: 1px solid ${Colors.gray600};
   padding: 0.5rem 1rem;
   border-radius: 0.6rem;
   transition: all .1s;
   color: #7D7D7D;
   font-weight: bold;
   font-size: 1.8rem;

   &:focus-within {
      border-color: ${Colors.orange100};
   }
`

export const Input = styled.input`
   background-color: #212121;
   border: none;
   font-family: 'Poppins', sans-serif;
   font-size: 1rem;

   &:focus {
      outline: none;
      border: none;
   }

   &::placeholder {
      color: #7D7D7D;
   }
`

export const WrapperGoogle = styled(Wrapper)`
   justify-content: center;
   cursor: pointer;
`

export const GoogleIcon = styled.img`
   width: 2rem;
`

export const Text = styled.span`
   font-size: 0.8rem;
   font-weight: 500;
   font-family: 'Poppins';
   color: ${Colors.gray100};
`