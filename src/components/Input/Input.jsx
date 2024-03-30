import { useState } from 'react';
import * as S from './Input.styled';
import { Eye, EyeClosed, LockSimple } from '@phosphor-icons/react';

function InputDefault({type, placeholder, children, width, fontSize, onChange, value=''}) {
   return (
         <S.Wrapper>
            <S.InputAndIcon>
               {children}
               <S.Input
               type={type ? type : 'text'}
               placeholder={placeholder}
               width={width}
               fontSize={fontSize}
               value={value}
               onChange={onChange}
               />
            </S.InputAndIcon>
         </S.Wrapper>
   )
}

function InputPassword({placeholder, width, fontSize, onChange, value=''}) {
   const [isVisible, setIsVisible] = useState(false); 

   const toggleVisibility = () => {
      setIsVisible(!isVisible);
   }

   return (
      <S.Wrapper>
            <S.InputAndIcon>
               <LockSimple />
               <S.Input
               type={isVisible ? 'text' : 'password'}
               placeholder={placeholder}
               width={width}
               fontSize={fontSize}
               value={value}
               onChange={onChange}
               />
            </S.InputAndIcon>
         <S.EyeWrapper onClick={toggleVisibility}>
            {isVisible ? <EyeClosed size={25}/> : <Eye size={25}/>}
         </S.EyeWrapper>
      </S.Wrapper>
   )
}

export function ContinueWithGoogle() {
   return (
      <S.WrapperGoogle>
         <S.GoogleIcon src="/public/google_icon.svg" alt="" />
         <S.Text>Continuar com o google</S.Text>
      </S.WrapperGoogle>
   )
}

const Input = {
   Default: InputDefault,
   Google: ContinueWithGoogle,
   Password: InputPassword
}

export default Input;