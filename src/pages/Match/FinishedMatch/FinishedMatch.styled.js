import * as S from '../OnGoingMatch/Match.styled.js';
import * as Accordion from '@radix-ui/react-accordion';
import styled, { keyframes } from 'styled-components';
import { Colors } from '@utils/Helpers';
import { CaretDown } from '@phosphor-icons/react';

const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

export const PageContainer = styled(S.PageContainer)``

export const ContentContainer = styled(S.ContentContainer)`
   height: 100%;
   max-height: 100%;
`

export const Flex = styled(S.Flex)`
   display: flex;
   position: relative;
` 

export const FinishedMatchGrid = styled.div`
   width: 100%;
   height: 90%;
   max-height: 100%;
   display: grid;
   grid-template-columns: repeat(6, 1fr);
   grid-template-rows: repeat(6, 1fr);
   gap: 1.2rem;
`

export const Container = styled(S.Container)`
   &:nth-child(1) {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
   }

   &:nth-child(2) {
      grid-column: 1 / 3;
      grid-row: 3 / 7;
   }

   &:nth-child(3) {
      grid-column: 3 / 5;
      grid-row: 1 / 7;
   }

   &:nth-child(4) {
      grid-column: 5 / 7;
      grid-row: 1 / 7;
      background-color: ${Colors.gray700};
      border: 1px solid #4E4E4E;
      padding: 1rem 1.2rem;
   }
`

export const TeamsContainer = styled(S.TeamsContainer)`
   width: 100%;
   height: 100%;
   `
export const TeamImage = styled(S.TeamImage)`
   width: 80px;
   height: 80px;
`

export const FlagsContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   overflow-y: auto;
   gap: 1rem;

   &::-webkit-scrollbar {
      width: 8px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: ${Colors.gray700};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 10px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: ${Colors.orange300}; 
   }
`

export const Quarter = styled.div`
   width: 100%;
   height: fit-content;
   display: flex;
   flex-direction: column;
   padding: 1.2rem 1rem;
   background-color: ${Colors.gray800};
   border-radius: 1rem;
`

export const QuarterHead = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   position: relative;

   span {
      font-weight: 600;
      font-weight: 'Catamaran';
   }
`

export const Arrow = styled(CaretDown)`
   cursor: pointer;
`

export const QuarterFlags = styled.div`
   padding-top: .5rem;
   width: 100%;
   height: fit-content;
   max-height: 200px;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   overflow-y: auto;
   padding-right: .5rem;

   &::-webkit-scrollbar {
      width: 8px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: ${Colors.gray700};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 10px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: ${Colors.orange300}; 
   }
`

export const QuarterTitle = styled.span`
   color: ${Colors.gray200};
   font-size: .9rem;
   padding-block: .2rem;
`

export const Flag = styled.div`
   width: 100%;
   padding: .8rem;
   display: flex;
   flex-direction: column;
   background-color: ${Colors.gray900};
   border-radius: .5rem;
   gap: .25rem;
`

export const AccordionContent = styled(Accordion.Content)`
   display: flex;
   height: fit-content;
   flex-direction: column;
   overflow: hidden;

   &[data-state='open'] {
      animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
   }
  
   &[data-state='closed'] {
      animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
   }
`

export const FlagText = styled.span`
   font-size: .9rem;
   width: 100%;
`

export const FlagTime = styled.span`
   font-size: .9rem;
`

export const NoContent = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
`

export const Athlete = styled(S.Athlete)`
   cursor: pointer;
   border: 2px solid ${props => props.$active ? Colors.orange500 : Colors.gray800};
   transition: all .3s ease-in;
`

export const StatsContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
`

export const DurationContainer = styled.div`
   display: flex;
   flex-direction: column;

   span:nth-child(2) {
      font-size: 2rem;
      font-weight: 600;
      font-family: 'Inter';
   }
`

export const ButtonContainer = styled.div`
   position: absolute;
   right: 0;
`

export const AddNoteBtn = styled.div`
   position: absolute;
   right: 0;
   background-color: none;
   padding: .2rem;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: .4rem;
`

export const DialogContainer = styled.div`
   padding: 1rem 2rem;
`

export const LoadingContainer = styled.div`
   position: absolute;
`