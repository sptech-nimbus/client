import styled from "styled-components";
import { Colors } from "@utils/Helpers";

export const Flex = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
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
   width: 75vw;
   height: 100vh;
`

export const TopBar = styled.div`
   display: flex;
   align-items: center;
   padding: 2rem;
   height: 12vh;
   width: 100%;
   background-color: ${Colors.gray800};
   border-bottom: 1px solid ${Colors.gray600};
   gap: 1rem;

   img {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      border: 3px solid ${Colors.orange500};
   }

   span {
      font-size: 1.5rem;
      font-weight: 600;
      color: ${Colors.orange100};
   }
`

export const RightBar = styled.div`
   display: flex;
   align-items: center;
   padding: 1rem;
   flex-direction: column;
   height: 100%;
   width: 20vw;
   gap: 1.5rem;
   background-color: ${Colors.gray800};
   border-left: 1px solid ${Colors.gray600};
`

export const MessagesArea = styled.div`
   position: relative;
   width: 100%;
   height: 100%;
   padding: 1rem 2rem;
   gap: .5rem;
   display: flex;
   flex-direction: column;
`

export const MessagesContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 80%;
   max-height: 80%;
   width: 100%;
   overflow-y: auto;
   padding-right: .5rem;
   gap: .5rem;

   &::-webkit-scrollbar {
      width: 6px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: ${Colors.gray700};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 8px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: ${Colors.orange300}; 
   }
`

export const MessageBox = styled.div`
   width: 100%;
   display: flex;
   justify-content: ${props => props.isSender ? 'end' : 'start'};
`

export const CurrentUserContainer = styled.div`
   width: 100%;
   display: flex;
   gap: 1rem;

   span:nth-child(1) {
      font-weight: 600;
      font-size: 1.2rem;
      color: ${Colors.orange100};   
   }

   span:nth-child(2) {
      display: flex;
      align-items: center;
      gap: .3rem;
   }
`

export const CurrentUserInfo = styled.div`
   display: flex;
   flex-direction: column;
`

export const ListContainer = styled.div`
   width: 100%;
   height: 100%;

   span {
      font-family: 'Catamaran';
      color: #7D7D7D;
   }
`

export const OnlineList = styled.ul`
   height: 100%;
   margin: 0;
   padding: 0;
   list-style: none;
   overflow-y: auto;

   &::-webkit-scrollbar {
      width: 6px;
   }

   &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: ${Colors.gray700};
   }

   &::-webkit-scrollbar-thumb {
      background: ${Colors.orange500}; 
      border-radius: 8px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: ${Colors.orange300}; 
   }
`

export const Athlete = styled.li`
   display: flex;
   width: 100%;
   gap: 1rem;
   padding-block: .5rem;
`

export const AthleteInfo = styled(CurrentUserInfo)`
   display: flex;
   flex-direction: column;

   span:nth-child(1) {
      font-size: 1.2rem;
      color: ${Colors.orange100};
      font-weight: 600;
   }

   span:nth-child(2) {
      display: flex;
      align-items: center;
      gap: .3rem;
   }
`

export const AthleteImage = styled.img`
   width: 50px;
   height: 50px;
   background-color: aliceblue;
   border-radius: 50%;
   object-fit: cover;
   object-position: center;
`

export const StatusContainer = styled.div`
   display: flex;
   gap: .3rem;
   align-items: center;
`

export const StatusIndicator = styled.div`
   width: 10px;
   height: 10px;
   background-color: ${props => props.status == 'online' ? Colors.green : Colors.gray200};
   border-radius: 50%;
`

export const StatusText = styled.span`
   font-size: ${props => props.fontSize};
   color: ${props => props.status == 'online' ? Colors.orange100 : ''}!important;
`

export const InputContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 1rem;
`