import * as S from './Checkbox.styled'
import { Check } from "@phosphor-icons/react";

export default function Checkbox({id, label, checked, onClick}) {
   return (
      <S.CheckboxContainer>
      <S.CheckboxRoot id={id} checked={checked} onClick={onClick}>
         <S.CheckIndicator>
            <Check />
         </S.CheckIndicator>
      </S.CheckboxRoot>
      <label htmlFor={id}>{label}</label>
      </S.CheckboxContainer>
   )
}