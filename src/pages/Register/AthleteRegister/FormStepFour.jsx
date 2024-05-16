import { useState, useEffect } from 'react';

import * as S from '../Register.styled';
import * as LS from '../../Login/Login.styles';

import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import Checkbox from '@components/Checkbox/Checkbox';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { TeamCodeValidation } from '@utils/Validations';

import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FormStepFour({onSubmit}) {
    const [teamCode, setTeamCode] = useState('');
    const [teamCodeTtpOpen, setTeamCodeTtpOpen] = useState(false);

    const [toastPosition, setToastPosition] = useState('top-right');

    const isBelow799 = useMediaQuery({ maxWidth: 799 });
    const isBelow1050 = useMediaQuery({ maxWidth: 1050 });

    useEffect(() => {
        if (isBelow1050) {
            setToastPosition('top-center');
        } else {
            setToastPosition('top-right');
        }
    }, [isBelow1050]);

    function handleTeamCodeChange(e) {
        const { value } = e.target;
        setTeamCode(value);
    }

    function handleTeamCodeTtpChange() {
        setTeamCodeTtpOpen(!teamCodeTtpOpen);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (TeamCodeValidation(teamCode)) {
            console.log("Enviando solicitação com o código do time existente: ", teamCode);
            onSubmit({ code: teamCode });
        }
        else {
            if (!TeamCodeValidation(teamCode)) toast.error('Código inserido é inválido');
        }
    }

    return (
        <S.Form onSubmit={handleSubmit}>
            <ToastContainer
                position={toastPosition}
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
                limit={3}
            />
            <LS.InputsContainer>
                <Label>
                    Código do time existente
                    <S.InputLine>
                        <Input.Default
                            placeholder={'1A2B3C'}
                            value={teamCode}
                            onChange={handleTeamCodeChange}
                            onFocus={handleTeamCodeTtpChange}
                            onBlur={handleTeamCodeTtpChange}
                            maxLength={6}
                        />
                        {
                            !isBelow799 &&
                            <Tooltip side='right' open={teamCodeTtpOpen} onHover={handleTeamCodeTtpChange}>
                                <span>
                                    O código do time é disponibilizado pelo treinador atual do time que deseja se cadastrar. Contate o treinador do time em questão e peça para ele gerar o código.
                                </span>
                            </Tooltip>
                        }

                    </S.InputLine>
                </Label>
            </LS.InputsContainer>
            <Button.Primary
                value={'Continuar'}
                size={'md'}
                width={'100%'}
                fontSize={'1.5rem'}
                onClick={handleSubmit}
            />
        </S.Form>
    )
}