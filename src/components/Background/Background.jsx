import * as S from './Background.styled.js';
import vectorWave from '@assets/elements/vector-wave.svg';

export function BackgroundDefault() {
   return (
      <S.BackgroundDiv />
   )
}

export function BackgroundLogin() {
   return (
      <>
         <S.WaveVector src={vectorWave}/>
         <S.BackgroundDiv />
      </>
   )
}

const Background = {
   Default: BackgroundDefault,
   Login: BackgroundLogin
}

export default Background;