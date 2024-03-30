import * as S from './Button.styled';

export function PrimaryButton({value, size, width, fontSize}) {
   return (
      <>
         <S.PrimaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         fontSize={fontSize}
         />
      </>
   )
}

export function SecondaryButton({value, size, width, fontSize}) {
   return (
      <>
         <S.SecondaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         fontSize={fontSize}
         />
      </>
   )
}

const Button = {
   Primary: PrimaryButton,
   Secondary: SecondaryButton
}

export default Button;