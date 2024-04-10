import styled from 'styled-components';
import Colors from "@utils/Colors";
import { MagnifyingGlass } from "@phosphor-icons/react";

export const PageContainer = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
`

export const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 95vw;
   height: 100vh;
   padding: 1rem 8rem;
   gap: 2rem;
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

export const PlayerImage = styled.img`
   width: 250px;
   height: 250px;
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

export const CardsContainer = styled.div`
   display: flex;
   width: 100%;
   height: ${props => props.hasData ? 'fit-content' : '70vh'};;
   max-height: 70vh;
   overflow-y: ${props => props.hasData ? "scroll" : "hidden"};
   justify-content: ${props => props.hasData ? 'space-between' : 'center'};
   align-items: ${props => props.hasData ? 'start' : 'center'};
   flex-wrap: wrap;
   gap: 3rem;
   padding-right: 1rem;

   &::-webkit-scrollbar {
      width: 10px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: ${Colors.gray700};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 10px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: #b30000; 
   }
`

export const TableWrapper = styled.div`
   width: 100%;
   max-height: 70vh;
   overflow-y: scroll;
   padding-right: 1rem;

   &::-webkit-scrollbar {
      width: 10px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: ${Colors.gray700};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 10px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: #b30000; 
   }
`

export const Table = styled.table`
   width: 100%;
   box-sizing: border-box;
   border-spacing: 0;
   overflow: scroll;
`  

export const PlayerTableImage = styled.img`
   width: 3.5rem;
   border-radius: 0.5rem;
`

export const Thead = styled.thead`
   background-color: ${Colors.orange500};
   position: sticky;
   top: 0; 
   z-index: 1; 
`

export const Tbody = styled.tbody`
   background-color: ${Colors.gray800};
`

export const Th = styled.th`
   text-align: start;
   background-color: ${Colors.orange500};
   padding: 0.5rem 1.8rem;
   font-family: "Catamaran";
   font-weight: 800;
   font-size: 1.2rem;

   &:first-child {
      border-top-left-radius: 1rem;
   }

   &:last-child {
      border-top-right-radius: 1rem;
   }
`

export const ThImg = styled(Th)`
   width: 5vw;
`

export const ThActions = styled(Th)`
   width: 5vw;
`

export const Td = styled.td`
   padding: 1.2rem 1.8rem;
`

export const TdActions = styled(Td)`
   display: flex;
   gap: .5rem;
`

export const EditButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 1.5rem;
   border: none;
   padding: .5rem;
   color: ${Colors.gray100};
   border-radius: .5rem;
   background-color: ${Colors.green};
   cursor: pointer;
`

export const DeleteButton = styled(EditButton)`
   background-color: ${Colors.red};
`

export const InfoButton = styled(EditButton)`
   background-color: ${Colors.orange500};
`

export const NotFoundMessage = styled.span`
   color: #a6a6a6;
   font-family: 'Catamaran';
   font-weight: 800;
   font-size: 2rem;
`

export const SearchIcon = styled(MagnifyingGlass)`
   cursor: pointer;
   transition: all .2s ease-in;
    
   &:hover {
      color: ${Colors.orange500};
   }
`