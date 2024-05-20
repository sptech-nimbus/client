import { Dialog } from '../Dialog/Dialog';

export function DeleteModal({ athlete, onDelete }) {
    return (
        <Dialog title='Excluir Atleta' trigger={
            <S.Container>
                <S.Header>
                    <span>{athlete.name}</span>
                    <span>{athlete.position}</span>
                </S.Header>
                <S.Description>{athlete.description}</S.Description>
            </S.Container>
        }/>
            <S.ConfirmationText>
                Tem certeza que deseja excluir o atleta <strong>{athlete.name}</strong>?
            </S.ConfirmationText>
            <S.Buttons>
                <S.CancelButton>Cancelar</S.CancelButton>
                <S.DeleteButton onClick={() => onDelete(athlete.id)}>Excluir</S.DeleteButton>
            </S.Buttons>
        </Dialog>
    )
}