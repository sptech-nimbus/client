import * as S from './Match.styled';
import Popover from "@components/Popover/Popover";

import { CaretDown, Star } from '@phosphor-icons/react';
import * as Accordion from '@radix-ui/react-accordion';

export default function Athlete() {
   return (
      <Accordion.Root type='single' collapsible>
         <Accordion.Item value='item-1' asChild>
            <S.Athlete>
               <S.AthleteInfo>
                  <S.AthleteImage />

                  <S.Column>
                     <S.AthleteName>Nome do jogador</S.AthleteName>
                     <S.isPlaying isPlaying>Jogando</S.isPlaying>
                  </S.Column>

                  <S.StartingPlayer title='Jogador titular'>
                     <Star weight='fill' />
                  </S.StartingPlayer>

                  <Accordion.Trigger asChild>
                     <S.CollapsibleArrow>
                        <CaretDown weight='bold' />
                     </S.CollapsibleArrow>
                  </Accordion.Trigger>
               </S.AthleteInfo>


               <Accordion.Content asChild>
                  <S.Actions>
                     <Popover trigger={<S.Action >Pontos</S.Action>} sideOffset={8}>
                        <S.PopoverContent>
                           <S.AddAction>
                              <S.AddButton onClick={() => addStatistic('pts', 1)}>+1 pts</S.AddButton>
                              <S.AddButton onClick={() => addStatistic('pts', 2)}>+2 pts</S.AddButton>
                              <S.AddButton onClick={() => addStatistic('pts', 3)}>+3 pts</S.AddButton>
                           </S.AddAction>
                           <S.AddAction>
                              <S.AddButton isError onClick={() => addStatistic('pts', -1)}>+1 pts</S.AddButton>
                              <S.AddButton isError onClick={() => addStatistic('pts', -2)}>+2 pts</S.AddButton>
                              <S.AddButton isError onClick={() => addStatistic('pts', -3)}>+3 pts</S.AddButton>
                           </S.AddAction>
                        </S.PopoverContent>
                     </Popover>

                     <Popover trigger={<S.Action>Rebotes</S.Action>} sideOffset={8}>
                        <S.PopoverContent>
                           <S.AddAction>
                              <S.AddButton onClick={() => addStatistic('offReb', 1)} title='+1 Rebote ofensivo'>+1 reb off</S.AddButton>
                              <S.AddButton onClick={() => addStatistic('defReb', 1)} title='+1 Rebote defensivo'>+1 reb def</S.AddButton>
                           </S.AddAction>
                        </S.PopoverContent>
                     </Popover>

                     <Popover trigger={<S.Action>Defesa</S.Action>} sideOffset={8}>
                        <S.PopoverContent>
                           <S.AddAction>
                              <S.AddButton onClick={() => addStatistic('blk', 1)}>+1 toco</S.AddButton>
                              <S.AddButton onClick={() => addStatistic('stl', 1)}>+1 roubo</S.AddButton>
                              <S.AddButton isError onClick={() => addStatistic('foul', 1)}>+1 falta</S.AddButton>
                           </S.AddAction>
                        </S.PopoverContent>
                     </Popover>

                     <Popover trigger={<S.Action>Assistência</S.Action>} sideOffset={8}>
                        <S.PopoverContent>
                           <S.AddAction>
                              <S.AddButton onClick={() => addStatistic('ast', 1)}>+1 assistência</S.AddButton>
                              <S.AddButton isError onClick={() => addStatistic('turnover', 1)}>+1 turnover</S.AddButton>
                           </S.AddAction>
                        </S.PopoverContent>
                     </Popover>
                  </S.Actions>
               </Accordion.Content>
            </S.Athlete>
         </Accordion.Item>
      </Accordion.Root>
   )
}