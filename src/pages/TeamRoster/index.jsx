/* eslint-disable no-unused-vars */
import * as S from "./Team.styled";
import { useState, useEffect } from "react";

import Title from "@components/Title/Title";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import Loader from "@components/Loader/Loader";
import Sidebar from "@components/Sidebar/Sidebar";
import * as D from "@components/Dialog/Dialog";
import Background from "@components/Background/Background";
import RadioGroup from "@components/RadioGroup/RadioGroup";
import ToggleGroup from "@components/ToggleGroup/ToggleGroup";
import { SquaresFour, Rows, Faders, Bandaids, Star } from "@phosphor-icons/react";

import athlete from "@api/athlete";
import TeamGrid from "./TeamGrid";
import TeamTable from "./TeamTable";

import Utils from "@utils/Helpers";
import team from '@api/team';

export default function TeamRoster() {
   const [isLoading, setIsLoading] = useState(false);
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
      const fetchData = async () => {
         try {
            setIsLoading(true);
            const response = await athlete.byTeam(
               sessionStorage.getItem('teamId'),
               localStorage.getItem('token')
            );

            if (response.status === 200) {
               setPlayersData(response.data.data);
            }
         } catch (error) {
            console.log('Houve um erro durante a requisição:', error.message);
         } finally {
            setIsLoading(false);
         }
      };
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

   const sortPlayersByPosition = (players) => {
      return players.sort((a, b) => {
         if (a.athleteDesc.position < b.athleteDesc.position) {
            return -1;
         }
         if (a.athleteDesc.position > b.athleteDesc.position) {
            return 1;
         }
         return 0;
      });
   };

   useEffect(() => {
      let filteredPlayers = playersData;

      if (filters.search) {
         filteredPlayers = Utils.filterByAttr(filteredPlayers, 'fullName', filters.search);
      }

      filteredPlayers = Utils.sort(filteredPlayers, 'firstName');
      if (filters.alphabetical === 'z-a') filteredPlayers.reverse();

      if (filters.position !== 'default') {
         filteredPlayers = sortPlayersByPosition(filteredPlayers);
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
      });
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
      setGridState(true);
      setTableState(false);
   }

   const handleTableStateChange = () => {
      setGridState(false);
      setTableState(true);
   }

   const handleDownloadCSV = async () => {
      const response = await team.downloadCSV();

      if (response.status === 200) {
         const downloadWindow = window.open(response.data, '_blank');
         if (downloadWindow) {
            downloadWindow.onload = () => {
               downloadWindow.close();
            }
         }
         else {
            console.log('Error opening download window');
         }
      }
   }

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page="team" />
         <S.ContentContainer>
            <S.TitleContainer>
               <Title text="Elenco" $uppercase size='3rem' />
               <Button.Primary $marginTop="0rem" value="Baixar arquivo CSV" onClick={handleDownloadCSV} />
            </S.TitleContainer>
            <S.FilterLine>
               <Input.Default
                  value={filters.search}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  placeholder="Pesquise um jogador pelo nome"
                  width="40%"
               >
                  <S.SearchIcon onClick={searchByName} />
               </Input.Default>

               <D.Drawer title={'Filtros de jogadores'} trigger={<Faders size={36} />}>
                  <Button.Secondary value={'Remover filtros'} size={'sm'} width='100%' fontSize='1rem' onClick={removeFilters} />
                  <S.FiltersContainer>
                     <S.FilterTitle>Por nome</S.FilterTitle>
                     <S.Filter>
                        <S.FilterDescription>Ordem alfabética</S.FilterDescription>
                        <RadioGroup
                           value={filters.alphabetical}
                           onValueChange={handleAlphabetRadio}
                           items={[
                              { value: 'default', label: 'A a Z.' },
                              { value: 'z-a', label: 'Z a A.' }
                           ]} />
                     </S.Filter>
                     {/* <S.FilterTitle>Por posição</S.FilterTitle>
                     <S.Filter>
                        <S.FilterDescription>Jogadores da posição</S.FilterDescription>
                        <RadioGroup
                           value={filters.position}
                           onValueChange={handlePositionRadio}
                           items={[
                              { value: 'default', label: 'Todas as posições' },
                              { value: 'Armador', label: 'Armador' },
                              { value: 'Ala-Armador', label: 'Ala-Armador' },
                              { value: 'Ala', label: 'Ala' },
                              { value: 'Ala-Pivô', label: 'Ala-pivô' },
                              { value: 'Pivô', label: 'Pivô' }
                           ]} />
                     </S.Filter> */}
                     <S.FilterTitle>Por idade</S.FilterTitle>
                     <S.Filter>
                        <S.FilterDescription>Ordenador por idade</S.FilterDescription>
                        <S.Filter>
                           <RadioGroup
                              value={filters.age}
                              onValueChange={handleAgeRadio}
                              items={[
                                 { value: 'default', label: 'Não ordenado' },
                                 { value: 'young-to-old', label: 'Mais novo' },
                                 { value: 'old-to-young', label: 'Mais velho' }
                              ]} />
                        </S.Filter>
                     </S.Filter>
                  </S.FiltersContainer>
               </D.Drawer>

               {/* <ToggleGroup.Root type="single" defaultValue={"grid"}>
                  <ToggleGroup.Item value="grid" aria-label="Alinhado por grades" data-state={gridState} onClick={handleGridStateChange}>
                     <SquaresFour size={36} />
                  </ToggleGroup.Item>
                  <ToggleGroup.Item value="rows" aria-label="Alinhado por linhas" data-state={tableState} onClick={handleTableStateChange}>
                     <Rows size={36} />
                  </ToggleGroup.Item>
               </ToggleGroup.Root> */}
               <S.Legend>
                  <Star size={26} color={Utils.colors.orange500} weight="fill" />
                  Jogador titular
               </S.Legend>
               <S.Legend>
                  <Bandaids size={26} color={Utils.colors.orange300} weight="fill" />
                  Jogador lesionado
               </S.Legend>
            </S.FilterLine>
            <S.MainContainer>
               {isLoading
                  ? <Loader />
                  : gridState ?
                     <TeamGrid players={playersFiltered} /> :
                     <TeamTable players={playersFiltered} />
               }
            </S.MainContainer>
         </S.ContentContainer>
      </S.PageContainer>
   );
}