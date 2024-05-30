import * as S from '../Player.styled';
import { FirstAidKit } from '@phosphor-icons/react';

export const calculateSeverity = (inicialDate, finalDate) => {
   const startDate = new Date(inicialDate);
   const endDate = new Date(finalDate);
   const diffTime = Math.abs(endDate - startDate);
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

   if (diffDays <= 7) return 'Leve';
   if (diffDays <= 30) return 'Média';
   return 'Grave';
};

export default function Severity({ initialDate, finalDate }) {
   return (
      <S.Severity degree={calculateSeverity(initialDate, finalDate)}>
         {calculateSeverity(initialDate, finalDate)}
      </S.Severity>
   )
}