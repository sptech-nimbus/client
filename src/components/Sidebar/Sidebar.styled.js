import styled from "styled-components";
import { Colors } from "@utils/Colors";

export const Container = styled.div`
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   width: 5vw;
   height: 100vh;
   background-color: ${Colors.gray700};
   font-size: 2rem;
   padding: 1.5rem;
`

export const IconGroup = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   gap: 1rem;
   text-align: center;
   color: ${Colors.orange100};
`

export const IconGroupTitle = styled.span`
   font-size: 0.7rem;
   font-weight: 600;
   text-transform: uppercase;
`

export const Line = styled.hr`
   width: 100%;
`

export const Image = styled.div`
   width: 3rem;
   height: 3rem;
   background-color: aliceblue;
   border-radius: 50%;
`