import * as C from './styles';
import { CalendarBlank } from '@phosphor-icons/react';
import ReactDatePicker from 'react-datepicker';

function InputDefault({type, placeholder, children}) {
   return (
         <C.Wrapper>
            {children}
            <C.Input
            type={type ? type : 'text'}
            placeholder={placeholder}
            />
         </C.Wrapper>
   )
}

function InputPassword({type, placeholder, children}) {
   return (
      <C.Wrapper>
         
      </C.Wrapper>
   )
}

function ContinueWithGoogle() {
   return (
      <C.WrapperGoogle>
         <C.GoogleIcon src="/public/google_icon.svg" alt="" />
         <C.Text>Continuar com o google</C.Text>
      </C.WrapperGoogle>
   )
}

export const Input = {
   Default: InputDefault,
   Google: ContinueWithGoogle
}