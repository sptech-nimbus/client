import styled from "styled-components";
import { Colors } from "@utils/Helpers";
import { House, ChartDonut, NewspaperClipping, UsersFour, ChatCircleDots, CalendarBlank, Gear } from "@phosphor-icons/react";

export const Icon = styled.div`
   cursor: pointer;
   margin: 0;
   padding: 0;
   height: 2rem;
   color: ${Colors.orange100};
`

export const MoreIcon = styled(Icon)`
   position: absolute;
   bottom: -20%;
   font-size: 1rem;
`

export const PopoverContent = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: .5rem;
   cursor: pointer;
`

export const EditIcons = styled.span`
   font-size: .8rem;
   color: ${Colors.orange100};
   text-decoration: underline;
`

export const Container = styled.div`
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   width: 5vw;
   height: 100vh;
   background-color: ${Colors.gray700};
   font-size: 2rem;
   padding: 1.5rem;
`

export const IconGroup = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   gap: 1rem;
   text-align: center;
   color: ${Colors.orange100};
`

export const IconGroupFooter = styled(IconGroup)`
   gap: .1rem;
`

export const IconGroupTitle = styled.span`
   font-size: .7rem;
   font-weight: 600;
   text-transform: uppercase;
`

export const Line = styled.hr`
   width: 80%;
`

export const Image = styled.div`
   width: 3rem;
   height: 3rem;
   background-color: aliceblue;
   border-radius: 50%;
`

export const MenuList = styled.ul`
   margin: 0;
   padding: 0;
   list-style: none;
`

export const MenuItem = styled.li`
   min-width: 80px;
   margin: 0;
   padding: .2rem .5rem;
   cursor: pointer;

   &:hover {
      background-color: ${Colors.gray700};
   }

   &:nth-child(3) {
      color: ${Colors.red};
   }
`

export const TeamImage = styled.img`
   width: 35px;
   height: 35px;
   border-radius: 50%;
   object-fit: cover;
   object-position: center;
`

export const NoImage = styled.div`
   width: 35px;
   height: 35px;
   overflow: hidden;
   font-size: 10px;
   font-weight: 800;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: ${Colors.gray200};
   color: ${Colors.gray500};
   border-radius: 50%;
`