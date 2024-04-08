import { useState } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import ToggleGroup from "@components/ToggleGroup/ToggleGroup";

import { MagnifyingGlass, SquaresFour, Rows, Faders } from "@phosphor-icons/react";

import * as S from "./Team.styled"

export default function TeamRoster() {
   const [search, setSearch] = useState('');
   const [gridState, setGridState] = useState('');
   const [tableState, setTableState] = useState('');

   function handleSearchChange(e) {
      const { value } = e.target;
      setSearch(value);
   }

   function handleGridStateChange(e) {
      const { value } = e.target;
      setGridState(!gridState);
      if(tableState) setTableState(!setTableState);
   }

   function handleTableStateChange(e) {
      const { value } = e.target;
      setTableState(!tableState);
      if(gridState) setGridState(!setGridState);
   }

   return(
      <S.PageContainer>
         <Sidebar page='team'/>
         <S.ContentContainer>
            <Title text="Elenco" uppercase size='3rem'/>
            <S.MainContainer>

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
                        <Rows size={36}/>
                     </ToggleGroup.Item>
                     <ToggleGroup.Item value="rows" aria-label="Alinhado por linhas" dataState={tableState} onClick={handleTableStateChange}>
                        <SquaresFour size={36}/>
                     </ToggleGroup.Item>
                  </ToggleGroup.Root>
               </S.FilterLine>

            </S.MainContainer>
         </S.ContentContainer>
      </S.PageContainer>
   )
}