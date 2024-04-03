import * as S from "./Sidebar.styled";
import { House, ChartDonut, NewspaperClipping, UsersFour, ChatCircleDots, CalendarBlank, Gear } from "@phosphor-icons/react";

export default function Sidebar({page, logo, children}) {
   return (
      <S.Container>
         {logo}
         <S.IconGroup>
            <S.Icon>
               <House
               weight={page == 'home' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon>
               <ChartDonut
               weight={page == 'dashboard' ? 'fill' : 'regular'}
               />
            </S.Icon>
         </S.IconGroup>
         <S.IconGroup>
            <S.Icon>
               <NewspaperClipping
               weight={page == 'news' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon>
               <UsersFour
               weight={page == 'team' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon>
               <ChatCircleDots
               weight={page == 'chat' ? 'fill' : 'regular'}
               />
            </S.Icon>
            <S.Icon>
               <CalendarBlank
               weight={page == 'calendar' ? 'fill' : 'regular'}
               />
            </S.Icon>
         </S.IconGroup>
         {children}
         <S.IconGroupFooter>
            <S.Icon>
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