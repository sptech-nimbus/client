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
   const [playersData, setPlayersData] = useState(
      [
         { number: 1, firstName: 'Alice', lastName: 'Smith', position: 'Armador', birthDate: '2003-04-15', picture: 'https://via.placeholder.com/150' },
         { number: 2, firstName: 'Bob', lastName: 'Johnson', position: 'Ala-Armador', birthDate: '2002-09-22', picture: 'https://via.placeholder.com/150' },
         { number: 3, firstName: 'Charlie', lastName: 'Williams', position: 'Ala', birthDate: '2001-11-08', picture: 'https://via.placeholder.com/150' },
         { number: 4, firstName: 'David', lastName: 'Jones', position: 'Ala-Pivô', birthDate: '2000-08-17', picture: 'https://via.placeholder.com/150' },
         { number: 5, firstName: 'Emma', lastName: 'Brown', position: 'Pivô', birthDate: '2001-06-29', picture: 'https://via.placeholder.com/150' },
         { number: 6, firstName: 'Ethan', lastName: 'Davis', position: 'Pivô', birthDate: '2003-01-03', picture: 'https://via.placeholder.com/150' },
         { number: 7, firstName: 'Grace', lastName: 'Miller', position: 'Pivô', birthDate: '2000-12-11', picture: 'https://via.placeholder.com/150' },
         { number: 8, firstName: 'Henry', lastName: 'Wilson', position: 'Pivô', birthDate: '2001-04-25', picture: 'https://via.placeholder.com/150' },
         { number: 9, firstName: 'Isabella', lastName: 'Moore', position: 'Pivô', birthDate: '2002-07-19', picture: 'https://via.placeholder.com/150' },
         { number: 10, firstName: 'Jack', lastName: 'Taylor', position: 'Pivô', birthDate: '2003-03-07', picture: 'https://via.placeholder.com/150' },
         { number: 11, firstName: 'Sophia', lastName: 'Anderson', position: 'Pivô', birthDate: '2000-10-14', picture: 'https://via.placeholder.com/150' },
         { number: 12, firstName: 'Liam', lastName: 'Martinez', position: 'Pivô', birthDate: '2001-09-30', picture: 'https://via.placeholder.com/150' },
         { number: 13, firstName: 'Olivia', lastName: 'Thompson', position: 'Pivô', birthDate: '2002-02-18', picture: 'https://via.placeholder.com/150' },
         { number: 14, firstName: 'Noah', lastName: 'Garcia', position: 'Pivô', birthDate: '2000-05-28', picture: 'https://via.placeholder.com/150' },
         { number: 15, firstName: 'Ava', lastName: 'Martinez', position: 'Pivô', birthDate: '2001-08-06', picture: 'https://via.placeholder.com/150' },
         { number: 16, firstName: 'William', lastName: 'Robinson', position: 'Pivô', birthDate: '2002-12-09', picture: 'https://via.placeholder.com/150' },
         { number: 17, firstName: 'Mia', lastName: 'Clark', position: 'Pivô', birthDate: '2000-11-12', picture: 'https://via.placeholder.com/150' },
         { number: 18, firstName: 'James', lastName: 'Rodriguez', position: 'Pivô', birthDate: '2002-03-24', picture: 'https://via.placeholder.com/150' },
         { number: 19, firstName: 'Charlotte', lastName: 'Lewis', position: 'Pivô', birthDate: '2001-01-02', picture: 'https://via.placeholder.com/150' },
         { number: 20, firstName: 'Benjamin', lastName: 'Lee', position: 'Pivô', birthDate: '2003-07-31', picture: 'https://via.placeholder.com/150' },
         { number: 21, firstName: 'Benjamin', lastName: 'Lee', position: 'Pivô', birthDate: '2002-06-10', picture: 'https://via.placeholder.com/150' },
         { number: 22, firstName: 'Benjamin', lastName: 'Lee', position: 'Pivô', birthDate: '2000-09-15', picture: 'https://via.placeholder.com/150' }
     ]);
   const [playersFiltered, setPlayersFiltered] = useState(playersData);

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