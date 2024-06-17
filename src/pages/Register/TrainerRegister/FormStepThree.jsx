/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import { useNotification } from '@contexts/notification';

import * as S from '../Register.styled';
import * as LS from '../../Login/Login.styles';

import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { TextValidation, TeamCodeValidation, ImageValidation } from '@utils/Validations';

import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FormStepThree({ onSubmit }) {
    const { addNotification } = useNotification();
    const [teamData, setTeamData] = useState({
        name: '',
        code: '',
        category: '',
        picture: '',
        local: '',
    });

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
        setTeamData({
            ...teamData,
            local: value
        });
    }

    function handleTeamNameChange(e) {
        const { value } = e.target;
        setTeamData({
            ...teamData,
            name: value
        });
    }

    function handleTeamCodeChange(e) {
        const { value } = e.target;
        setTeamData({
            ...teamData,
            code: value
        });
    }
    function handleCategoryChange(e) {
        const { value } = e.target;
        setTeamData({
            ...teamData,
            category: value
        });
    }
    function handleTeamPictureChange(e) {
        setTeamData({
            ...teamData,
            picture: e.target.files[0]
        });
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

    const validateFields = () => {
        return teamData.name && teamData.category && teamData.local
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (TeamCodeValidation(teamData.code)) {
            onSubmit(teamData.code);
        }
        else if ((validateFields() && ImageValidation(teamData.picture)) || (!teamData.picture && validateFields())) {
            delete teamData.code;
            onSubmit(teamData);
        }
        else {
            if (!teamData.name) addNotification('error', 'Preencha o nome do time.');
            if (!teamData.category) addNotification('error', 'Preencha a categoria do time.');
            if (!teamData.local) addNotification('error', 'Preencha a localidade do time.');
            if (teamData.code) {
                if (!TeamCodeValidation(teamData.code)) addNotification('error', 'Código inserido é inválido');
            }

            if (teamData.picture) {
                if (!ImageValidation(teamData.picture)) addNotification('error', 'A extensão de arquivo inserida é inválida');
            }
        }
    }

    return (
        <S.FormStepThree onSubmit={handleSubmit} encType='multipart/form-data'>
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
                {/* <Label>
            Código do time existente
                    <S.InputLine>
                        <Input.Default
                            placeholder={'1A2B3C'}
                            value={teamData.code}
                            onChange={handleTeamCodeChange}
                            onFocus={handleTeamCodeTtpChange}
                            onBlur={handleTeamCodeTtpChange}
                            disabled={teamData.name || teamData.category || teamData.picture || teamData.local ? true : false}
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
                </Label> */}
                <Label>
                    Nome do time
                    <S.InputLine>
                        <Input.Default
                            placeholder={'Nome do Time SC'}
                            value={teamData.name}
                            onChange={handleTeamNameChange}
                            onFocus={handleTeamNameTtpChange}
                            onBlur={handleTeamNameTtpChange}
                            disabled={teamData.code ? true : false}
                        />
                        {
                            !isBelow799 &&
                            <Tooltip side='right' open={teamNameTtpOpen} onHover={handleTeamNameTtpChange}>
                                <span>O nome do time deve possuir pelo menos 2 caracteres e não deve possuir números ou caracteres especiais.</span>
                            </Tooltip>
                        }
                    </S.InputLine>
                </Label>

                <LS.InputsContainer>
                    <Label>
                        Categoria
                        <Input.Default
                            placeholder={'Sub-20'}
                            value={teamData.category}
                            onChange={handleCategoryChange}
                            disabled={teamData.code ? true : false}
                        />
                    </Label>
                    <Label>
                        Endereço do time
                        <S.InputLine>
                            <Input.Default
                                value={teamData.local}
                                placeholder={'Rua XV'}
                                onChange={handleLocalChange}
                                disabled={teamData.code ? true : false}
                            />
                        </S.InputLine>
                    </Label>
                </LS.InputsContainer>

                <Label>
                    Escudo do time
                    <S.InputLine>
                        <Input.Image
                            type={'file'}
                            onChange={handleTeamPictureChange}
                            onFocus={handleTeamPictureTtpChange}
                            onBlur={handleTeamPictureTtpChange}
                            disabled={teamData.code ? true : false}
                        />
                        {
                            !isBelow799 &&
                            <Tooltip side='right' open={teamPictureTtpOpen} onHover={handleTeamPictureTtpChange}>
                                <span>As extensões de arquivo aceitas são .jpg, .jpeg e .png.</span>
                            </Tooltip>
                        }
                    </S.InputLine>
                </Label>
                {/* <Checkbox 
                    id={'isAmateur'} 
                    label={'Sou um time amador.'} 
                    checked={chkAmateur}
                    onClick={handleChkAmateur}
                /> */}
            </LS.InputsContainer>
            <Button.Primary
                value={'Continuar'}
                size={'md'}
                width={'100%'}
                fontSize={'1.5rem'}
                onClick={handleSubmit}
            />
        </S.FormStepThree>
    )
}