import * as C from './styles';

function PrimaryButton({value, size}) {
   return (
      <>
         <C.PrimaryButton 
         type='submit'
         value={value}
         size={size}
         />
      </>
   )
}

function SecondaryButton({value, size}) {
   return (
      <>
         <C.SecondaryButton 
         type='submit'
         value={value}
         size={size}
         />
      </>
   )
}

export const Button = {
   Primary: PrimaryButton,
   Secondary: SecondaryButton
}