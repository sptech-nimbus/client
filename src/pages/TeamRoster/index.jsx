import { useState } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import ToggleGroup from "@components/ToggleGroup/ToggleGroup";

import { MagnifyingGlass, SquaresFour, Rows, Faders } from "@phosphor-icons/react";

import * as S from "./Team.styled"

export default function TeamRoster() {
   const [search, setSearch] = useState('');

   function handleSearchChange(e) {
      const { value } = e.target;
      setSearch(value);
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

                  <ToggleGroup.Root type="single">
                     <ToggleGroup.Item value="grid" aria-label="Alinhado por grades">
                        <Rows size={36}/>
                     </ToggleGroup.Item>
                     <ToggleGroup.Item value="rows" aria-label="Alinhado por linhas">
                        <SquaresFour size={36}/>
                     </ToggleGroup.Item>
                  </ToggleGroup.Root>
               </S.FilterLine>

            </S.MainContainer>
         </S.ContentContainer>
      </S.PageContainer>
   )
}