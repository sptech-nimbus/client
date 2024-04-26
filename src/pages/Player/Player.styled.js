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
   padding: 1rem 18rem;
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
   overflow: hidden;
`

export const StatsGrid = styled(InfoGrid)`
   
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