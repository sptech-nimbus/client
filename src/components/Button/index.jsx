import * as C from './styles';

function PrimaryButton({value, size, width}) {
   return (
      <>
         <C.PrimaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         />
      </>
   )
}

function SecondaryButton({value, size, width}) {
   return (
      <>
         <C.SecondaryButton 
         type='submit'
         value={value}
         size={size}
         width={width}
         />
      </>
   )
}

export const Button = {
   Primary: PrimaryButton,
   Secondary: SecondaryButton
}