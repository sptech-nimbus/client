import styled from "styled-components";
import { Colors } from "@utils/Helpers";

export const Flex = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`

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

export const DashGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-template-rows: 1fr 1fr;
   width: 100%;
   height: 90%;
   max-height: 100%;
   box-sizing: border-box;
   align-items: stretch;
   gap: 1.2rem;
   flex-wrap: nowrap;
`

export const ComparisonGrid = styled(DashGrid)`
   grid-template-rows: 1fr 1fr 1fr;
`

export const Container = styled.div`
   position: relative;
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
   gap: .5rem;

   &:nth-child(2) {
      grid-column: 2 / 4;
   }
`

export const ComparisonContainer = styled(Container)`
   &:nth-child(2) {
      grid-column: 1 / 2;
   }
   &:nth-child(3) {
      grid-column: 2 / 4;
   }
`

export const SelectContainer = styled(Container)`
   padding: 0;
   border: none;
   background-color: transparent;
   border: none;

   grid-column: 1 / 4;
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

export const LoaderContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 1rem;

   span {
      text-align: center;
   }
`

export const OptionWithImage = styled.div`
   display: flex;
   align-items: center;
   gap: .5rem;
`

export const OptionImage = styled.img`
   width: 30px;
   height: 30px;
   border-radius: .5rem;
`

export const NoContent = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 1.2rem;
   color: #808080;
   padding: 2rem;
   text-align: center;
`