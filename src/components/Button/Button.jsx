import * as S from './Button.styled';

export function PrimaryButton({value, size, width, fontSize, onClick, ...props}) {
   return (
      <>
         <S.PrimaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         fontSize={fontSize}
         onClick={onClick}
         {...props}
         />
      </>
   )
}

export function SecondaryButton({value, size, width, fontSize, onClick, ...props}) {
   return (
      <>
         <S.SecondaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         fontSize={fontSize}
         onClick={onClick}
         {...props}
         />
      </>
   )
}

const Button = {
   Primary: PrimaryButton,
   Secondary: SecondaryButton
}

export default Button;