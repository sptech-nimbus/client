import styled from "styled-components";

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

export const AgendaGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: 1fr;
   width: 100%;
   height: 90%;
   box-sizing: border-box;
   gap: 1.2rem;
   flex-wrap: nowrap;
`

export const Container = styled.div`
   display: flex;
   align-items: center;
`