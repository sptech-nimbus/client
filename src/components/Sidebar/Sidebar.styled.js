import styled from "styled-components";
import Colors from "@utils/Colors";
import { House, ChartDonut, NewspaperClipping, UsersFour, ChatCircleDots, CalendarBlank, Gear } from "@phosphor-icons/react";

export const Icon = styled.div`
   cursor: pointer;
   margin: 0;
   padding: 0;
   height: 2rem;
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

