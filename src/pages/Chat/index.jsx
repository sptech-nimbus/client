import * as S from './Chat.styled';

import { useEffect, useState } from "react";
import { socket } from "../../utils/Socket";
import { getMessages } from "../../api/chat";

import Sidebar from "@components/Sidebar/Sidebar";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import Message from "@components/Message/Message";
import Status from './Status';

import { MagnifyingGlass, PaperPlaneRight, ChatCircleDots } from '@phosphor-icons/react';

export default function Chat() {
   sessionStorage.setItem('userId', '123');
   sessionStorage.setItem('teamId', '312');
   sessionStorage.setItem('username', 'kauan oliveira');

   const [newMessage, setNewMessage] = useState('');
   const [messages, setMessages] = useState([
      {
        date: "2024-05-25T14:30:00Z",
        message: "Olá, como você está?",
        userId: "1",
        username: "joao123"
      },
      {
        date: "2024-05-25T14:32:00Z",
        message: "Estou bem, obrigado! E você?",
        userId: "27754777-4b9c-4960-9b1a-75377502ad03",
        username: "maria456"
      },
      {
        date: "2024-05-25T14:34:00Z",
        message: "Também estou bem. O que você tem feito ultimamente?",
        userId: "1",
        username: "joao123"
      },
      {
        date: "2024-05-25T14:36:00Z",
        message: "Tenho trabalhado em alguns projetos. E você?",
        userId: "27754777-4b9c-4960-9b1a-75377502ad03",
        username: "maria456"
      },
      {
        date: "2024-05-25T14:38:00Z",
        message: "Tenho estudado bastante para a faculdade.",
        userId: "1",
        username: "joao123"
      },
      {
        date: "2024-05-25T14:40:00Z",
        message: "Isso é ótimo! Qual é o seu curso?",
        userId: "27754777-4b9c-4960-9b1a-75377502ad03",
        username: "maria456"
      },
      {
        date: "2024-05-25T14:42:00Z",
        message: "Estou estudando engenharia.",
        userId: "1",
        username: "joao123"
      },
      {
        date: "2024-05-25T14:44:00Z",
        message: "Que legal! Eu estudo ciência da computação.",
        userId: "27754777-4b9c-4960-9b1a-75377502ad03",
        username: "maria456"
      },
      {
        date: "2024-05-25T14:46:00Z",
        message: "Que coincidência! Podemos trocar dicas de estudo.",
        userId: "1",
        username: "joao123"
      },
      {
        date: "2024-05-26T14:48:00Z",
        message: "Com certeza! Vamos marcar um dia para isso.",
        userId: "27754777-4b9c-4960-9b1a-75377502ad03",
        username: "maria456"
      }
    ]);

   const sendMessage = () => {
      const date = new Date();

      socket.emit('ttm', {
         user: {
            id: sessionStorage.getItem('userId'),
            username: sessionStorage.getItem('username')
         },
         content: newMessage,
         date: date.toISOString(),
         team: {
            id: sessionStorage.getItem('teamId')
         }
      });

      setNewMessage('');
   }

   // useEffect(() => {
   //    const getMessagesRes = async () => {
   //       const messagesRes = await getMessages('312', 1, 20);

   //       setMessages(messagesRes.data.page);
   //    }

   //    if (!socket.connected) {
   //       socket.auth = {
   //          user: {
   //             id: sessionStorage.getItem('userId')
   //          },
   //          teams: [sessionStorage.getItem('teamId')]
   //       };

   //       socket.on('connection', console.log('Usuário conectado'));

   //       socket.on('ttm', m => {
   //          console.log(m);
   //          setMessages(oldMessages => [...oldMessages, m]);
   //       });

   //       socket.connect();

   //       getMessagesRes();
   //    }
   // }, []);

   return (
      <S.PageContainer>
         <Sidebar page='chat' />
         <S.ContentContainer>
            <S.TopBar>
               <img src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
               <span>Nome do time</span>
            </S.TopBar>

            <S.MessagesArea>
               <S.MessagesContainer>
                  {
                     messages.map(message => {
                        return (
                        <S.MessageBox isSender={message.userId == localStorage.getItem('personaId')}>
                           <Message msg={message}/>
                        </S.MessageBox>
                        )
                     })
                  }
               </S.MessagesContainer>
               <S.InputContainer>
                  <Input.Default
                  placeholder='Mensagem'
                  value={newMessage}
                  onInput={e => setNewMessage(e.target.value)}
                  >
                     <ChatCircleDots />
                  </Input.Default>
                  <Button.Primary onClick={sendMessage} marginTop='0%' value='Enviar' fontSize='1.3rem'/>
               </S.InputContainer>
            </S.MessagesArea>
         </S.ContentContainer>
         <S.RightBar>
            <S.CurrentUserContainer>
               <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
               <S.CurrentUserInfo>
                  <span>Nome do usuário</span>
                  <Status status='online'/>
               </S.CurrentUserInfo>
            </S.CurrentUserContainer>

            <Input.Default
               placeholder="Pesquisar jogador"
            >
               <MagnifyingGlass />
            </Input.Default>

            <S.ListContainer>
               <span>Jogadores do time</span>
               <S.OnlineList>
                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online'/>
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online'/>
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online'/>
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online'/>
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online'/>
                     </S.AthleteInfo>
                  </S.Athlete>
               </S.OnlineList>
            </S.ListContainer>
         </S.RightBar>
      </S.PageContainer>
   )

   // mensagem: {
   //    date,
   //    message,
   //    userId,
   //    username
   // }
}