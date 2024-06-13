import { useEffect, useState } from 'react';
import * as S from './Match.styled';
import Popover from "@components/Popover/Popover";

import { CaretDown, Star } from '@phosphor-icons/react';
import * as Accordion from '@radix-ui/react-accordion';

import { useStopwatch } from 'react-timer-hook';

export default function Athlete({ player, addStatistic, updatePlayerStats }) {
   const { seconds, minutes, isRunning, start, pause } = useStopwatch();

   const addStatisticHandler = (stat, value) => {
      addStatistic(stat, value);
      updatePlayerStats(player.id, stat, value);
   }

   const formatTime = (time) => time.toString().padStart(2, '0');

  function Playing({ isStarter }) {
      const handleTimer = () => {
         if(isRunning) {
            pause();
            updatePlayerStats(player.id, 'minutes', `${formatTime(minutes)}:${formatTime(seconds)}`);
         }
         else {
            start();
         }
      }
   
      return (
         <S.isPlaying onClick={() => { 
            handleTimer(); 
         }} $isPlaying={isRunning}>
            {isRunning ? 'Jogando' : 'No banco'}
         </S.isPlaying>
      )
   }

   return (
      <Accordion.Item value={player.id} asChild>
         <S.Athlete>
            <S.AthleteInfo>
               <S.AthleteImage src={player.picture}/>

               <S.Column>
                  <S.AthleteName>{player.firstName} {player.lastName}</S.AthleteName>
                  <Playing isStarter={player.isStarting}/>
               </S.Column>

               <S.StartingPlayer title='Jogador titular'>
                  <Star weight={player.isStarting ? 'fill' : 'regular'} />
               </S.StartingPlayer>

               {isRunning &&
               <Accordion.Trigger asChild>
                  <S.CollapsibleArrow>
                     <CaretDown weight='bold' />
                  </S.CollapsibleArrow>
               </Accordion.Trigger>   
               }
            </S.AthleteInfo>

            <S.AccordionContent asChild>
               <S.Actions>
                  <Popover trigger={<S.Action>Pontos</S.Action>} sideOffset={8}>
                     <S.PopoverContent>
                        <S.AddAction>
                           <S.AddButton onClick={() => addStatisticHandler('pts', 1)}>+1 pts</S.AddButton>
                           <S.AddButton onClick={() => addStatisticHandler('pts', 2)}>+2 pts</S.AddButton>
                           <S.AddButton onClick={() => addStatisticHandler('pts', 3)}>+3 pts</S.AddButton>
                        </S.AddAction>
                        <S.AddAction>
                           <S.AddButton $isError onClick={() => addStatisticHandler('pts', -1)}>+1 pts</S.AddButton>
                           <S.AddButton $isError onClick={() => addStatisticHandler('pts', -2)}>+2 pts</S.AddButton>
                           <S.AddButton $isError onClick={() => addStatisticHandler('pts', -3)}>+3 pts</S.AddButton>
                        </S.AddAction>
                     </S.PopoverContent>
                  </Popover>

                  <Popover trigger={<S.Action>Rebotes</S.Action>} sideOffset={8}>
                     <S.PopoverContent>
                        <S.AddAction>
                           <S.AddButton onClick={() => addStatisticHandler('offReb', 1)} title='+1 Rebote ofensivo'>+1 reb off</S.AddButton>
                           <S.AddButton onClick={() => addStatisticHandler('defReb', 1)} title='+1 Rebote defensivo'>+1 reb def</S.AddButton>
                        </S.AddAction>
                     </S.PopoverContent>
                  </Popover>

                  <Popover trigger={<S.Action>Defesa</S.Action>} sideOffset={8}>
                     <S.PopoverContent>
                        <S.AddAction>
                           <S.AddButton onClick={() => addStatisticHandler('blk', 1)}>+1 toco</S.AddButton>
                           <S.AddButton onClick={() => addStatisticHandler('stl', 1)}>+1 roubo</S.AddButton>
                           <S.AddButton $isError onClick={() => addStatisticHandler('foul', 1)}>+1 falta</S.AddButton>
                        </S.AddAction>
                     </S.PopoverContent>
                  </Popover>

                  <Popover trigger={<S.Action>Assistência</S.Action>} sideOffset={8}>
                     <S.PopoverContent>
                        <S.AddAction>
                           <S.AddButton onClick={() => addStatisticHandler('ast', 1)}>+1 assistência</S.AddButton>
                           <S.AddButton $isError onClick={() => addStatisticHandler('turnover', 1)}>+1 turnover</S.AddButton>
                        </S.AddAction>
                     </S.PopoverContent>
                  </Popover>
               </S.Actions>
            </S.AccordionContent>
         </S.Athlete>
      </Accordion.Item>
   );
}
