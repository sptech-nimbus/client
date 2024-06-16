import styled from "styled-components";
import { Colors } from "@utils/Helpers";

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
   gap: 1rem;

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

export const MatchContainer = styled(Container)`
   gap: 1.2rem;
   background: none;
   flex-direction: row;
   border: none;
   padding: 0;
`

export const MatchCard = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   border-radius: 1rem;
   background-color: ${Colors.gray700};
   border: 1px solid #4E4E4E;
   overflow: hidden;
`

export const MatchHeader = styled.div`
   width: 100%;
   height: 15%;
   background-color: ${Colors.gray800};
   padding: .5rem 1rem;
   color: ${Colors.orange100};
   font-weight: 600;
`

export const MatchTeams = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1rem 1.5rem;

   span {
      font-weight: 600;
      color: ${Colors.orange100};
   }
`

export const MatchTeamLogo = styled.div`
   width: 5.5vw;
   height: 5.5vw;
   border-radius: 50%;
   background: ${Colors.gray800};
   display: flex;
   align-items: center;
   justify-content: center;
`

export const MatchInfo = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   padding-inline: 1.5rem;

   span {
      color: ${Colors.orange100};
   }

   span:nth-child(1) {
      font-size: smaller;
      color: #7F7F7F;
   }
`

export const MatchResults = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: .5rem 1.5rem;
   color: ${Colors.orange100};

   span {
      font-size: larger;
   }
`

export const ChartContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 90%;
   box-sizing: border-box;
   padding-inline: 2rem;
`

export const ChartTitle = styled.div`
   width: 100%;
   height: 5%;
   display: flex;
`

export const Result = styled.div`
   padding: .2rem 1rem;
   border-radius: .5rem;
   font-size: .8rem;
   font-weight: 600;
   background-color: ${props => props.color
   };
`

export const MatchTeamImage = styled.img`
   width: 100%;
   height: 100%;
   border-radius: 50%;
   object-fit: cover;
   object-position: center;
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

export const PendingList = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   overflow-y: auto;
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

export const Pending = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: .7fr 1.4fr 1fr 1fr;
   background-color: ${Colors.gray800};
   padding: 1rem;
   border-radius: .8rem;   
   align-items: center;
   justify-content: space-between;
   gap: 1rem;

   span:nth-child(1) {
      font-weight: 600;
      color: ${Colors.orange100};
   }

   span:nth-child(2) {
      max-width: 20ch;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   span:nth-child(3) {
      text-align: center;
   }

   button {
      background: none;
      color: ${Colors.orange100};
      background-color: ${Colors.orange500};
      border: none;
      cursor: pointer;
      padding: .5rem;
      border-radius: .4rem;
      font-weight: 600;
   }

   button[disabled] {
      background-color: ${Colors.gray500};
      color: ${Colors.gray200};
   }
`

export const LoaderContainer = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const TeamInfoTitle = styled.div`
   display: flex;
   align-items: center;
   gap: 1rem;
   justify-content: space-between;

   div {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
   }
`

export const TeamInfoContainer = styled.div`
   width: 100%;
   height: 100%;
   display: grid;
   grid-template-columns: .8fr 1fr;
`

export const TeamImage = styled.div`
   width: 250px;
   height: 250px;
   max-width: 250px;
   max-height: 250px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: ${Colors.gray800};
   border: none;
   border-radius: 1rem;

   img {
      max-width: 250px;
      max-height: 250px;
      border-radius: 1rem;
      object-fit: cover;
      object-position: center;
   }

   span {
      font-size: 3rem;
      font-weight: 700;
   }
`

export const TeamInfo = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 0 1rem;
`