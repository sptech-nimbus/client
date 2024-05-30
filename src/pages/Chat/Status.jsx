import * as S from "./Chat.styled";

export default function Status({ status = 'offline', fontSize }) {
   return (
      <S.StatusContainer>
         <S.StatusIndicator status={status}/>
         <S.StatusText status={status} fontSize={fontSize}>
            {status == 'online' ? 'online' : 'offline'}
         </S.StatusText>
      </S.StatusContainer>
   )
}