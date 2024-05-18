import { useState, useEffect, useRef } from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import ToggleGroup from "@components/ToggleGroup/ToggleGroup";
import Background from "@components/Background/Background";
import { Drawer } from "@components/Dialog/Dialog";
import RadioGroup from "@components/RadioGroup/RadioGroup";
import Button from "@components/Button/Button";

import user from "@api/user";
import axios from 'axios';

import TeamGrid from "./TeamGrid";
import TeamTable from "./TeamTable";

import Utils from "@utils/Helpers";

import { SquaresFour, Rows, Faders } from "@phosphor-icons/react";

import * as S from "./Team.styled";

export default function TeamRoster() {
   const [filters, setFilters] = useState({
      search: '',
      alphabetical: 'default',
      position: 'default',
      age: 'default',
   });

   const [gridState, setGridState] = useState(true);
   const [tableState, setTableState] = useState(false);

   const [playersData, setPlayersData] = useState([]);
   const [playersFiltered, setPlayersFiltered] = useState([]);

   useEffect(() => {
      async function fetchData() {
         //requisição de mock api - substituir pela requisição correta ao backend
         let { data } = await axios.get('https://6642243c3d66a67b34366411.mockapi.io/nimbus/athlete');
         data = data.map(item => ({ ...item, position: randomPosition() }))
         setPlayersData(data)
         setPlayersFiltered(playersData);
      }
      fetchData();
   }, []);

   const searchByName = () => {
      const newFilter = Utils.filterByAttr(playersData, 'fullName', filters.search);
      setPlayersFiltered(newFilter);
   }

   const handleSearch = (e) => {
      setFilters({
         ...filters,
         search: e.target.value
      });
   }

   const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === 'Backspace') {
         searchByName(filters.search);
      }
   }

   useEffect(() => {
      let filteredPlayers = playersData;

      if (filters.search) {
         filteredPlayers = Utils.filterByAttr(filteredPlayers, 'fullName', filters.search);
      }

      filteredPlayers = Utils.sort(filteredPlayers, 'firstName');
      if(filters.alphabetical == 'z-a') filteredPlayers.reverse();

      if (filters.position !== 'default') {
         filteredPlayers = Utils.filterByAttr(filteredPlayers, 'position', filters.position);
      }

      if (filters.age !== 'default') {
         filteredPlayers = filteredPlayers.sort((a, b) => {
            const ageA = Utils.calcAge(a.birthDate);
            const ageB = Utils.calcAge(b.birthDate);
   
            if (filters.age === 'young-to-old') return ageA - ageB;
            if (filters.age === 'old-to-young') return ageB - ageA;
            return 0;
         });
      }

      setPlayersFiltered(filteredPlayers);
   }, [filters, playersData]);

   const removeFilters = () => {
      setFilters({
         search: '',
         alphabetical: 'default',
         position: 'default',
         age: 'default',
      })
   }

   const handleAlphabetRadio = (value) => {
      setFilters({
         ...filters,
         alphabetical: value
      });
   }

   const handlePositionRadio = (value) => {
      setFilters({
         ...filters,
         position: value
      });
   }

   const handleAgeRadio = (value) => {
      setFilters({
         ...filters,
         age: value
      });
   }

   const handleGridStateChange = () => {
      if (tableState) setGridState(!gridState);
      if (tableState) setTableState(!setTableState);
   }

   const handleTableStateChange = () => {
      if (gridState) setTableState(!tableState);
      if (gridState) setGridState(!gridState);
   }
   
   //funçõo feita apenas para adaptar dados da mock api, remover futuramente quando conectar ao backend
   const randomPosition = () => {
      const positions = ['Armador', 'Ala-Armador', 'Ala', 'Ala-Pivô', 'Pivô', 'Pivô'];
      const random = Math.floor(Math.random() * positions.length);
      return positions[random];
  }

   return(
      <S.PageContainer>
         <Background.Default />
         <Sidebar page="team"/>
         <S.ContentContainer>
            <Title text="Elenco" uppercase size='3rem'/>
            <S.FilterLine>
                  <Input.Default
                  value={filters.search}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  placeholder="Pesquise um jogador pelo nome"
                  width="40%"
                  >
                     <S.SearchIcon onClick={searchByName}/>
                  </Input.Default>
                  
                  <Drawer title={'Filtros de jogadores'} trigger={<Faders size={36}/>}>
                  <Button.Secondary value={'Remover filtros'} size={'sm'} width='100%' fontSize='1rem' onClick={removeFilters}/>
                     <S.FiltersContainer>
                        <S.FilterTitle>Por nome</S.FilterTitle>
                        <S.Filter>
                           <S.FilterDescription>Ordem alfabética</S.FilterDescription>
                           <RadioGroup 
                           value={filters.alphabetical}
                           onValueChange={handleAlphabetRadio} 
                           items={[
                              {value: 'default', label: 'A a Z.'},
                              {value: 'z-a', label: 'Z a A.'}
                           ]}/>
                        </S.Filter>
                        <S.FilterTitle>Por posição</S.FilterTitle>
                        <S.Filter>
                           <S.FilterDescription>Jogadores da posição</S.FilterDescription>
                           <RadioGroup 
                           value={filters.position}
                           onValueChange={handlePositionRadio} 
                           items={[
                              {value: 'default', label: 'Todas as posições'},
                              {value: 'Armador', label: 'Armador'},
                              {value: 'Ala-Armador', label: 'Ala-Armador'},
                              {value: 'Ala', label: 'Ala'},
                              {value: 'Ala-Pivô', label: 'Ala-pivô'},
                              {value: 'Pivô', label: 'Pivô'}
                           ]}/>
                        </S.Filter>
                        <S.FilterTitle>Por idade</S.FilterTitle>
                        <S.Filter>
                           <S.FilterDescription>Ordenador por idade</S.FilterDescription>
                           <S.Filter>
                              <RadioGroup 
                              value={filters.age}
                              onValueChange={handleAgeRadio} 
                              items={[
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