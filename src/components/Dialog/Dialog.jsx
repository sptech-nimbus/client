import * as D from "@radix-ui/react-dialog";
import * as S from "./Dialog.styled";
import { X } from "@phosphor-icons/react";

export function Drawer({title, children, trigger}) {
   return (
      <D.Root>
         <S.DrawerTrigger>
            {trigger}
         </S.DrawerTrigger>
         <D.Portal>
            <S.DrawerOverlay />
            <S.DrawerContent>
               <S.DrawerHeader>
                  <S.DrawerTitle>
                     {title}
                  </S.DrawerTitle>
                  <S.DrawerClose>
                     <X/>
                  </S.DrawerClose>
               </S.DrawerHeader>
               <S.DrawerDescription>
                  {children}
               </S.DrawerDescription>
            </S.DrawerContent>
         </D.Portal>
      </D.Root>
   )
}
