import styled, { css } from "styled-components";
import { Colors } from "@utils/Helpers";

export const PageContainer = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   overflow: hidden;
`

export const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 95vw;
   height: 100vh;
   padding: 2rem 10rem;
   gap: 2rem;
`

export const TopContainer = styled.div`
   display: flex;
   gap: 4rem;
   align-items: center;
`

export const EventsOptions = styled.div`
   display: flex;
   gap: 3rem;
`

export const Option = styled.span`
   cursor: pointer;
   position: relative;

   &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -.2rem;
      width: ${props => props.$active ? '100%' : '0'};
      height: 3px;
      border-radius: 4px;
      background-color: ${Colors.orange500};
   }
`

export const AgendaGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: 1fr;
   width: 100%;
   height: 90%;
   box-sizing: border-box;
   gap: 2rem;
   flex-wrap: nowrap;
`

export const Container = styled.div`
   display: flex;
   align-items: center;
`

export const Form = styled.form`
   display: flex;
   width: 100%;
   height: 100%;
   flex-direction: column;
   gap: 1.2rem;
   height: 100%;
   justify-content: center;
`

export const Flex = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 1rem;
`

export const DescSize = styled.span`
   position: absolute;
   right: 8px;
   bottom: 4px;
   font-family: 'Inter';
   font-size: .8rem;
   color: #808080;
`

export const AgendaContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 2rem;
`

export const Subtitles = styled.div`
   display: flex;
   gap: 2rem;
   font-size: .8rem;
`

export const Subtitle = styled.span`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: .5rem;
`

export const EventsContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   background-color: ${Colors.gray700};
   border: 1px solid #4E4E4E;
   border-radius: 1rem;
   padding: 1rem 1.2rem;
   box-sizing: border-box;
   gap: 2rem;
`

export const EventsContainerHeader = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: 4px;
`

export const EventsList = styled.div`
   width: 100%;
   height: 100%;
   max-height: 65vh;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   overflow: auto;
   padding-right: 8px;

   &::-webkit-scrollbar {
      width: 6px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: ${Colors.gray700};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 8px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: ${Colors.orange300}; 
   }
`

export const Event = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   height: 4rem;
   background-color: ${Colors.gray800};
   border-radius: .8rem;
   padding: 1rem;
`

export const EventType = styled.div`
   width: 15px;
   height: 15px;
   background-color: ${props => props.type == 'match' ? Colors.red : Colors.green};
   border-radius: 50%;

   ${props => (props.type == 'match' && !props.$finished) && css`
      background-color: ${Colors.orange500};
   `}
`

export const EventSection = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: .5rem;
`

export const Adversary = styled.span`
   width: 15ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`