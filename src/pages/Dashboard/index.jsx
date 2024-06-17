import { useState } from 'react';
import * as S from './Dashboard.styled';

import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";
import Title from "@components/Title/Title";
import Switch from "@components/Switch/Switch";

import { useLocation } from 'react-router-dom';

import DashboardLayout from './Dashboard';
import ComparisonLayout from './Comparison';

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function Dashboard() {
   const query = useQuery();
   const adversaryId = query.get('adversaryId');

   const [isComparison, setIsComparison] = useState(!!adversaryId);
   const handleVizualitionMode = () => setIsComparison(!isComparison);

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='dashboard' />

         <S.ContentContainer>
            <S.Flex>
               <Title text='Dashboard' $uppercase />
               {localStorage.getItem('type') === 'Coach' &&
                  <Switch label='Comparação de times' id='switch_comparacao' onCheckedChange={handleVizualitionMode} checked={isComparison} />
               }
            </S.Flex>
            {isComparison ? <ComparisonLayout /> : <DashboardLayout />}
         </S.ContentContainer>
      </S.PageContainer>
   )
}