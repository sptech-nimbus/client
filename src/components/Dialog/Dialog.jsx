/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as D from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import Label from '@components/Label/Label';
import Input from '@components/Input/Input';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { TextValidation, PastDateValidation } from '@utils/Validations';

import * as S from "./Dialog.styled";
import * as LS from '../../pages/Login/Login.styles';


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

export function Dialog({ title, children, trigger, childTrigger, noClose, ...props }) { 
   return (
      <D.Root modal {...props}>
         <S.DialogTrigger asChild={childTrigger}>
            {trigger}
         </S.DialogTrigger>

         <D.Portal>
            <S.DrawerOverlay />
            <S.DialogContent>
               <S.DrawerHeader>
                  <S.DialogTitle>
                     {title}
                  </S.DialogTitle>
                  {
                  !noClose &&
                  <S.DrawerClose>
                     <X/>
                  </S.DrawerClose>
                  }
               </S.DrawerHeader>
               <S.DrawerDescription>
                  {children}
               </S.DrawerDescription>
            </S.DialogContent>
         </D.Portal>
      </D.Root>
   )
}

export function DialogClose({ children }) {
   return (
      <D.Close asChild>
         { children }
      </D.Close>
   )
}

export function DeleteDialog({ athlete, trigger }) {
    return (  
        <D.Root>
            <S.DialogTrigger>
                {trigger}
            </S.DialogTrigger>

            <D.Portal>
                <S.DrawerOverlay/>
                    <S.DialogDeleteContent
                        width='45vw'
                    >
                       <S.DrawerHeader>
                           <S.DeleteDialogTitle>
                              Excluir o jogador
                           </S.DeleteDialogTitle>
                           <S.DrawerClose>
                              <X/>
                           </S.DrawerClose>
                        </S.DrawerHeader>
                        <S.DelS>
                           <S.DeleteDescription
                              display='block'
                              flexdirection='row'
                           >
                              Tem certeza que deseja excluir o atleta <strong>{athlete.firstName} {athlete.lastName}</strong>?
                           </S.DeleteDescription>
                           <S.ButtonDelete
                              value='Excluir Jogador'
                              width='10rem'
                              size='sm'
                              fontSize='1rem'
                           />
                        </S.DelS>
                    </S.DialogDeleteContent>
            </D.Portal>
        </D.Root>
    )
}

export function UpdateDialog({ athlete, trigger }) {
   return (  
       <D.Root>
           <S.DialogTrigger>
               {trigger}
           </S.DialogTrigger>
           <D.Portal>
               <S.DrawerOverlay/>
                   <S.DialogDeleteContent
                     width='fit-content'
                   >
                      <S.DrawerHeader>
                          <S.DeleteDialogTitle>
                             Editar o jogador
                          </S.DeleteDialogTitle>
                          <S.DrawerClose>
                             <X/>
                          </S.DrawerClose>
                       </S.DrawerHeader>
                       <S.DelS>
                          <S.DeleteDescription
                              width='90%'
                              display='flex'
                              flexdirection='row'
                              gap='5rem'
                              justify='center'
                              align='center'
                          >
                              <LS.InputsContainer>
                                 <Label>
                                       <span>Nome <S.Mandatory>*</S.Mandatory></span>
                                       <S.InputLine>
                                          <Input.Default
                                             placeholder={athlete.firstName}
                                             value={athlete.firstName}
                                          />
                                       </S.InputLine>
                                 </Label>
                                 <Label>
                                    <span>E-mail <S.Mandatory>*</S.Mandatory></span>
                                    <S.InputLine>
                                       <Input.Default
                                          placeholder={athlete.email}
                                          value={athlete.email}
                                       />
                                    </S.InputLine>
                                 </Label>
                                 <Label>
                                    Peso
                                    <S.InputLine>
                                          <Input.Masked
                                             placeholder={athlete.weight}
                                             value={athlete.weight}
                                          />
                                    </S.InputLine>
                                 </Label>
                                 <Label>
                                    Posição
                                    <Input.Default
                                       placeholder={'Pivo'}
                                       value={athlete.position}
                                       width='100%'
                                    />
                              </Label>
                              </LS.InputsContainer>
                              <LS.InputsContainer>
                                 <Label>
                                    <span>Sobrenome <S.Mandatory>*</S.Mandatory></span>
                                    <S.InputLine>
                                       <Input.Default
                                          placeholder={athlete.lastName}
                                          value={athlete.lastName}
                                       />
                                    </S.InputLine>
                                 </Label>
                                 <Label>
                                    Telefone
                                    <S.InputLine>
                                       <Input.Masked
                                          mask={'(00) 00000-0000'}
                                          placeholder={athlete.phone}
                                          value={athlete.phone}
                                       />
                                    </S.InputLine>
                                 </Label>
                                 <Label>
                                    Altura
                                    <S.InputLine>
                                          <Input.Masked
                                             placeholder={'1.90m'}
                                             value={athlete.height}
                                             width='50%'
                                          />
                                    </S.InputLine>
                                 </Label>
                                 <Label>
                                    Categoria
                                    <Input.Masked
                                       mask={'Sub-00'}
                                       placeholder={'Sub-20'}
                                       value={athlete.category}
                                       width='40%'
                                    />
                                 </Label>
                              </LS.InputsContainer>
                          </S.DeleteDescription>
                          <S.ButtonDelete
                             value='Salvar'
                             width='10rem'
                             size='sm'
                             fontSize='1rem'
                          />
                       </S.DelS>
                   </S.DialogDeleteContent>
           </D.Portal>
       </D.Root>
   )
}