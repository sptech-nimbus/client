import { useState, useEffect } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import ToggleGroup from "@components/ToggleGroup/ToggleGroup";
import Background from "@components/Background/Background";
import { Drawer } from "@components/Dialog/Dialog";
import RadioGroup from "@components/RadioGroup/RadioGroup";
import Button from "@components/Button/Button";

import user from "@api/user";

import TeamGrid from "./TeamGrid";
import TeamTable from "./TeamTable";

import { filterByAttr } from "@utils/Helpers";

import { MagnifyingGlass, SquaresFour, Rows, Faders } from "@phosphor-icons/react";

import * as S from "./Team.styled"

export default function TeamRoster() {
   const [search, setSearch] = useState('');
   const [gridState, setGridState] = useState(true);
   const [tableState, setTableState] = useState(false);
   const [playersData, setPlayersData] = useState([]);
   const [playersFiltered, setPlayersFiltered] = useState(playersData);

   useEffect(() => {
      
   }, [])

   function handleSearchChange(e) {
      const { value, keyCode} = e.target;
      setSearch(value);
   }

   function handleKeyPress(e) {
      if (e.key == 'Enter' || e.key == 'Backspace') {
         SearchPlayer();
      }
   }

   function handleGridStateChange(e) {
      const { value } = e.target;
      if (tableState) {
         setGridState(!gridState);
      }
      if (tableState) setTableState(!setTableState);
   }

   function handleTableStateChange(e) {
      const { value } = e.target;
      if (gridState) {
         setTableState(!tableState);
      }

      if (gridState) setGridState(!gridState);
   }

   function SearchPlayer() {
      const filtered = filterByAttr(playersData, "fullName", search);
      setPlayersFiltered(filtered);
   }
   
   return(
      <S.PageContainer>
         <Background.Default />
         <Sidebar page="team"/>
         <S.ContentContainer>
            <Title text="Elenco" uppercase size='3rem'/>
            <S.FilterLine>
                  <Input.Default
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Pesquise um jogador pelo nome"
                  width="40%"
                  >
                     <S.SearchIcon onClick={SearchPlayer}/>
                  </Input.Default>
                  
                  <Drawer title={'Filtros de jogadores'} trigger={<Faders size={36}/>}>
                  {/* <Button.Primary value={'Remover filtros'} size={'md'} /> */}
                     <S.FiltersContainer>
                        <S.FilterTitle>Por nome</S.FilterTitle>
                        <S.Filter>
                           <S.FilterDescription>Ordem alfabética</S.FilterDescription>
                           <RadioGroup items={[
                              {value: 'default', label: 'A a Z.'},
                              {value: 'z-a', label: 'Z a A.'}
                           ]}/>
                        </S.Filter>
                        <S.FilterTitle>Por posição</S.FilterTitle>
                        <S.Filter>
                           <S.FilterDescription>Jogadores da posição</S.FilterDescription>
                           <RadioGroup items={[
                              {value: 'default', label: 'Todas as posições'},
                              {value: 'pg', label: 'Armador'},
                              {value: 'sg', label: 'Ala-Armador'},
                              {value: 'sf', label: 'Ala'},
                              {value: 'pf', label: 'Ala-pivô'},
                              {value: 'c', label: 'Pivô'}
                           ]}/>
                        </S.Filter>
                        <S.FilterTitle>Por idade</S.FilterTitle>
                        <S.Filter>
                           <S.FilterDescription>Ordenador por idade</S.FilterDescription>
                           <S.Filter>
                              <RadioGroup items={[
                                 {value: 'default', label: 'Não ordenado'},
                                 {value: 'young-to-old', label: 'Mais novo'},
                                 {value: 'old-to-young', label: 'Mais velho'}
                              ]}/>
                           </S.Filter>
                        </S.Filter>
                     </S.FiltersContainer>
                  </Drawer>

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
               <TeamGrid players={playersFiltered}/> :
               <TeamTable players={playersFiltered}/>
               }
            </S.MainContainer>
         </S.ContentContainer>
      </S.PageContainer>
   )
}