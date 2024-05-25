import * as P from "@radix-ui/react-popover";
import * as S from './Popover.styled';

export default function Popover({ trigger, children, side, ...props }) {
   return (
      <P.Root>
         <P.Trigger asChild>
            {trigger}
         </P.Trigger>
         <P.Portal>
            <S.PContent side={side} {...props}>
               {children}
               <S.PArrow />
            </S.PContent>
         </P.Portal>
      </P.Root>
   )
}