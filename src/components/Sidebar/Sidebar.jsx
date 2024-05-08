import * as S from "./Sidebar.styled";
import Tooltip from "@components/Tooltip/Tooltip";
import { House, ChartDonut, NewspaperClipping, UsersFour, ChatCircleDots, CalendarBlank, Gear, Placeholder } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({page, logo, children}) {
   const navigate = useNavigate();

   return (
      <S.Container>
         {logo ? logo : <Placeholder /> }
         <S.IconGroup>
            <S.Icon onClick={() => navigate('/home')}>
               <House
               weight={page == 'home' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/dashboard')}>
               <ChartDonut
               weight={page == 'dashboard' ? 'fill' : 'regular'}
               />
            </S.Icon>
         </S.IconGroup>
         <S.IconGroup>
            <S.Icon onClick={() => navigate('/news')}>
               <NewspaperClipping
               weight={page == 'news' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/roster')}>
               <UsersFour
               weight={page == 'team' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/chat')}>
               <ChatCircleDots
               weight={page == 'chat' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon onClick={() => navigate('/events')}>
               <CalendarBlank
               weight={page == 'agenda' ? 'fill' : 'regular'}
               />
            </S.Icon>
         </S.IconGroup>
         {children}
         <S.IconGroupFooter>
            <S.Icon onClick={() => navigate('/config')}>
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