import { useState } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import ToggleGroup from "@components/ToggleGroup/ToggleGroup";

import TeamGrid from "./TeamGrid";

import { MagnifyingGlass, SquaresFour, Rows, Faders } from "@phosphor-icons/react";

import * as S from "./Team.styled"

export default function TeamRoster() {
   const [search, setSearch] = useState('');
   const [gridState, setGridState] = useState(true);
   const [tableState, setTableState] = useState(false);

   function handleSearchChange(e) {
      const { value } = e.target;
      setSearch(value);
   }

   function handleGridStateChange(e) {
      const { value } = e.target;
      if(tableState) {
         setGridState(!gridState);
      }
      if(tableState) setTableState(!setTableState);
   }

   function handleTableStateChange(e) {
      const { value } = e.target;
      if(gridState) {
         setTableState(!tableState);
      }

      if(gridState) setGridState(!setGridState);
   }

   return(
      <S.PageContainer>
         <Sidebar page='team'/>
         <S.ContentContainer>
            <Title text="Elenco" uppercase size='3rem'/>
            <S.FilterLine>
                  <Input.Default
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Pesquise um jogador"
                  width="40%"
                  >
                     <MagnifyingGlass />
                  </Input.Default>

                  <Faders size={36}/>

                  <ToggleGroup.Root type="single" defaultValue={"grid"}>
                     <ToggleGroup.Item value="grid" aria-label="Alinhado por grades" dataState={gridState} onClick={handleGridStateChange}>
                        <SquaresFour size={36}/>
                     </ToggleGroup.Item>
                     <ToggleGroup.Item value="rows" aria-label="Alinhado por linhas" dataState={tableState} onClick={handleTableStateChange}>
                        <Rows size={36}/>
                     </ToggleGroup.Item>
                  </ToggleGroup.Root>
               </S.FilterLine>
            <S.MainContainer>
               {gridState ?
               <TeamGrid /> :
               <TeamTable />}
            </S.MainContainer>
         </S.ContentContainer>
      </S.PageContainer>
   )
}