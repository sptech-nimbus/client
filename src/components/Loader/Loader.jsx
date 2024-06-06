import * as S from './Loader.styled.js';

export default function Loader({ color }) {
  return <S.StyledLoader color={color}/>
};

export function LoaderContainer({ children, $fullWitdh }) {
  return (
    <S.LoaderContainer $fullWitdh={$fullWitdh}>
      {children}
    </S.LoaderContainer>
  )
}
