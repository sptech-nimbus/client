import { useEffect, useState } from "react";
import * as S from "./Sidebar.styled";

import { useAuth } from "@contexts/auth";

import { 
   House, 
   ChartDonut, 
   UsersFour, 
   ChatCircleDots, 
   CalendarBlank, 
   Gear, 
   Placeholder, 
   Basketball
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import Popover from "@components/Popover/Popover";
import team from '@api/team';

import Utils from "@utils/Helpers";

export default function Sidebar({page, children}) {
   const [name, setName] = useState('' || sessionStorage.getItem('teamName'));
   const [picture, setPicture] = useState('' || sessionStorage.getItem('teamPicture'));
   const navigate = useNavigate();
   const { logout } = useAuth();

   useEffect(() => {
      async function fetchData() {
         const response = await team.get(sessionStorage.getItem('teamId'), localStorage.getItem('token')); 
         
         if(response.status === 200) {
            if(response.data.data.picture) {
               sessionStorage.setItem('teamPicture', response.data.data.picture);
               setPicture(response.data.data.picture);
            }
            sessionStorage.setItem('teamName', response.data.data.name);
            setName(response.data.data.name);
         }
      }
      fetchData();
   });

   return (
      <S.Container>
         {picture ? <S.TeamImage src={picture}/> : <S.NoImage title={name}>{name && Utils.getTeamInitials(name)}</S.NoImage>}
         <S.IconGroup>
            <S.Icon onClick={() => navigate('/home')} title='Home'>
               <House
               weight={page == 'home' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/dashboard')} title='Dashboard'>
               <ChartDonut
               weight={page == 'dashboard' ? 'fill' : 'regular'}
               />
            </S.Icon>
         </S.IconGroup>
         <S.IconGroup>
            <S.Icon onClick={() => navigate('/roster')} title='Elenco'>
               <UsersFour
               weight={page == 'team' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/chat')} title='Chat'>
               <ChatCircleDots
               weight={page == 'chat' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/events')} title='Agenda'>
               <CalendarBlank
               weight={page == 'agenda' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/match')} title='Cadastrar estatísticas'>
               <Basketball
                  weight={page == 'match' ? 'fill' : 'regular'} size={32}
               />
            </S.Icon>
         </S.IconGroup>
         {children}
         <S.IconGroupFooter>
            <S.Icon title='Configurações'>
               <Popover trigger={<Gear weight={page == 'settings' ? 'fill' : 'regular'}/>} side='right' sideOffset={20}>
                  <S.MenuList>
                     <S.MenuItem>Conta</S.MenuItem>
                     <S.MenuItem onClick={() => {navigate('/my-teams?auto=false')}}>Meus times</S.MenuItem>
                     <S.MenuItem>Configurações</S.MenuItem>
                     <S.MenuItem onClick={logout}>Sair</S.MenuItem>
                  </S.MenuList>
               </Popover>
            </S.Icon>
            <S.Line />
            <S.Image />
         </S.IconGroupFooter>
      </S.Container>
   )

}

export function IconGroup({children}) {
   return (
      <S.IconGroup>
         {children}
      </S.IconGroup>
   )
}