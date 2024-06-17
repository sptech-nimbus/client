/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as D from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import Label from '@components/Label/Label';
import Input from '@components/Input/Input';

import Loader from '@components/Loader/Loader';

import * as S from "./Dialog.styled";
import * as LS from '../../pages/Login/Login.styles';

import athlete from "../../api/athlete";
import athleteDesc from "../../api/athleteDesc";
import blobStorage from "../../api/blobStorage";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function Drawer({ title, children, trigger }) {
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
                     <X />
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
                        <X />
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

export function LoadingDialog({ open, ...props }) {
   return (
      <D.Root modal {...props} open={open}>
         <S.DialogTrigger>
         </S.DialogTrigger>

         <D.Portal>
            <S.DrawerOverlay />
            <S.LoadingContent>
               <Loader />
            </S.LoadingContent>
         </D.Portal>
      </D.Root>
   )
}

export function DialogClose({ children }) {
   return (
      <D.Close asChild>
         {children}
      </D.Close>
   )
}

export function DeleteDialog({ athleteInfo, trigger }) {
   const deleteAthlete = async () => {
      try {
         await athlete.registerTeam(athleteInfo, { id: '1f0dffe7-7d33-4ea8-896c-ce9696632daa' }, localStorage.getItem('token'));
         window.location.reload();
      }
      catch (error) {
         console.log(error);
      }
   }

   return (
      <D.Root>
         <S.DialogTrigger>
            {trigger}
         </S.DialogTrigger>

         <D.Portal>
            <S.DrawerOverlay />
            <S.DialogDeleteContent
            >
               <S.DrawerHeader>
                  <S.DeleteDialogTitle>
                     Excluir o jogador
                  </S.DeleteDialogTitle>
                  <S.DrawerClose>
                     <X />
                  </S.DrawerClose>
               </S.DrawerHeader>
               <S.DelS>
                  <S.DeleteDescription
                     display='block'
                     flexDirection='row'
                  >
                     Tem certeza que deseja excluir o atleta <strong>{athleteInfo.firstName} {athleteInfo.lastName}</strong>?
                  </S.DeleteDescription>
                  <S.ButtonDelete
                     value='Excluir Jogador'
                     width='10rem'
                     size='sm'
                     fontSize='1rem'
                     onClick={() => deleteAthlete()}
                  />
               </S.DelS>
            </S.DialogDeleteContent>
         </D.Portal>
      </D.Root>
   )
}

export function UpdateDialog({ athleteInfo, trigger }) {
   const [athleteData, setAthleteData] = useState(athleteInfo);
   console.log(athleteInfo);

   const updateImage = async () => {
      if (athleteData.newPicture) {
         try {
            const res = await blobStorage.post(athleteData.newPicture, localStorage.getItem('token'), localStorage.getItem('id'));
            console.log(res);
         }
         catch (err) {
            console.log(err);
         }
      }
      else {
         console.log('no new image');
      }
   }

   const updateAthlete = async () => {
      try {
         const athleteUpdate = {
            firstName: athleteData.firstName,
            lastName: athleteData.lastName,
            birthDate: athleteData.birthDate,
            phone: athleteData.phone,
            category: athleteData.category,
            isStarting: false,
            picture: athleteData.picture
         }

         const athleteDescUpdate = {
            weight: athleteData.weight,
            height: athleteData.height,
            position: athleteData.position,
            address: athleteData.address,
            number: athleteData.number,
            athlete: {
               id: localStorage.getItem('personaId')
            }
         }

         if (athleteData.newPicure) {
            delete playerData.picture;
         }

         await Promise.all([
            athlete.put(localStorage.getItem('personaId'), athleteUpdate, localStorage.getItem('token')),
            athleteDesc.put(localStorage.getItem('personaId'), athleteDescUpdate, localStorage.getItem('token')),
            updateImage()
         ]);
      } catch (error) {
         console.log(error);
      }
      finally {
         window.location.reload();
      }
   }

   return (
      <D.Root>
         <S.DialogTrigger>
            {trigger}
         </S.DialogTrigger>
         <D.Portal>
            <S.DrawerOverlay />
            <S.DialogDeleteContent
               width='fit-content'
            >
               <S.DrawerHeader>
                  <S.DeleteDialogTitle>
                     Editar o jogador
                  </S.DeleteDialogTitle>
                  <S.DrawerClose>
                     <X />
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
                                 name="firstName"
                                 placeholder={athleteData.firstName}
                                 value={athleteData.firstName}
                                 onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                              />
                           </S.InputLine>
                        </Label>
                        <Label>
                           <span>E-mail <S.Mandatory>*</S.Mandatory></span>
                           <S.InputLine>
                              <Input.Default
                                 name="email"
                                 placeholder={athleteData.email}
                                 value={athleteData.email}
                                 onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                              />
                           </S.InputLine>
                        </Label>
                        <Label>
                           Peso
                           <S.InputLine>
                              <Input.Masked
                                 name="weight"
                                 placeholder={athleteData.weight}
                                 value={athleteData.weight}
                                 onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                              />
                           </S.InputLine>
                        </Label>
                        <Label>
                           Posição
                           <Input.Default
                              name="position"
                              placeholder={'Pivo'}
                              value={athleteData.position}
                              width='100%'
                              onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                           />
                        </Label>
                        <Label>
                           Imagem
                           <Input.Default
                              name="newPicture"
                              type='file'
                              onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.files[0] })}
                           />
                        </Label>
                     </LS.InputsContainer>
                     <LS.InputsContainer>
                        <Label>
                           <span>Sobrenome <S.Mandatory>*</S.Mandatory></span>
                           <S.InputLine>
                              <Input.Default
                                 name="lastName"
                                 placeholder={athleteData.lastName}
                                 value={athleteData.lastName}
                                 onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                              />
                           </S.InputLine>
                        </Label>
                        <Label>
                           Telefone
                           <S.InputLine>
                              <Input.Masked
                                 name="phone"
                                 mask={'(00) 00000-0000'}
                                 placeholder={athleteData.phone}
                                 value={athleteData.phone}
                                 onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                              />
                           </S.InputLine>
                        </Label>
                        <Label>
                           Altura
                           <S.InputLine>
                              <Input.Masked
                                 name="height"
                                 placeholder={'1.90m'}
                                 value={athleteData.height}
                                 width='50%'
                                 onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                              />
                           </S.InputLine>
                        </Label>
                        <Label>
                           Categoria
                           <Input.Masked
                              name="category"
                              mask={'Sub-00'}
                              placeholder={'Sub-20'}
                              value={athleteData.category}
                              width='40%'
                              onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                           />
                        </Label>
                        <Label>
                           Número
                           <Input.Default
                              name="numbrt"
                              placeholder={athleteData.number ?? 'Não definido...'}
                              value={athleteData.number}
                              onChange={e => setAthleteData({ ...athleteData, [e.target.name]: e.target.value })}
                           />
                        </Label>
                     </LS.InputsContainer>
                  </S.DeleteDescription>
                  <S.ButtonDelete
                     value='Salvar'
                     width='10rem'
                     size='sm'
                     fontSize='1rem'
                     onClick={() => updateAthlete()}
                  />
               </S.DelS>
            </S.DialogDeleteContent>
         </D.Portal>
      </D.Root>
   )
}