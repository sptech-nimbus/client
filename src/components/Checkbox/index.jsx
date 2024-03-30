import * as C from './styles'
import { Check } from "@phosphor-icons/react";

export function Checkbox({id, label}) {
   return (
      <C.CheckboxContainer>
      <C.CheckboxRoot id={id}>
         <C.CheckIndicator>
            <Check />
         </C.CheckIndicator>
      </C.CheckboxRoot>
      <label htmlFor={id}>{label}</label>
      </C.CheckboxContainer>
   )
}