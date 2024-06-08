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

   const [newMessage, setNewMessage] = useState('');
   const [messages, setMessages] = useState([]);

   const sendMessage = () => {
      const date = new Date();

      socket.emit('ttm', {
         user: {
            id: localStorage.getItem('id'),
            username: localStorage.getItem('username')
         },
         content: newMessage,
         date: date.toISOString(),
         team: {
            id: sessionStorage.getItem('teamId')
         }
      });

      setNewMessage('');
   }

   useEffect(() => {
      const getMessagesRes = async () => {
         const messagesRes = await getMessages(sessionStorage.getItem('teamId'), 1, 20);

         setMessages(messagesRes.data.page);
      }

      if (!socket.connected) {
         socket.auth = {
            user: {
               id: localStorage.getItem('id')
            },
            teams: [sessionStorage.getItem('teamId')]
         };

         socket.on('connection', console.log('Usuário conectado'));

         socket.on('ttm', m => {
            setMessages(oldMessages => [...oldMessages, m]);
         });

         socket.on('messageError', e => {
            console.log(e);
         });

         socket.connect();

         getMessagesRes();
      }
   }, []);

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
                           <S.MessageBox isSender={message.userId == localStorage.getItem('id')}>
                              <Message msg={message} />
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
                  <Button.Primary onClick={sendMessage} marginTop='0%' value='Enviar' fontSize='1.3rem' />
               </S.InputContainer>
            </S.MessagesArea>
         </S.ContentContainer>
         <S.RightBar>
            <S.CurrentUserContainer>
               <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
               <S.CurrentUserInfo>
                  <span>Nome do usuário</span>
                  <Status status='online' />
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
                        <Status status='online' />
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online' />
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online' />
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online' />
                     </S.AthleteInfo>
                  </S.Athlete>

                  <S.Athlete>
                     <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
                     <S.AthleteInfo online={true}>
                        <span>Nome do jogador</span>
                        <Status status='online' />
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