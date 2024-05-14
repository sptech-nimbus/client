import * as S from './Message.styled';

export function Message({ msg }) {
   return (
      <S.Container isSender={msg.userId == sessionStorage.id}>
         <S.User isSender={msg.userId == sessionStorage.id}>
            {msg.username}
         </S.User>
         <S.Content>
               {msg.message}
         </S.Content>
         <S.Date>
            {msg.date}
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