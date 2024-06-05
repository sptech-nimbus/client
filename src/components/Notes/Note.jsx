import * as S from './Note.styled';
import { Dialog } from '../Dialog/Dialog';

export function Note({ note }) {
   const date = new Date(note.time);

   return (
      <Dialog title='Feedback do Treinador' trigger={
         <S.Container>
            <S.Header>
               <span>{note.title}</span>
            </S.Header>
            <S.Description>{note.description}</S.Description>
         </S.Container>
      }>
         {note.description}
      </Dialog>
   )
}
