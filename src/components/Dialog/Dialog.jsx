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

export function Dialog({title, children, trigger}) {
   return (
      <D.Root>
         <S.DialogTrigger>
            {trigger}
         </S.DialogTrigger>
         <D.Portal>
            <S.DrawerOverlay />
            <S.DialogContent>
               <S.DrawerHeader>
                  <S.DialogTitle>
                     {title}
                  </S.DialogTitle>
                  <S.DrawerClose>
                     <X/>
                  </S.DrawerClose>
               </S.DrawerHeader>
               <S.DrawerDescription>
                  {children}
               </S.DrawerDescription>
            </S.DialogContent>
         </D.Portal>
      </D.Root>
   )
}

export function DeleteDialog({ athlete, trigger }) {
    return (
        <D.Root>
            <S.DialogTrigger>
                {trigger}
            </S.DialogTrigger>
            <D.Portal>
                <S.DialogOverlay>
                    <S.DialogHeader>
                        <S.DialogTitle>
                            Deseja Excluir o jogador {athlete.name}
                        </S.DialogTitle>
                        <S.DialogClose>
                            <X/>
                        </S.DialogClose>
                    </S.DialogHeader>
                    <S.DialogDescription>
                        <S.Container>
                            <S.Header>
                                <span>{athlete.name}</span>
                                <span>{athlete.position}</span>
                            </S.Header>
                            <S.Description>{athlete.description}</S.Description>
                        </S.Container>
                        <S.ConfirmationText>
                            Tem certeza que deseja excluir o atleta <strong>{athlete.name}</strong>?
                        </S.ConfirmationText>
                        <S.Buttons>
                            <S.CancelButton>Cancelar</S.CancelButton>
                            <S.DeleteButton onClick={() => onDelete(athlete.id)}>Excluir</S.DeleteButton>
                        </S.Buttons>
                    </S.DialogDescription>
                </S.DialogOverlay>
            </D.Portal>
        </D.Root>
    )
}
