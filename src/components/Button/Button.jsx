import * as S from './Button.styled';
import { Colors } from '@utils/Helpers';

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

export function PillButtons({ 
   left='left', 
   right='right',
   onClick, 
   onClickLeft, 
   onClickRight, 
   color = Colors.orange500, 
   fontColor, 
   $active, 
   ...props 
   }) {
   return (
      <S.PillButtons>
         <S.LeftButton 
            color={color} 
            name={left} 
            onClick={onClickLeft ?? onClick}
            $active={$active == 'left'}
            fontColor={fontColor}
            {...props}
         >
            {left}
         </S.LeftButton>
         <S.RightButton 
            color={color} 
            name={right} 
            onClick={onClickRight ?? onClick}
            $active={$active == 'right'}
            fontColor={fontColor}
            {...props}
         >
            {right}
         </S.RightButton>
      </S.PillButtons>
   )
}

const Button = {
   Primary: PrimaryButton,
   Secondary: SecondaryButton,
   Pills: PillButtons,
}

export default Button;