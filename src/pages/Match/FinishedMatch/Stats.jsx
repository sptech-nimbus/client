import * as S from './FinishedMatch.styled';

export default function Stats({ stats }) {
   return (
      <>
         <S.Stats>
            <S.RowGrid>
               <div><span>Pontos:</span> <span>{stats.pts}</span></div>
               <div><span>Assistências:</span> <span>{stats.ast}</span></div>
            </S.RowGrid>
            <S.RowGrid>
               <div><span>Tocos:</span> <span>{stats.blk}</span></div>
               <div><span>Roubos:</span> <span>{stats.stl}</span></div>
            </S.RowGrid>
            <S.RowGrid>
               <div><span>Turnovers:</span> <span>{stats.turnover}</span></div>
               <div><span>Lances Livres:</span> <span>{stats.pts1} / {stats.pts1 + stats.pts1Err}</span></div>
            </S.RowGrid>
            <S.RowGrid>
               <div><span>Arremessos de 2:</span> <span>{stats.pts2} / {stats.pts2 + stats.pts2Err}</span></div>
               <div><span>Arremessos de 3:</span> <span>{stats.pts3} / {stats.pts3 + stats.pts3Err}</span></div>
            </S.RowGrid>
            <S.RowGrid>
               <div><span>Rebotes ofensivos:</span> <span>{stats.offReb}</span></div>
               <div><span>Rebotes defensivos:</span> <span>{stats.defReb}</span></div>
            </S.RowGrid>
            <div><span>Faltas:</span> <span>{stats.foul}</span></div>
         </S.Stats>
      </>
   )
}