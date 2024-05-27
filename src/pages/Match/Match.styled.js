import styled, { css } from "styled-components";
import { Colors } from "@utils/Helpers";

export const Flex = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: 1fr;

   span {
      text-align: center;
   }
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

export const MatchGrid = styled.div`
   width: 100%;
   height: 90%;
   align-items: stretch;
   gap: 1.2rem;
   display: grid;
   flex-wrap: nowrap;
   grid-template-columns: repeat(5, 1fr);
   grid-template-rows: 1.5fr .5fr 1fr;
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

   &:nth-child(1) {
      grid-column: 1 / 4;
      grid-row: 1 / 2;
      /* background: none; */
   }

   &:nth-child(2) {
      grid-column: 1 / 4;
      grid-row: 2 / 4;
      /* background: none; */
   }

   &:nth-child(3) {
      grid-column: 4 / 6;
      grid-row: 1 / 4;

   }
`

export const TitleContainer = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const TeamsContainer = styled.div`
   padding: 0;
   background-color: none;
   border: none;
   display: flex;
   align-items: center;
   justify-content: center;
   justify-content: space-evenly;
`

export const Team = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   align-items: center;
`

export const TeamImage = styled.img`
   width: 180px;
   height: 180px;
   border-radius: 50%;
   object-fit: cover;
   object-position: center;
   background-color: ${props => props.src ? 'transparent': Colors.gray200};
   ${props => props.isWinning && css`
      border: 3px solid ${Colors.green};
   `}
`

export const Versus = styled.span`
   font-family: 'Catamaran';
   font-size: 2rem;
   font-weight: 900;
   color: ${Colors.orange500};
`

export const TeamName = styled.span`
   font-size: 1.5rem;
   font-weight: 600;
`

export const OnGoingPts = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
`

export const StatsContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`

export const StatsLabel = styled.span`
   font-weight: 600;
`

export const Pts = styled.span`
   font-size: 2.5rem;
   font-family: 'Inter';
   font-weight: 700;
   color: ${Colors.orange100};
   position: relative;
   transition: all .3s ease-in;

   ${props => props.isWinning && css`
      font-size: 3.2rem;
      font-weight: 900;

      &::after {
         content: '';
         position: absolute;
         width: 100%;
         height: 5px;
         left: 0;
         bottom: -2px;
         background-color: ${Colors.green};
         border-radius: 20px;
         transition: all .3s ease-in;
      }
   `}
`

export const AthletesList = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
`

export const Athlete = styled.div`
   width: 100%;
   height: 160px;
   background-color: ${Colors.gray800};
   border-radius: 1rem;
   display: flex;
   align-items: center;
   padding-inline: 1rem;
   padding-block: 1rem;
   justify-content: space-between;
   flex-direction: column;
`

export const AthleteInfo = styled.div`
   display: flex;
   align-items: center;
   gap: 1rem;
`

export const AthleteImage = styled.img`
   width: 60px;
   height: 60px;
   border-radius: 50%;
   background-color: ${props => props.src ? 'transparent' : Colors.gray200};
`

export const AthleteName = styled.span`
   font-weight: 600;
`

export const isPlaying = styled.span`
   color: ${props => props.isPlaying ? Colors.green : Colors.gray100};
`

export const Column = styled.div`
   display: flex;
   flex-direction: column;
`

export const AddPoints = styled.div`
   display: flex;
   gap: .5rem;
`

export const AddButton = styled.button`
   padding: .5rem;
   background-color: ${Colors.green};
   border: none;
   border-radius: 8px;
   color: ${Colors.gray100};
   font-weight: 600;
   font-size: 1.2rem;
   cursor: pointer;
   transition: all .3s ease-in;

   &:hover {
      filter: brightness(1.2);
   }
`