import * as S from './Background.styled.js'

export function BackgroundDefault() {
   return (
      <S.BackgroundDiv />
   )
}

export function BackgroundLogin() {
   return (
      <>
         <S.WaveVector src="/public/assets/vector-wave.svg"/>
         <S.BackgroundDiv />
      </>
   )
}

const Background = {
   Default: BackgroundDefault,
   Login: BackgroundLogin
}

export default Background;