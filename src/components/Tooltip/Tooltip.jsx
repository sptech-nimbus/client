import { Info } from '@phosphor-icons/react';
import * as S from './Tooltip.styled';
import * as T from '@radix-ui/react-tooltip';

function checkSide(side) {
   const check = side == 'top' || side == 'bottom' || side == 'left' || side == 'right';

   if(!check) {
      console.error(`
      Aviso: O valor passado para a prop "side" não está dentro dos valores esperados. O valor foi substituído por um valor padrão.\n
      Valores esperados: 'top', 'left', 'bottom', 'right'.
      `);
      return 'top';
   }

   return side;
}

export default function Tooltip({children, icon, open, side = 'right', color, onHover}) {
   side = checkSide(side);

   return (
      <T.Provider>
         <T.Root open={open}>
            <S.Trigger color={color} onMouseEnter={onHover} onMouseLeave={onHover}>
               {icon ?? <Info size={25} weight='fill'/>}
            </S.Trigger>
            <S.Content side={side} avoidCollisions={false}>
               {children}
            <S.Arrow />
            </S.Content>
         </T.Root>
      </T.Provider>
   )
}

export function TooltipInput({children, icon, open, side = 'right', color, onHover}) {
   side = checkSide(side);

   return (
      <T.Provider>
         <T.Root open={open}>
            <S.TriggerInput color={color} onMouseEnter={onHover} onMouseLeave={onHover}>
               {icon ? icon : <Info size={25} weight='fill'/>}
            </S.TriggerInput>
            <S.Content side={side} avoidCollisions={false}>
               {children}
            <S.Arrow />
            </S.Content>
         </T.Root>
      </T.Provider>
   )
}