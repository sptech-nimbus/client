import styled from "styled-components"

const StatsContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding-top: 1rem;
   gap: 1rem;
   
   div {
      display: flex;
      flex-direction: column;

      span:nth-child(1) {

         font-weight: 600;
      }
   }
`

const Row = styled.div`
   width: 100%;
   display: grid !important;
   grid-template-columns: 1fr 1fr;
`

export default function Stats({ stats }) {
   return (
      <>
         <StatsContainer>
            <Row>
               <div><span>Pontos</span> <span>{stats.pts}</span></div>
               <div><span>Assistências</span> <span>{stats.ast}</span></div>
            </Row>
            <Row>
               <div><span>Tocos</span> <span>{stats.blk}</span></div>
               <div><span>Roubos</span> <span>{stats.stl}</span></div>
            </Row>
            <Row>
               <div><span>Turnovers</span> <span>{stats.turnover}</span></div>
               <div><span>Lances Livres</span> <span>{stats.pts1} / {stats.pts1 + stats.pts1Err}</span></div>
            </Row>
            <Row>
               <div><span>Arremessos de 2</span> <span>{stats.pts2} / {stats.pts2 + stats.pts2Err}</span></div>
               <div><span>Arremessos de 3</span> <span>{stats.pts3} / {stats.pts3 + stats.pts3Err}</span></div>
            </Row>
            <Row>
               <div><span>Rebotes ofensivos</span> <span>{stats.offReb}</span></div>
               <div><span>Rebotes defensivos</span> <span>{stats.defReb}</span></div>
            </Row>
            <Row>
               <div><span>Faltas</span> <span>{stats.foul}</span></div>
               <div><span>Minutos</span> <span>{stats.minutes}</span></div>
            </Row>
         </StatsContainer>
      </>
   )
}