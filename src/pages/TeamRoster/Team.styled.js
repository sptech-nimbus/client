import styled from 'styled-components';
import Colors from "@utils/Colors";

export const PageContainer = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   background-color: ${Colors.gray900};
`

export const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 95vw;
   height: 100vh;
   padding: 1rem 3rem;
`

export const MainContainer = styled.div`
   display: flex;
   flex-direction: column;  
`

export const FilterLine = styled.div`
   display: flex;
   align-items: center;
   margin: 0;
   padding: 0;
   color: ${Colors.orange500};
   gap: 1rem;
`