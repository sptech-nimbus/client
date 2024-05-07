import { useState, useEffect } from 'react';

import * as S from '../Register.styled';
import * as LS from '../../Login/Login.styles';

import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import Checkbox from '@components/Checkbox/Checkbox';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { TextValidation, TeamCodeValidation, ImageValidation, CategoryValidation } from '@utils/Validations';

import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FormStepFour({onSubmit}) {
    const [teamName, setTeamName] = useState('');
    const [teamCode, setTeamCode] = useState('');
    const [category, setCategory] = useState('');
    const [teamPicture, setTeamPicture] = useState('');
    const [local, setLocal] = useState('');
    const [chkAmateur, setChkAmateur] = useState(false);

    const [teamNameErr, setTeamNameErr] = useState(false);
    const [teamCodeErr, setTeamCodeErr] = useState(false);
    const [categoryErr, setCategoryErr] = useState(false);

    const [teamNameTtpOpen, setTeamNameTtpOpen] = useState(false);
    const [teamCodeTtpOpen, setTeamCodeTtpOpen] = useState(false);
    const [teamPictureTtpOpen, setTeamPictureTtpOpen] = useState(false);

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

    function handleLocalChange(e) {
        const { value } = e.target;
        setLocal(value);
    }

    function handleTeamNameChange(e) {
        const { value } = e.target;
        setTeamName(value);
    }

    function handleTeamCodeChange(e) {
        const { value } = e.target;
        setTeamCode(value);
    }
    function handleCategoryChange(e) {
        const { value } = e.target;
        setCategory(value);
    }
    function handleTeamPictureChange(e) {
        setTeamPicture(e.target.files[0]);
    }
    function handleChkAmateur() {
        setChkAmateur(!chkAmateur);
    }

    function handleTeamNameTtpChange() {
        setTeamNameTtpOpen(!teamNameTtpOpen);
    }

    function handleTeamCodeTtpChange() {
        setTeamCodeTtpOpen(!teamCodeTtpOpen);
    }

    function handleTeamPictureTtpChange() {
        setTeamPictureTtpOpen(!teamPictureTtpOpen);
    }
    function handleSubmit(e) {
        e.preventDefault();

        console.log("entremo")

        if (TeamCodeValidation(teamCode)) {
            console.log("Enviando solicita��o com o c�digo do time existente:", teamCode);
            onSubmit(teamCode);
        }
        else if (
            TextValidation(teamName) &&
            CategoryValidation(category) &&
            ImageValidation(teamPicture)) {
            
            onSubmit({ teamName, category, teamPicture, chkAmateur, local });
        }
        else {
            if (teamCode) {
                if (!TeamCodeValidation(teamCode)) toast.error('C�digo inserido � inv�lido');
            } else {
                if (!TextValidation(teamName)) toast.error('Nome do time � inv�lido');
                if (!ImageValidation(teamPicture)) toast.error('A extens�o de arquivo inserida � inv�lida');
            }
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
                            disabled={teamName || category || teamPicture ? true : false}
                            maxLength={6}
                        />
                        {
                            !isBelow799 &&
                            <Tooltip side='right' open={teamCodeTtpOpen} onHover={handleTeamCodeTtpChange}>
                                <span>
                                    O código do time é disponibilizado pelo treinador atual do time que deseja se cadastrar. Caso haja
                                    uma passagem de responsabilidade, contate o treinador do time em questão e peça para ele gerar o código.
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