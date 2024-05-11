import styled from "styled-components";

export const BackgroundDiv = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-image: url('/src/assets/elements/background-noise.png');
   background-size: cover;
   mix-blend-mode: overlay;
   z-index: -1;
`

export const WaveVector = styled.img`
   position: absolute;
   bottom: -2%;
   left: 0;
   width: 100%;
`