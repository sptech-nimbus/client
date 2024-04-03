import * as S from "./Sidebar.styled";
import { House, ChartDonut, NewspaperClipping, UsersFour, ChatCircleDots, CalendarBlank, Gear } from "@phosphor-icons/react";

export default function Sidebar({page, logo, children}) {
   return (
      <S.Container>
         {logo}
         <S.IconGroup>
            <House
            weight={page == 'home' ? 'fill' : 'regular'}
            />
            <ChartDonut
            weight={page == 'dashboard' ? 'fill' : 'regular'}
            />
         </S.IconGroup>
         <S.IconGroup>
            <NewspaperClipping 
            weight={page == 'news' ? 'fill' : 'regular'}
            />
            <UsersFour 
            weight={page == 'team' ? 'fill' : 'regular'}
            />
            <ChatCircleDots 
            weight={page == 'chat' ? 'fill' : 'regular'}
            />
            <CalendarBlank 
            weight={page == 'calendar' ? 'fill' : 'regular'}
            />
         </S.IconGroup>
         {children}
         <S.IconGroup>
            <Gear 
            weight={page == 'settings' ? 'fill' : 'regular'}
            />
            <S.Line />
            <S.Image />
         </S.IconGroup>
      </S.Container>
   )

}

export function IconGroup({title, children}) {
   return (
      <S.IconGroup>
         <S.IconGroupTitle>title</S.IconGroupTitle>
         {children}
      </S.IconGroup>
   )
}