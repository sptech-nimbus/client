import { useState } from 'react';
import * as S from './Input.styled';
import { Eye, EyeClosed, LockSimple } from '@phosphor-icons/react';

export function InputDefault({type, placeholder, children, width, fontSize, onChange, value='', disabled, ...props}) {
   return (
         <S.Wrapper disabled={disabled} width={width}>
            <S.InputAndIcon>
               {children}
               <S.Input
               type={type ? type : 'text'}
               placeholder={placeholder}
               fontSize={fontSize}
               value={value}
               onChange={onChange}
               disabled={disabled}
               {...props}
               />
            </S.InputAndIcon>
         </S.Wrapper>
   )
}

export function InputImage({type, placeholder, children, width, fontSize, onChange, disabled}) {
   return (
         <S.Wrapper disabled={disabled}>
            <S.InputAndIcon>
               {children}
               <S.Input
               type={type ? type : 'text'}
               placeholder={placeholder}
               width={width}
               fontSize={fontSize}
               onChange={onChange}
               disabled={disabled}
               />
            </S.InputAndIcon>
         </S.Wrapper>
   )
}

export function InputMasked({type, placeholder, children, width, fontSize, onChange, value='', mask, disabled,...props}) {
   return (
         <S.Wrapper disabled={disabled}>
            <S.InputAndIcon>
               {children}
               <S.MaskedInput
               type={type ? type : 'text'}
               mask={mask}
               placeholder={placeholder}
               width={width}
               fontSize={fontSize}
               value={value}
               onChange={onChange}
               disabled={disabled}
               {...props}
               />
            </S.InputAndIcon>
         </S.Wrapper>
   )
}

export function InputPassword({placeholder, width, fontSize, onChange, value='', hasIcon, disabled, ...props}) {
   const [isVisible, setIsVisible] = useState(false); 

   const toggleVisibility = () => {
      setIsVisible(!isVisible);
   }

   return (
      <S.Wrapper>
            <S.InputAndIcon>
               {hasIcon && <LockSimple />}
               <S.Input
               type={isVisible ? 'text' : 'password'}
               placeholder={placeholder}
               width={width}
               fontSize={fontSize}
               value={value}
               onChange={onChange}
               {...props}
               />
               <S.EyeWrapper onClick={toggleVisibility}>
                  {isVisible ? <EyeClosed size={25}/> : <Eye size={25}/>}
               </S.EyeWrapper>
            </S.InputAndIcon>
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

export function InputTextarea({placeholder, width, fontSize, onChange, value='', disabled, ...props}) {
   return (
         <S.Wrapper disabled={disabled} width={width}>
            <S.Textarea
            placeholder={placeholder}
            fontSize={fontSize}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
            />
         </S.Wrapper>
   )
}

const Input = {
   Default: InputDefault,
   Google: ContinueWithGoogle,
   Password: InputPassword,
   Masked: InputMasked,
   Image: InputImage,
   Textarea: InputTextarea
}

export default Input;