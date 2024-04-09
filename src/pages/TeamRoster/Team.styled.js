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
   padding: 1rem 8rem;
   gap: 1.2rem;
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

export const PlayerImage = styled.image`
   width: 200px;
   height: 200px;
   background-color: ${Colors.gray200};
   border-radius: 1rem;
`

export const PlayerName = styled.span`
   width: 100%;
   overflow: hidden;
   font-family: "Catamaran";
   text-overflow: ellipsis;
   font-size: 1.5rem;
   font-weight: 600;
   text-align: justify;
   color: ${Colors.orange100};
`

export const PlayerLine = styled.div`
   width: 100%;
   margin: 0;
   padding: 0;
   display: flex;
   justify-content: space-between;
   align-items: center;
`

export const PlayerPosition = styled.span`
   color: #C8C8C8;
`

export const ShowInfoButton = styled.button`
   width: 1.8rem;
   height: 1.8rem;
   display: flex;
   align-items: center;
   justify-content: center;
   border: none;
   border-radius: 0.4rem;
   color: ${Colors.orange100};
   background-color: ${Colors.orange500};
   cursor: pointer;
   transition: background-color .2s ease-in, border-color .2s ease-in, color .2s ease-in;

   &:hover {
      background-color: ${Colors.orange300};
   }
`