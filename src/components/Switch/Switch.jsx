import * as S from './Switch.styled';
import Label from "@components/Label/Label";

export default function Switch({ label, id, ...props }) {
   return (
      <S.SwitchContainer>
         <Label text={label} htmlFor={id} />
         <S.SwitchRoot id={id} {...props}>
            <S.SwitchThumb/>
         </S.SwitchRoot>
      </S.SwitchContainer>
   )
}