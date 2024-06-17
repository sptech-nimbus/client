import * as S from './Chat.styled';

import { useEffect, useRef, useState } from "react";
import { socket } from "../../utils/Socket";
import { getMessages } from "../../api/chat";

import Sidebar from "@components/Sidebar/Sidebar";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import Message from "@components/Message/Message";
import Status from './Status';

import { MagnifyingGlass, PaperPlaneRight, ChatCircleDots } from '@phosphor-icons/react';

import athlete from '@api/athlete';

export default function Chat() {
   const [user, setUser] = useState();
   const [allPlayers, setAllPlayers] = useState([]);
   const [newMessage, setNewMessage] = useState('');
   const [messages, setMessages] = useState([]);

   const msgEndRef = useRef(null);
   const containerRef = useRef(null);

   const scrollToBottom = () => {
      if (msgEndRef.current) {
         // msgEndRef.current.scrollIntoView({ behavior: "smooth" });
         msgEndRef.current.scrollTop = msgEndRef.current.scrollHeight;
      }
   }

   useEffect(() => { scrollToBottom() }, [messages])

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
         const messagesRes = await getMessages(sessionStorage.getItem('teamId'), 1, 100);
         setMessages(messagesRes.data.page);
      }

      const fetchAllPlayers = async () => {
         try {
            const { data: { data } } = await athlete.byTeam(
               sessionStorage.getItem('teamId'),
               localStorage.getItem('token')
            );

            setAllPlayers(data);
         }
         catch (err) {
            console.log(err);
         }
      }

      const fetchCurrentUser = async () => {
         try {
            const { data: { data } } = await athlete.get(localStorage.getItem('id'), localStorage.getItem('token'));

         }
         catch (err) {
            console.log(err);
         }
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

      fetchAllPlayers();
   }, []);


   return (
      <S.PageContainer>
         <Sidebar page='chat' />
         <S.ContentContainer>
            <S.TopBar>
               <img src={sessionStorage.getItem('teamPicture')} alt="" />
               <span>{sessionStorage.getItem('teamName')}</span>
            </S.TopBar>

            <S.MessagesArea>
               <S.MessagesContainer ref={msgEndRef}>
                  {
                     messages.map(message => {
                        return (
                           <S.MessageBox key={message} isSender={message.userId == localStorage.getItem('id')}>
                              <Message msg={message} />
                           </S.MessageBox>
                        )
                     })
                  }
                  {/* <span ref={msgEndRef} /> */}
               </S.MessagesContainer>
               <S.InputContainer>
                  <Input.Default
                     placeholder='Mensagem'
                     value={newMessage}
                     onInput={e => setNewMessage(e.target.value)}
                  >
                     <ChatCircleDots />
                  </Input.Default>
                  <Button.Primary onClick={sendMessage} $marginTop='0%' value='Enviar' fontSize='1.3rem' />
               </S.InputContainer>
            </S.MessagesArea>
         </S.ContentContainer>
         <S.RightBar>
            {/* <S.CurrentUserContainer>
               <S.AthleteImage src="https://loremflickr.com/cache/resized/65535_53323386360_17d01a1eb8_b_640_480_nofilter.jpg" alt="" />
               <S.CurrentUserInfo>
                  <span>Nome do usuário</span>
                  <Status status='online' />
               </S.CurrentUserInfo>
            </S.CurrentUserContainer> */}

            <Input.Default
               placeholder="Pesquisar jogador"
            >
               <MagnifyingGlass />
            </Input.Default>

            <S.ListContainer>
               <span>Jogadores do time</span>
               <S.OnlineList>
                  {allPlayers && allPlayers.map(player => (
                     <S.Athlete key={player}>
                        <S.AthleteImage src={player.picture} alt="" />
                        <S.AthleteInfo online={true}>
                           <span>{player.firstName} {player.lastName}</span>
                           {/* <Status status='online' /> */}
                        </S.AthleteInfo>
                     </S.Athlete>
                  )
                  )}
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