import * as D from "@radix-ui/react-dialog";
import * as S from "./Dialog.styled";
import { X } from "@phosphor-icons/react";

export function Drawer({title, children, trigger}) {
   return (
      <D.Root>
         <S.DialogTrigger>
            {trigger}
         </S.DialogTrigger>
         <D.Portal>
            <S.DialogOverlay />
            <S.DialogContent>
               <S.DialogHeader>
                  <S.DialogTitle>
                     {title}
                  </S.DialogTitle>
                  <S.DialogClose>
                     <X/>
                  </S.DialogClose>
               </S.DialogHeader>
               <S.DialogDescription>
                  {children}
               </S.DialogDescription>
            </S.DialogContent>
         </D.Portal>
      </D.Root>
   )
}
