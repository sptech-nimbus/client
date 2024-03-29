import { useState } from 'react';
import * as C from './styles';
import { Eye, EyeClosed, LockSimple } from '@phosphor-icons/react';

function InputDefault({type, placeholder, children, width}) {
   return (
         <C.Wrapper>
            <C.InputAndIcon>
               {children}
               <C.Input
               type={type ? type : 'text'}
               placeholder={placeholder}
               width={width}
               />
            </C.InputAndIcon>
         </C.Wrapper>
   )
}

function InputPassword({placeholder, width}) {
   const [isVisible, setIsVisible] = useState(false); 

   const toggleVisibility = () => {
      setIsVisible(!isVisible);
   }

   return (
      <C.Wrapper>
            <C.InputAndIcon>
               <LockSimple />
               <C.Input
               type={isVisible ? 'text' : 'password'}
               placeholder={placeholder}
               width={width}
               />
            </C.InputAndIcon>
         <C.EyeWrapper onClick={toggleVisibility}>
            {isVisible ? <EyeClosed size={25}/> : <Eye size={25}/>}
         </C.EyeWrapper>
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
   Google: ContinueWithGoogle,
   Password: InputPassword
}