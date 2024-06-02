import * as S from './Match.styled.js';
import styled from 'styled-components';
import { Colors } from '@utils/Helpers';

export const PageContainer = styled(S.PageContainer)``

export const ContentContainer = styled(S.ContentContainer)``

export const Flex = styled(S.Flex)`
   display: flex;
` 

export const FinishedMatchGrid = styled.div`
   width: 100%;
   height: 100%;
   display: grid;
   grid-template-columns: repeat(6, 1fr);
   grid-template-rows: repeat(6, 1fr);
   gap: 1.2rem;
`

export const Container = styled(S.Container)`
   &:nth-child(1) {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
   }

   &:nth-child(2) {
      grid-column: 1 / 3;
      grid-row: 3 / 7;
   }

   &:nth-child(3) {
      grid-column: 3 / 5;
      grid-row: 1 / 7;
   }

   &:nth-child(4) {
      grid-column: 5 / 7;
      grid-row: 1 / 7;
      background-color: ${Colors.gray700};
      border: 1px solid #4E4E4E;
      padding: 1rem 1.2rem;
   }
`

export const TeamsContainer = styled(S.TeamsContainer)`
   width: 100%;
   height: 100%;
`

export const Team = styled(S.Team)``

export const TeamImage = styled(S.TeamImage)``