import * as S from "./Sidebar.styled";
import { 
   House, 
   ChartDonut, 
   NewspaperClipping, 
   UsersFour, 
   ChatCircleDots, 
   CalendarBlank, 
   Gear, 
   Placeholder, 
   CaretDown, 
   Swap,
   IdentificationCard
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import Popover from "@components/Popover/Popover";

export default function Sidebar({page, logo, children}) {
   const navigate = useNavigate();

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
            <S.Icon onClick={() => navigate('/news')} title='Mural de notícias'>
               <NewspaperClipping
               weight={page == 'news' ? 'fill' : 'regular'}
               />
            </S.Icon>
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
            <S.MoreIcon title="Mostrar mais...">
               <Popover trigger={<CaretDown weight="fill"/>} side='right' sideOffset={20}>
                  <S.PopoverContent>
                     <S.IconGroup>
                        <S.Icon onClick={() => navigate('/comparison')} title='Comparações'>
                           <Swap
                              weight={page == 'comparison' ? 'fill' : 'regular'} size={32}
                           />
                        </S.Icon>
                        <S.Icon onClick={() => navigate('/register-stats')} title='Cadastrar estatísticas'>
                           <IdentificationCard
                              weight={page == 'register-stats' ? 'fill' : 'regular'} size={32}
                           />
                        </S.Icon>
                     </S.IconGroup>
                     <S.EditIcons>Editar</S.EditIcons>
                  </S.PopoverContent>
               </Popover>
            </S.MoreIcon>
         </S.IconGroup>
         {children}
         <S.IconGroupFooter>
            <S.Icon onClick={() => navigate('/config')} title='Configurações'>
               <Gear
               weight={page == 'settings' ? 'fill' : 'regular'}
               />
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