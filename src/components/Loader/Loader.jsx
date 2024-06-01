import * as S from './Loader.styled.js';

export default function Loader({ color }) {
  return <S.StyledLoader color={color}/>
};

export function LoaderContainer({ children }) {
  return (
    <S.LoaderContainer>
      {children}
    </S.LoaderContainer>
  )
}
