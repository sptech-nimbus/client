import styled, { css, keyframes } from "styled-components";
import { Colors } from "@utils/Helpers";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";

const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

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
      position: relative;
      grid-column: 2 / 4;
      grid-row: 1 / 2;
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

   &:nth-child(4) {
      gap: 1rem;
      padding: 0;
      background: none;
      border: none;
   }
`

export const TitleContainer = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const TeamsContainer = styled.div`
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
   width: 150px;
   height: 150px;
   border-radius: 1rem;
   object-fit: cover;
   object-position: center;
   background-color: ${props => props.src ? 'transparent' : Colors.gray200};
`

export const TeamInicials = styled.div`
   width: 150px;
   height: 150px;
   border-radius: 50%;
   background-color: ${props => props.src ? 'transparent' : Colors.gray500};
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 1.2rem;
   font-weight: 600;
   color: ${Colors.gray300};
`

export const Versus = styled.span`
   font-family: 'Catamaran';
   font-size: 2rem;
   font-weight: 900;
   color: ${Colors.orange500};
`

export const TeamName = styled.span`
   font-weight: 700;
   max-width: 16ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`

export const OnGoingPts = styled.div`
   width: 100%;
   height: 30%;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
`

export const Teams = styled.div`
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

   ${props => props.$isWinning && css`
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

   ${props => props.$adversary && css`
      cursor: pointer;
   `}
`

export const AthletesList = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   overflow-y: auto;
   padding-right: .5rem;

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

export const Athlete = styled.div`
   width: 100%;
   height: fit-content;
   background-color: ${Colors.gray800};
   border-radius: 1rem;
   display: flex;
   padding: 1rem;
   justify-content: space-between;
   flex-direction: column;
   gap: .7rem;
`

export const AthleteInfo = styled.div`
   display: flex;
   align-items: center;
   position: relative;
   gap: 1rem;
`

export const CollapsibleArrow = styled.div`
   position: absolute;
   right: 0;
   font-size: 1.2rem;
   cursor: pointer;
`

export const AthleteImage = styled.img`
   width: 60px;
   height: 60px;
   object-fit: cover;
   object-position: center;
   border-radius: 50%;
   background-color: ${props => props.src ? 'transparent' : Colors.gray200};
`

export const AthleteName = styled.span`
   font-weight: 600;
`

export const isPlaying = styled.span`
   width: fit-content;
   text-align: center;
   padding-inline: .8rem;
   background-color: ${props => props.$isPlaying ? Colors.green : Colors.gray500};
   color: ${Colors.gray100};
   border-radius: 1rem;
   font-size: .8rem;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
`

export const Column = styled.div`
   display: flex;
   flex-direction: column;
   gap: .5rem;
`

export const AccordionContent = styled(Accordion.Content)`
   &[data-state='open'] {
      animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
   }
  
   &[data-state='closed'] {
      animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
   }
`

export const Actions = styled.div`
   display: flex;
   justify-content: space-between;
   gap: .5rem;
   overflow: hidden;
   font-size: .9rem;
`

export const AddAction = styled.div`
   width: 100%;
   display: flex;
   gap: .5rem;
   flex-wrap: wrap;

   ${props => props.$adversary && css`
      flex-direction: column;
   `}
`

export const AddButton = styled.button`
   min-width: 70px;
   padding: .4rem;
   background-color: ${Colors.green};
   border: none;
   border-radius: 8px;
   color: ${Colors.gray100};
   font-weight: 600;
   cursor: pointer;
   transition: all .3s ease-in;
   font-size: .8rem;

   &:hover {
      filter: brightness(1.3);
   }
      
   ${props => props.$isError && css`
      background-color: ${Colors.red};
   `}
`

export const BigAddButton = styled(AddButton)`
   max-width: 165px;
   min-width: 165px;
`

export const PopoverContent = styled.div`
   display: flex;
   flex-direction: column;
   gap: .5rem;
`

export const Action = styled(motion.div)`
   border-radius: .5rem;
   padding: .5rem 1rem;
   background-color: ${Colors.gray600};
   cursor: pointer;
   width: fit-content;
`

export const TimerContainer = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   background-color: ${Colors.gray700};
   border: 1px solid #4E4E4E;
   border-radius: 1rem;
   padding: 1rem 1.2rem;
`

export const TimerButtons = styled.div`
   width: 100%;
   display: flex;
   gap: 1rem;
`

export const TimerButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   padding: .5rem;
   background-color: ${Colors.green};
   border-radius: .5rem;
   border: none;
   color: ${Colors.gray100};
   cursor: pointer;
   transition: all .3s ease-in;
   gap: .5rem;
   font-size: 1.5rem;

   &:hover {
      filter: brightness(1.3);
   }

   &:nth-child(2) {
      background-color: ${Colors.red};
   }
`

export const Timer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 50%;
   background-color: ${Colors.gray800};
   border-radius: 1rem;
   font-family: 'Inter';
   font-weight: 700;

   span {
      font-size: 2.4rem;
   }
`

export const Flags = styled.div`
   display: flex;
   flex-direction: column;
   gap: .5rem;
   align-items: center;

   span {
      text-decoration: underline;
      cursor: pointer;
   }
`

export const FlagButton = styled(TimerButton)`
   background-color: ${Colors.red};
   font-size: 1.2rem;
   font-weight: 600;
   font-family: 'Catamaran';
   border-radius: .8rem;
   padding: .4rem;

   &:nth-child(4) {
      height: 30px;
      font-size: 1rem;
      border-radius: .5rem;
      background-color: ${Colors.yellow};
   }
`

export const AddFlag = styled.div`
   display: flex;
   flex-direction: column;
   gap: .2rem;

   input {
      color: ${Colors.gray100};
      border: 1px solid ${Colors.gray600};
      border-radius: .4rem;
      padding: .4rem .8rem;
      background-color: ${Colors.gray800};
      font-family: 'Poppins';
   }
`

export const StartingPlayer = styled.button`
   position: absolute;
   right: 10%;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 0;
   font-size: 1.8rem;
   border-radius: 50%;
   border: none;
   background-color: transparent;
   color: ${Colors.orange500};
`

export const FinishMatch = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   text-align: center;

   span {
      font-size: 1.2rem;
   }

   div {
      display: flex;
      gap: 1rem;
   }
`

export const TitleContainerGoing = styled(TitleContainer)`
   justify-content: space-between;
`