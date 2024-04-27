import React from 'react';
import * as Radio from "@radix-ui/react-radio-group";
import * as S from './RadioGroup.styled';

export default function RadioGroup({items}) {
   const radioItems = items.map(item => {
      return (
         <S.Flex>
            <S.RadioGroupItem value={item.value}>
               <S.RadioGroupIndicator />
            </S.RadioGroupItem>
            <S.Label>{item.label}</S.Label>
         </S.Flex>
      )
   })
   
   return (
      <S.RadioGroupRoot defaultValue='default'>
         {radioItems}
      </S.RadioGroupRoot>
   )
}
