import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './JoinTeam.styled';
import * as LS from '../Login/Login.styles';

import Background from '@components/Background/Background';
import Title from '@components/Title/Title';
import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import Loader from '@components/Loader/Loader'

import axios from 'axios';
import { Envelope } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function JoinTeam() {
   const navigate = useNavigate();

   const [teamData, setTeamData] = useState();
   const [credentials, setCredentials] = useState({ email: '', password: '' });

   const query = useQuery();
   const teamId = query.get('t');

   useEffect(() => {
      async function fetchData() {
         try {
            const { data } = await axios.get(`https://6642243c3d66a67b34366411.mockapi.io/nimbus/teams/${teamId}`);
            setTeamData(data)
            console.log(teamData);
         }
         catch(err) {
            navigate('/not-found');
         }
      }

      fetchData();
   }, []);

   const handleInputChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
   }

   return !teamData ? <S.LoaderContaiener> <Loader /> </S.LoaderContaiener> : (
      <LS.Header>
            <Background.Login />
            <LS.Title>
               <Title text='Entrar para um time' $uppercase/>
            </LS.Title>

            <S.JoinTeamText>Insira suas credenciais para entrar para o time {teamData.name}</S.JoinTeamText>

            <S.JoinTeamGrid>
               <S.TeamImage src={teamData.picture}/>

               <S.Form>
                  <Label>
                     Insira seu email
                     <Input.Default
                        name='email'
                        placeholder={'seu@email.com'}
                        value={credentials.email}
                        onChange={handleInputChange}
                     >
                        <Envelope />
                     </Input.Default>
                  </Label>

                  <Label >
                     Insira sua senha
                     <Input.Password
                        name='password'
                        placeholder={'**********'}
                        value={credentials.password}
                        hasIcon
                        onChange={handleInputChange}
                     />
                  </Label>

                  <Button.Primary
                     value={'Entrar'}
                     size={'md'}
                     width={'100%'}
                     fontSize={'1.5rem'}
                  />
               </S.Form>   
            </S.JoinTeamGrid>
      </LS.Header>
   )
}