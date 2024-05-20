import styled from "styled-components";
import Colors from "@utils/Colors";

export const Container = styled.div`
   width: 100%;
   height: fit-content;
   border-radius: 1rem;
   display: flex;
   flex-direction: column;
   gap: .5rem;
   background-color: ${Colors.gray700};
   border: 1px solid #4E4E4E;
   padding: 0.8rem;
   color: ${Colors.orange100};
   cursor: pointer;
`

// --------- header -----------
export const Header = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   font-weight: 600;
   font-size: .9rem;
   font-family: 'Catamaran', sans-serif;
`
