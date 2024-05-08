import styled from "styled-components";
import Colors from "@utils/Colors";

export const Flex = styled.span`
   display: flex;
   gap: 2rem;
`

export const TopLinkContainer = styled.div`
   display: flex;
   gap: 3rem;
`

export const TopLink = styled.span`
   cursor: pointer;
   position: relative;
   
   &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -.5rem;
      width: ${props => props.active ? '100%' : '0'};
      height: 4px;
      border-radius: 4px;
      background-color: ${Colors.orange500};
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
   gap: 2rem;
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
   max-height: 100%;
   object-fit: cover;
   border-radius: .5rem;
   background-color: ${Colors.orange100};
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