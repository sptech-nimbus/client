import Sidebar from "@components/Sidebar/Sidebar";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/Socket";
import { useState } from "react";
import { getMessages } from "../../api/chat";

export default function Chat() {
   sessionStorage.setItem('userId', '123');
   sessionStorage.setItem('teamId', '312');
   sessionStorage.setItem('username', 'kauan oliveira');

   const [newMessage, setNewMessage] = useState('');
   const [messages, setMessages] = useState([]);

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

   useEffect(() => {
      const getMessagesRes = async () => {
         const messagesRes = await getMessages('312', 1, 20);

         setMessages(messagesRes.data.page);
      }

      if (!socket.connected) {
         socket.auth = {
            user: {
               id: sessionStorage.getItem('userId')
            },
            teams: [sessionStorage.getItem('teamId')]
         };

         socket.on('connection', console.log('Usuário conectado'));

         socket.on('ttm', m => {
            console.log(m);
            setMessages(oldMessages => [...oldMessages, m]);
         });

         socket.connect();

         getMessagesRes();
      }
   }, []);

   return (
      <>
         <Sidebar page='chat' />
         <input value={newMessage} onInput={e => setNewMessage(e.target.value)}></input>
         <button onClick={sendMessage}>enviar mensagem</button>

         {
            messages.map(message => {
               return <h1 key={message.date} style={{ color: 'white' }}>{message.message}</h1>
            })
         }
      </>
   )

   // mensagem: {
   //    date,
   //    message,
   //    userId,
   //    username
   // }
}