/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import * as S from "./Player.styled";
import * as Athlete from "../Match/OnGoingMatch/Match.styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AthleteStats from "./Stats/AthleteStats";
import AthleteDesk from './Desk/AthleteDesk';
import AthleteInjuries from "./Injury/Injuries";

import Background from "@components/Background/Background";
import Sidebar from '@components/Sidebar/Sidebar';
import Switch from "@components/Switch/Switch";
import Tooltip from "@components/Tooltip/Tooltip";
import Button from "@components/Button/Button";
import Loader, { LoaderContainer } from "@components/Loader/Loader";
import { Dialog } from "@components/Dialog/Dialog";

import athleteDesc from "@api/athleteDesc";
import athlete from '@api/athlete';
import { Colors } from "@utils/Helpers";

import { Warning } from "@phosphor-icons/react";

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

function SelectPlayerDialog({ isOpen = false, set, onConfirm }) {
   const [modalOpen, setModalOpen] = useState();
   const [allPlayers, setAllPlayers] = useState();
   const [selectedPlayer, setSelectedPlayer] = useState();

   const query = useQuery();
   const playerId = query.get('id');

   useEffect(() => {
      async function fetchData() {
         try {
            const { data: { data } } = await athlete.byTeam(
               sessionStorage.getItem('teamId'),
               localStorage.getItem('token')
            );

            const playersData = data.filter(player => player.id !== playerId);
            setAllPlayers(playersData);
         }
         catch (err) {
            console.log('Houve um erro ao buscar por jogadores para comparação. Por favor, aguarde um momento antes de tentar novamente.');
            console.log(err);
         }
      }
      fetchData();
   }, []);

   const handleSelectedPlayer = (player) => { setSelectedPlayer(player); }

   const cancelAction = () => {
      setSelectedPlayer();
      setModalOpen();
      set(false);
   }

   const confirmAction = () => {
      onConfirm(selectedPlayer.id);
      setModalOpen(false);
      setSelectedPlayer();
   }

   return (
      <Dialog title='Jogadores do time' open={modalOpen ?? isOpen} noClose>
         <S.DialogContainer>
            <S.DialogText>
               {
                  allPlayers ?
                     'Selecione um jogador abaixo para realizar a comparação'
                     : 'Não foram encontrados jogadores para comparação'
               }
            </S.DialogText>
            {
               !allPlayers ?
                  <LoaderContainer>
                     <Loader />
                  </LoaderContainer> :
                  <S.AthletesList>
                     {allPlayers && allPlayers.map(player => (
                        <S.Athlete key={player.id} onClick={() => handleSelectedPlayer(player)} $active={selectedPlayer && selectedPlayer.id == player.id}>
                           <Athlete.AthleteInfo>
                              <Athlete.AthleteImage src={player.picture ?? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} />
                              <Athlete.Column>
                                 <Athlete.AthleteName>{player.firstName} {player.lastName}</Athlete.AthleteName>
                                 <Athlete.AthleteName>{player.athleteDesc.position}</Athlete.AthleteName>
                              </Athlete.Column>
                           </Athlete.AthleteInfo>
                        </S.Athlete>
                     ))}
                  </S.AthletesList>
            }
            <S.Flex>
               <Button.Secondary width='100%' value='Cancelar' onClick={cancelAction} />
               <Button.Primary width='100%' value='Confirmar' onClick={confirmAction} />
            </S.Flex>
         </S.DialogContainer>
      </Dialog>
   )
}

export default function PlayerInfo() {
   const navigate = useNavigate();

   const [deskActive, setDeskActive] = useState(true);
   const [statsActive, setStatsActive] = useState(false);
   const [injuryActive, setInjuryActive] = useState(false);
   const [isComparison, setIsComparison] = useState(false);
   const [playerData, setPlayerData] = useState();
   const [adversaryData, setAdversaryData] = useState();

   const query = useQuery();
   const playerId = query.get('id');

   useEffect(() => {
      async function fetchData() {
         const { data: { data } } = await athleteDesc.allInfo(playerId, localStorage.getItem('token'));

         setPlayerData(data);
      }

      fetchData();
   }, [playerId]);

   const toggleValue = (get, set) => {
      set(!get);
   }

   const setAdversary = async (id) => {
      const { data: { data } } = await athleteDesc.allInfo(id, localStorage.getItem('token'));

      setAdversaryData({
         id,
         ...data
      });
   }

   const handleStatsActive = (e) => {
      if (deskActive) setDeskActive(false);
      if (injuryActive) setInjuryActive(false);
      setStatsActive(true);
   }

   const handleDeskActive = (e) => {
      if (statsActive) setStatsActive(false);
      if (injuryActive) setInjuryActive(false);
      setDeskActive(true);
   }

   const handleInjuryActive = (e) => {
      if (deskActive) setDeskActive(false);
      if (statsActive) setStatsActive(false);
      setInjuryActive(true);
   }

   return !playerData ? <S.LoaderContainer> <Loader /> </S.LoaderContainer> : (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='team' />
         <S.ContentContainer>
            {isComparison &&
               <S.Absolute>
                  <SelectPlayerDialog
                     isOpen={isComparison}
                     set={() => toggleValue(isComparison, setIsComparison)}
                     onConfirm={setAdversary}
                  />
               </S.Absolute>
            }

            <S.TopLinkContainer>
               <S.Back size={30} weight="bold" onClick={() => navigate('/roster')} />
               <S.TopLink $active={deskActive} onClick={handleDeskActive}>Ficha do jogador</S.TopLink>
               <S.TopLink $active={statsActive} onClick={handleStatsActive}>Estatísticas</S.TopLink>
               <S.TopLink $active={injuryActive} onClick={handleInjuryActive}>Lesões</S.TopLink>
               <S.TopLink>
                  <Switch label='Comparação de jogadores' id='switch_comparacao' onCheckedChange={() => toggleValue(isComparison, setIsComparison)} checked={isComparison} />
                  {
                     (injuryActive && isComparison) &&
                     <Tooltip side='bottom' icon={<Warning size={28} weight="fill" color={Colors.red} />}>
                        Não há comparação entre jogadores para lesões.
                     </Tooltip>
                  }
               </S.TopLink>
            </S.TopLinkContainer>
            {deskActive && <AthleteDesk playerData={playerData} adversaryData={adversaryData} isComparison={isComparison} />}
            {statsActive && <AthleteStats playerData={playerData} adversaryData={adversaryData} isComparison={isComparison} />}
            {injuryActive && <AthleteInjuries playerData={playerData} />}
         </S.ContentContainer>
      </S.PageContainer>
   )
}