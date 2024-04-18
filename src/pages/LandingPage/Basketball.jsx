import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { BasketballDiv } from './LandingPage.styled';

export default function Basketball() {
   const refContainer = useRef(null);

   useEffect(() => {
   }, []);

   return (
      <BasketballDiv ref={refContainer}></BasketballDiv>
   )
}