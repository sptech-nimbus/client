import styled from "styled-components";
import { Colors } from "@utils/Helpers";
import { IMaskInput } from "react-imask";

const inputColor = props => props.disabled ? '#303030' : '#212121'

export const IconWrapper = styled.span`
   display: flex;
   align-items: center;
   justify-content: center;
   align-self: flex-end;
`

export const Wrapper = styled.div`
   width: ${props => props.width ? props.width : '100%'};
   align-items: center;
   justify-content: space-between;
   gap: 8px;
   background-color: ${inputColor};
   border: 1px solid ${Colors.gray600};
   padding: .5rem .8rem;
   border-radius: .6rem;
   transition: all .1s;
   color: #7D7D7D;
   font-weight: bold;
   font-size: 1.5rem;
   &:focus-within {
      border-color: ${Colors.orange100};
   }
`

export const Input = styled.input`
   width: 100%;
   background-color: transparent;
   border: none;
   font-family: 'Poppins', sans-serif;
   color: ${Colors.gray100};
   font-size: ${props => props.fontSize};
   color-scheme: dark;

   &:focus {
      outline: none;
      border: none;
   }

   &::placeholder {
      color: #7D7D7D;
   }
`

export const MaskedInput = styled(IMaskInput)`
   width: 100%;
   background-color: transparent;
   border: none;
   font-family: 'Poppins', sans-serif;
   color: ${Colors.gray100};
   font-size: ${props => props.fontSize};
   color-scheme: dark;

   &:focus {
      outline: none;
      border: none;
   }

   &::placeholder {
      color: #7D7D7D;
   }
`

export const WrapperGoogle = styled(Wrapper)`
   display: flex;
   justify-content: center;
   cursor: pointer;
`

export const GoogleIcon = styled.img`
   width: 2rem;
`

export const Text = styled.span`
   font-size: .8rem;
   font-weight: 500;
   font-family: 'Poppins';
   color: ${Colors.gray100};
`

export const EyeWrapper = styled.span`
   cursor: pointer;
   margin: 0;
   padding: 0;
   display: flex;
   justify-content: center;
   align-items: center;
`

export const InputAndIcon = styled.span`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 8px;
`

export const Textarea = styled.textarea`
   width: 100%;
   background-color: transparent;
   border: none;
   font-family: 'Poppins', sans-serif;
   color: ${Colors.gray100};
   font-size: ${props => props.fontSize};
   color-scheme: dark;
   resize: none;

   &:focus {
      outline: none;
      border: none;
   }

   &::placeholder {
      color: #7D7D7D;
   }
`