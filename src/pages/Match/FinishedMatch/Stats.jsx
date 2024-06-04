import * as S from './FinishedMatch.styled';

export default function Stats({ stats }) {
   return (
      <>
         <S.Stats>
            <span> Pontos: {stats.stats.pts} </span>
            <span> Assistências: {stats.stats.ast} </span>
            <span> Tocos: {stats.stats.blk} </span>
            <span> Roubos: {stats.stats.stl} </span>
            <span> Turnovers: {stats.stats.turnover} </span>
            <span> Lances Livres: {stats.stats.pts1} / {stats.stats.pts1 + stats.stats.pts1Err} </span>
            <span> Arremessos de 2: {stats.stats.pts2} / {stats.stats.pts2 + stats.stats.pts2Err} </span>
            <span> Arremessos de 3: {stats.stats.pts3} / {stats.stats.pts3 + stats.stats.pts3Err} </span>
            <span> Rebotes ofensivos: {stats.stats.offReb} </span>
            <span> Rebotes defensivos: {stats.stats.defReb} </span>
            <span> Faltas: {stats.stats.foul} </span>
         </S.Stats>
      </>
   )
}