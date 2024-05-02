import styled from "styled-components";
import Colors from "@utils/Colors";

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
   padding: 2rem 6rem;
   gap: 2rem;
`

export const HomeGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: repeat(10, 1fr);
   width: 100%;
   height: 100%;
   max-height: 100%;
   box-sizing: border-box;
   align-items: stretch;
   gap: 1.2rem;
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

   &:nth-child(1) {
      grid-row: 1 / 6;
   }
   &:nth-child(2) {
      grid-row: 1 / 5;
   }
   &:nth-child(3) {
      grid-row: 5 / 11;
   }
   &:nth-child(4) {
      grid-row: 6 / 11;
   }
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