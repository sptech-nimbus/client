import * as S from './FinishedMatch.styled';

export default function Stats({ stats }) {
   return (
      <>
         <S.Stats>
            <span> Pontos: {stats.pts} </span>
            <span> Assistências: {stats.ast} </span>
            <span> Tocos: {stats.blk} </span>
            <span> Roubos: {stats.stl} </span>
            <span> Turnovers: {stats.turnover} </span>
            <span> Lances Livres: {stats.pts1} / {stats.pts1 + stats.pts1Err} </span>
            <span> Arremessos de 2: {stats.pts2} / {stats.pts2 + stats.pts2Err} </span>
            <span> Arremessos de 3: {stats.pts3} / {stats.pts3 + stats.pts3Err} </span>
            <span> Rebotes ofensivos: {stats.offReb} </span>
            <span> Rebotes defensivos: {stats.defReb} </span>
            <span> Faltas: {stats.foul} </span>
         </S.Stats>
      </>
   )
}