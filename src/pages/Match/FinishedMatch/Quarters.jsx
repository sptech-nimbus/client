import { useEffect } from 'react';
import * as S from './FinishedMatch.styled';

import * as Accordion from '@radix-ui/react-accordion';

function NoContent() {
   return (
      <S.NoFlags>
         <span>Não foram adicionadas marcações durante a partida.</span>
      </S.NoFlags>
   )
}

function Flag({ flag }) {
   return (
      <S.Flag>
         <S.FlagTime><strong>Tempo:</strong> {flag.time}</S.FlagTime>
         <S.FlagText>{flag.text}</S.FlagText>
      </S.Flag>
   )
}

export default function Quarters({ title, events }) {
   return (!title || !events) ? <NoContent /> : (
      <Accordion.Item value={title} asChild>
         <S.Quarter>
            <S.QuarterHead>
               <span>{title.replace('quarter', 'Quarto ')}</span>
               <Accordion.Trigger asChild>
                  <S.Arrow weight='bold'/>
               </Accordion.Trigger>
            </S.QuarterHead>

            <S.AccordionContent asChild>
               <div>
                  <S.QuarterTitle>Marcações</S.QuarterTitle>
                  <S.QuarterFlags>
                     {events.map((event, index) => (
                        <Flag key={index} flag={event}/>
                     ))}
                  </S.QuarterFlags>
               </div>
            </S.AccordionContent>
         </S.Quarter>
      </Accordion.Item>
   )
}