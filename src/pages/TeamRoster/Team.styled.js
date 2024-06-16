import styled from 'styled-components';
import { Colors } from "@utils/Helpers";
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
   padding: 1rem 6rem;
   gap: 2rem;
`

export const MainContainer = styled.div`
   display: flex;
   height: 100%;
   align-items: center;
   justify-content: center;
   flex-direction: column;  
`

export const FilterLine = styled.div`
   position: relative;
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
   border-radius: 1rem;
   object-fit: cover;
   object-position: center;
`

export const PlayerName = styled.span`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   overflow: hidden;
   font-family: "Catamaran";
   text-overflow: ellipsis;
   font-size: 1.5rem;
   font-weight: 600;
   text-align: justify;
   color: ${Colors.orange100};
`

export const NameIcons = styled.div`
   display: flex;
   align-items: center;
   gap: .2rem;
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
   border-radius: .4rem;
   color: ${Colors.orange100};
   background-color: ${Colors.orange500};
   cursor: pointer;
   transition: background-color .2s ease-in, border-color .2s ease-in, color .2s ease-in;

   &:hover {
      background-color: ${Colors.orange300};
   }

   &:nth-child(2) {
      background-color: ${Colors.green};
   }

   &:nth-child(3) {
      background-color: ${Colors.red};
   }
`

export const CardsContainer = styled.div`
   display: flex;
   width: 100%;
   height: ${props => props.$hasData ? 'fit-content' : '70vh'};;
   max-height: 70vh;
   overflow-y: ${props => props.$hasData ? "scroll" : "hidden"};
   justify-content: ${props => props.$hasData ? '' : 'center'};
   align-items: ${props => props.$hasData ? 'start' : 'center'};
   flex-wrap: wrap;
   gap: 5rem;
   padding-right: 1rem;

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

export const TableWrapper = styled.div`
   width: 100%;
   max-height: 70vh;
   overflow-y: scroll;
   padding-right: 1rem;

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

export const Table = styled.table`
   width: 100%;
   box-sizing: border-box;
   border-spacing: 0;
   overflow: scroll;
`

export const PlayerTableImage = styled.img`
   width: 3.5rem;
   border-radius: .5rem;
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
   padding: .5rem 1.8rem;
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

export const FiltersContainer = styled.div`
   width: 100%;
   height: 100%;
`

export const FilterTitle = styled.h3`
   font-size: 1.5rem;
`

export const Filter = styled.div`
   display: flex;
   flex-direction: column;
   gap: .2rem;
`

export const FilterDescription = styled.span`
   font-weight: 700;
   margin-bottom: 4px;
   font-size: 1rem;
`

export const Buttons = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   gap: .25rem;
`

export const NotFoundContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   color: #a6a6a6;
`

export const StartingPlayer = styled.button`
   padding-top: .4rem;
   font-size: 1.2rem;
   cursor: pointer;
   border: none;
   background-color: transparent;
   color: ${Colors.orange500};
`

export const Legend = styled.div`
   display: flex;
   align-items: center;
   color: ${Colors.orange100};
   gap: .5rem;
`

export const TitleContainer = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-items: center;
`