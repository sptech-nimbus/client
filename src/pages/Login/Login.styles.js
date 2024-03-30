import styled from "styled-components";
import { Colors } from "../../values/colors";

export const Title = styled.h1`
   top: 0;
   color: ${Colors.orange100};
   font-family: 'Catamaran', sans-serif;
   font-weight: 900;
   text-transform: uppercase;
   font-size: 4rem;
   margin: 0;

   @media (min-width: 1700px) {
      font-size: 5rem;
      position: absolute;
   }

   @media (max-width: 800px) {
      font-size: 3rem;
   }

   @media (max-width: 599px) {
      font-size: 3rem;
   }
`

export const Header = styled.header`
   text-align: center;
   display: flex;
   align-items: center;
   flex-direction: column;
   position: relative;
   width: 100vw;
   height: 100vh;
   overflow: hidden;
   color: ${Colors.gray100};

   @media (max-width: 599px) {
      justify-content: center;
   }

   @media (max-width: 800px) {
      justify-content: center;
   }
`

export const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 1.2rem;
   width: 25vw;
   height: fit-content;
   z-index: 1;
   margin: auto;

   @media (max-width: 1100px) {
      width: 45vw;
   }

   @media (max-width: 800px) {
      width: 55vw;
   }

   @media (max-width: 599px) {
      width: 80vw;
   }
`

export const InputsContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1.2rem;
`

export const FormFooter = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1.5rem;
   margin-top: 1rem;
`

export const LineContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 1.5rem;
   color: ${Colors.orange100};
`

export const Line = styled.hr`
   background-color: ${Colors.orange100};
   width: 45%;
`

export const Link = styled.a`
   color: ${Colors.gray100};
   cursor: pointer;
`