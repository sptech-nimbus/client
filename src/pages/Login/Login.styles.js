import styled from "styled-components";
import { Colors } from "@utils/Helpers";

export const Title = styled.h1`
   position: absolute;
   top: 0;
   color: ${Colors.orange100};
   font-family: 'Catamaran', sans-serif;
   font-weight: 900;
   text-transform: uppercase;
   font-size: 3rem;
   margin: 0;

   @media (min-width: 1700px) {
      font-size: 6rem;
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
   justify-content: center;
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
   position: absolute;
   top: 30%;
   display: flex;
   flex-direction: column;
   gap: 1.2rem;
   width: 25vw;
   height: fit-content;
   z-index: 1;
   margin: auto;

   @media (max-width: 1000px) {
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

export const Highlight = styled.span`
   color: ${Colors.orange500};
  font-weight: 600;
`

export const LoadingButton = styled.img`
   display: flex;
   align-items: center;
   justify-content: center;
`

export const Underlined = styled.span`
   text-decoration: underline;
`