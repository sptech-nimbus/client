import * as S from './Button.styled';

export function PrimaryButton({value, size, width, fontSize, onClick}) {
   return (
      <>
         <S.PrimaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         fontSize={fontSize}
         onClick={onClick}
         />
      </>
   )
}

export function SecondaryButton({value, size, width, fontSize, onClick}) {
   return (
      <>
         <S.SecondaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         fontSize={fontSize}
         onClick={onClick}
         />
      </>
   )
}

const Button = {
   Primary: PrimaryButton,
   Secondary: SecondaryButton
}

export default Button;