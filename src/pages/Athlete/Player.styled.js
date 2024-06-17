import styled, { keyframes, css } from "styled-components";
import { Colors } from "@utils/Helpers";
import { CaretLeft } from "@phosphor-icons/react";

import * as AthleteStyle from "../Match/OnGoingMatch/Match.styled"

const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
`;

export const Back = styled(CaretLeft)`
   position: absolute;
   color: ${Colors.orange100};
   left: -5%;
   top: 10%;
   cursor: pointer;
`

export const Flex = styled.span`
   display: flex;
   gap: 2rem;
`

export const TopLinkContainer = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   gap: 3rem;
`

export const TopLink = styled.span`
   cursor: pointer;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   
   &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -.5rem;
      width: ${props => props.$active ? '100%' : '0'};
      height: 4px;
      border-radius: 4px;
      background-color: ${Colors.orange500};
   }

   &:nth-child(5) {
      position: absolute;
      right: 0;
   }
`

export const PageContainer = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   overflow: hidden;
`

export const InfoWrapper = styled.div`
   width: 100%;
   height: 90vh;
   display: flex;
   flex-direction: column;
`

export const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 95vw;
   height: 100vh;
   padding: 1rem 15rem;
   gap: 1.5rem;
`

export const InfoGrid = styled.div`
   display: grid;
   grid-template-columns: 1.2fr 2fr;
   grid-template-rows: 2fr 1fr;
   width: 100%;
   height: 75vh;
   max-height: 100%;
   box-sizing: border-box;
   align-items: stretch;
   gap: 1.2rem;
   /* overflow: hidden; */
`

export const StatsGrid = styled(InfoGrid)`
   height: 90%;
   grid-template-columns: 1fr 1fr 1fr;
   grid-template-rows: repeat(10, 1fr);
`

export const Container = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   background-color: ${Colors.gray700};
   border: 1px solid #4E4E4E;
   border-radius: 1rem;
   padding: 1rem 1.2rem;
   box-sizing: border-box;
`

export const ContainerStats = styled(Container)`
   gap: .8rem;
   overflow: hidden;

   &:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      grid-row: 1 / 6;
      grid-column: 1 / 2;
   }

   &:nth-child(2) {
      grid-row: 1 / 7;
      grid-column: 2 / 4;
   }

   &:nth-child(3) {
      grid-row: 6 / 11;
      grid-column: 1 / 2;
   }

   &:nth-child(4) {
      grid-row: 7 / 11;
      grid-column: 2 / 4;
   }
`

export const FeedbackContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   width: 100%;
   height: 100%;
   padding-right: .5rem;
   overflow: auto;

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

export const PlayerImg = styled.img`
   width: 100%;
   height: 100%;
   max-width: 100%;
   max-height: 300px;
   object-fit: cover;
   object-position: center;
   border-radius: .5rem;
   border: 1px solid ${Colors.gray600};
`

export const InfomationContainer = styled.div`
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   gap: .6rem;
   padding-top: 1.5rem;
`

export const Information = styled.span`
   display: flex;
   gap: .5rem;
   color: ${Colors.orange100};
`

export const Label = styled.span`
   font-weight: bolder;
`

export const Buttons = styled.div`
   display: flex;
   gap: 1rem;
   width: 100%;
   grid-column: 1 / 2;
   margin-top: 1rem;
`

export const ChartContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 90%;
   box-sizing: border-box;
`

export const ChartTitle = styled.div`
   width: 100%;
   height: 5%;
   display: flex;
`

export const ComparisonContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: space-between;
   gap: 2rem;

   ${Container} {
      width: 100%;
      align-items: start;
      justify-content: start;
      gap: .5rem;
      box-sizing: border-box;
   }

   ${Flex} {
      justify-content: space-between;
   }

   ${InfomationContainer} {
      padding-top: 0;
   }

   ${ChartContainer} {
      height: 50%;
      flex-direction: column;
      gap: 2rem;
      padding-top: 2rem;
   }
`

export const StatsComparisonContainer = styled(ComparisonContainer)`
   ${Container} {
      justify-content: space-between;
   }
`

export const PlayerImgComparison = styled(PlayerImg)`
   width: 200px;
   height: 200px;
   max-width: 200px;
   min-height: 200px;
   max-height: 200px;
   min-width: 200px;
`

// -- injuries --

export const Column = styled.div`
   display: flex;
   flex-direction: column;

   span:nth-child(1) {
      font-size: .8rem;
      color: ${Colors.orange100};
   }
`

export const InjuryGrid = styled(InfoGrid)`
   height: 100%;
   grid-template-rows: .5fr 1fr 1fr 1fr;
   grid-template-columns: 1fr 1fr 1.5fr;

   ${Container} {
      &:nth-child(1) {
         grid-column: 1 / 3;
         grid-row: 1 / 2;
      }

      &:nth-child(2) {
         grid-column: 1 / 3;
         grid-row: 2 / 5;
      }

      &:nth-child(3) {
         grid-column: 3 / 4;
         grid-row: 1 / 5;
         background: none;
         border: none;
         padding: 0;
         gap: 1.2rem;
      }

      ${ChartContainer} {
         padding-top: 1rem;
      }
   }
`

export const InjuryContainer = styled(Container)`
   gap: .5rem;
`

export const InjuryHist = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   padding-right: .5rem;
   overflow-y: auto;

   &::-webkit-scrollbar {
      width: 4px;
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

export const Injury = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   border-radius: .8rem;
   padding: .5rem 1rem;
   gap: 1rem;
   background-color: ${Colors.gray800};
   justify-content: space-between;
   cursor: pointer;
`

export const InjuryInfo = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
`

export const InjuryContent = styled.div`
   display: grid;
   grid-template-columns: 1.5fr 1fr .2fr;
`

export const InjuryContentHidden = styled(InjuryContent)`
   overflow: hidden;
   &[data-state='open'] {
      animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
   }
  
   &[data-state='closed'] {
      animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
   }
`

export const Arrow = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
`

export const InfoContainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;

   span:nth-child(2) {
      font-size: 2rem;
      font-weight: 900;
   }
`

export const Severity = styled.span`
   font-size: 2rem !important;
   text-transform: uppercase;
   font-weight: 900 !important;
   color: ${props =>
      props.degree == 'Leve' ?
         Colors.green :
         props.degree == 'Média' ?
            Colors.yellow :
            Colors.red
   };
`

export const InjuryDashboard = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   align-items: center;

   gap: 2rem;
`

export const DashInfo = styled.div`
   display: flex;
   flex-direction: column;
   color: ${Colors.orange100};

   span:nth-child(1) {
      color: ${Colors.gray100};
      font-size: .9rem;
   }

   span:nth-child(2) {
      font-size: 1.8rem;
      font-weight: 900;
   }
`

export const NoInjury = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: center;
   flex-direction: column;
   gap: 1rem;
`

export const ToastContainer = styled.div`
   position: absolute;
`

export const DialogContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1rem;
`

export const DialogText = styled.div`
   font-size: 1.1rem;
`

export const AthletesList = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   max-height: 50vh;
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

export const Athlete = styled(AthleteStyle.Athlete)`
   cursor: pointer;
   border: 2px solid ${Colors.gray700};
   transition: .3s all ease-in;
   ${props => props.$active && css`
      border: 2px solid ${Colors.orange500};
   `}
`

export const Absolute = styled.div`
   position: absolute;
`

export const LoaderContainer = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`