import * as S from './Message.styled';

export default function Message({ msg }) {
   const date = new Date(`${msg.date}`);

   return (
      <S.Container isSender={msg.userId == localStorage.personaId}>
         <S.User isSender={msg.userId == localStorage.personaId}>
            {msg.username}
         </S.User>
         <S.Content>
               {msg.message}
         </S.Content>
         <S.Date>
            {date.toLocaleDateString('pt-BR')} - {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
         </S.Date>
      </S.Container>
   )
}
// mensagem: {
//    date,
//    message,
//    userId,
//    username
// }