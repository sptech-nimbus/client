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
   IdentificationCard
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import Popover from "@components/Popover/Popover";

export default function Sidebar({page, logo, children}) {
   const navigate = useNavigate();
   const { logout } = useAuth();

   return (
      <S.Container>
         {logo ? logo : <Placeholder /> }
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
            <S.Icon onClick={() => navigate('/register-stats')} title='Cadastrar estatísticas'>
               <IdentificationCard
                  weight={page == 'register-stats' ? 'fill' : 'regular'} size={32}
               />
            </S.Icon>
         </S.IconGroup>
         {children}
         <S.IconGroupFooter>
            <S.Icon title='Configurações'>
               <Popover trigger={<Gear weight={page == 'settings' ? 'fill' : 'regular'}/>} side='right' sideOffset={20}>
                  <S.MenuList>
                     <S.MenuItem>Conta</S.MenuItem>
                     <S.MenuItem>Meus times</S.MenuItem>
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