import { useState } from 'react';
import * as S from './Dashboard.styled';
import Sidebar from "@components/Sidebar/Sidebar";
import Background from "@components/Background/Background";

import Title from "@components/Title/Title";
import Switch from "@components/Switch/Switch";

import DashboardLayout from './Dashboard';
import ComparisonLayout from './Comparison';

export default function Dashboard() {
   const [isComparison, setIsComparison] = useState(false);
   const handleVizualitionMode = () => setIsComparison(!isComparison);

   return (
      <S.PageContainer>
         <Background.Default />
         <Sidebar page='dashboard'/>
         
         <S.ContentContainer>
            <S.Flex>
               <Title text='Dashboard' uppercase/> 
               <Switch label='Comparação de times' id='switch_comparacao' onCheckedChange={handleVizualitionMode}/>
            </S.Flex>
            {isComparison ? <ComparisonLayout /> : <DashboardLayout />}
         </S.ContentContainer>
      </S.PageContainer>
   )
}