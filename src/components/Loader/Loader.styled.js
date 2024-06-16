import styled, { keyframes, css } from 'styled-components';
import { Colors } from "@utils/Helpers";

const l9 = keyframes`
  0% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
  20% {
    background-position: 0 0, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0 100%, 50% 0, 100% 50%;
  }
  60% {
    background-position: 0 50%, 50% 100%, 100% 0;
  }
  80% {
    background-position: 0 50%, 50% 50%, 100% 100%;
  }
  100% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
`;

export const StyledLoader = styled.div`
  width: 100px;
  height: 40px;
  --g: radial-gradient(farthest-side, #0000 calc(95% - 3px), ${props=> props.color ?? Colors.orange500} calc(100% - 3px) 98%, #0000 101%) no-repeat;
  background: var(--g), var(--g), var(--g);
  background-size: 30px 30px;
  animation: ${l9} 1s infinite alternate;
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.$fullScreen && css`
    width: 100vw;
    height: 100vh;
  `}
`