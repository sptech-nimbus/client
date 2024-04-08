import { useState } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";

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

                  <S.Filters>
                     <SquaresFour size={36}/>
                     <Rows size={36}/>
                  </S.Filters>
               </S.FilterLine>

            </S.MainContainer>
         </S.ContentContainer>
      </S.PageContainer>
   )
}