import styled from "styled-components";
import Colors from "@utils/Colors";

export const Flex = styled.span`
   display: flex;
   gap: 2rem;
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
   padding: 1rem 8rem;
   gap: 2rem;
`

export const InfoGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 2fr;
   grid-template-rows: 2fr 1fr .4fr;
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   align-items: stretch;
   gap: 1.5rem;
   padding-inline: 5rem;
   overflow: hidden;
`

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   background-color: ${Colors.gray700};
   border: 1px solid #4E4E4E;
   border-radius: 1rem;
   padding: 1rem 1.2rem;
   box-sizing: border-box;
`

export const PlayerImg = styled.img`
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: .5rem;
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
   height: 100%;
   grid-column: 1 / 2;
`