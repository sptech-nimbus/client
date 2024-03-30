import * as S from './Button.styled';

export function PrimaryButton({value, size, width}) {
   return (
      <>
         <S.PrimaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         />
      </>
   )
}

export function SecondaryButton({value, size, width}) {
   return (
      <>
         <S.SecondaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         />
      </>
   )
}

const Button = {
   Primary: PrimaryButton,
   Secondary: SecondaryButton
}

export default Button;