/* eslint-disable no-unused-vars */
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

import { EmailValidation } from '@utils/Validations';

import axios from 'axios';
import { Envelope } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import user from '@api/user';
import athlete from '@api/athlete';
import team from '@api/team';

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function JoinTeam() {
   const navigate = useNavigate();

   const [team, setTeam] = useState();
   const [token, setToken] = useState(localStorage.getItem('token'));
   const [personaId, setPersonaId] = useState();
   const [credentials, setCredentials] = useState({ email: '', password: '' });

   const query = useQuery();
   const teamId = query.get('t');

   useEffect(() => {
      async function fetchData() {
         try {
            const { data: { data } } = await axios.get(`${config.baseURL}/teams/${teamId}`, {
               headers: { Authorization: `Bearer ${token}` }
            });
            setTeam(data);
         }
         catch (err) {
            navigate('/not-found');
         }
      }

      fetchData();
   }, []);

   const handleInputChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (EmailValidation(credentials.email) && credentials.password) {
         try {
            const { data: { data } } = await user.login(credentials);
            setPersonaId(data.personaId);
            setToken(data.token);

            try {
               await athlete.registerTeam(personaId, { id: teamId }, token);
               toast.success("Você acabou de entrar para o time " + team.name + "! Redirecionando para a tela de login...", { autoClose: 2000 });
               setTimeout(() => {
                  navigate('/login');
               }, 2600);
            }
            catch (err) {
               console.log(err);
            }
         }
         catch (err) {
            if (err.response.status == 401) toast.error(`Credenciais inválidas.`);
            else toast.error(`Houve um erro durante a validação de seus dados. Por favor, aguarde um momento antes de tentar novamente.`)
         }
      }
      else {
         if (!credentials.email && !credentials.password) {
            toast.error("Preencha todos os campos");
         }
         else {
            if (!EmailValidation()) toast.error("O email inserido é inválido.");
            if (!credentials.password) toast.error("Preencha o campo de senha.");
         }
      }
   }

   return !team ? <S.LoaderContaiener> <Loader /> </S.LoaderContaiener> : (
      <LS.Header>
         <ToastContainer
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
            limit={3}
         />

         <Background.Login />
         <LS.Title>
            <Title text='Entrar para um time' $uppercase />
         </LS.Title>

         <S.JoinTeamText>Insira suas credenciais para entrar para o time {team.name}</S.JoinTeamText>

         <S.JoinTeamGrid>
            <S.TeamImage src={team.picture} />

            <S.Form onSubmit={handleSubmit}>
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
                  onClick={handleSubmit}
               />
            </S.Form>
         </S.JoinTeamGrid>
      </LS.Header>
   )
}