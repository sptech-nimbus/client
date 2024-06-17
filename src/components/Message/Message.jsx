import * as S from './Message.styled';

export default function Message({ msg }) {
   const date = new Date(`${msg.date}`);
   const currentDate = new Date();

   console.log(msg);

   if (!msg.message) {
      return;
   }

   return (
      <S.Container isSender={msg.userId == localStorage.id}>
         <S.User isSender={msg.userId == localStorage.id}>
            {msg.username}
         </S.User>
         <S.Content>
            {msg.message}
         </S.Content>
         <S.Date>
            {
               currentDate.toLocaleDateString('pt-br') == date.toLocaleDateString('pt-br')
                  ? (date.toLocaleTimeString('pt-br'))
                  : (`${date.toLocaleDateString('pt-BR')} - ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`)
            }
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