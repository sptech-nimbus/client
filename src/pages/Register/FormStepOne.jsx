import { useState, useEffect } from 'react';

import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';

import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { TextValidation, PastDateValidation } from '@utils/Validations';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

export default function FormStepOne({onSubmit}) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState('');

    const [nameErr, setNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);

    const [nameTtpOpen, setNameTtpOpen] = useState(false);
    const [lastNameTtpOpen, setLastNameTtpOpen] = useState(false);
    const [dateTtpOpen, setDateTtpOpen] = useState(false);

    const [toastPosition, setToastPosition] = useState('top-right');

    const [typeUser, setTypeUser] = useState('coach');

    const isBelow799 = useMediaQuery({ maxWidth: 799 });
    const isBelow1050 = useMediaQuery({ maxWidth: 1050 });

    useEffect(() => {
        if (isBelow1050) {
            setToastPosition('top-center');
        } else {
            setToastPosition('top-right');
        }
    }, [isBelow1050]);

    function handleNameChange(e) {
        const { value } = e.target;
        setName(value);
    }

    function handleLastNameChange(e) {
        const { value } = e.target;
        setLastName(value);
    }

    function handleDateChange(e) {
        const { value } = e.target;
        setDate(value);
    }

    function handleNameTtpChange() {
        setNameTtpOpen(!nameTtpOpen);
    }

    function handleLastNameTtpChange() {
        setLastNameTtpOpen(!lastNameTtpOpen);
    }

    function handleDateTtpChange() {
        setDateTtpOpen(!dateTtpOpen);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (TextValidation(name) && TextValidation(lastName) && PastDateValidation(date)) {
            onSubmit({ typeUser, name, lastName, date })
        } else {
            if (!TextValidation(name)) toast.error("O nome inserido não é válido.");
            if (!TextValidation(lastName)) toast.error("O sobrenome inserido não é válido.");
            if (!PastDateValidation(date)) toast.error("A data de nascimento inserida não é válida. Datas futuras não são aceitas.");
            console.log({ typeUser, name, lastName, date })
        }
    }
    
    const handleTabClick = (value) => {
        {
            setTypeUser(value);
        }
    }
    return (
        <S.Form onSubmit={handleSubmit}>
            <S.TabsRoot>
                <S.TabsList>
                    <S.TabsTrigger value="coach" onClick={(e) => { e.preventDefault(); handleTabClick("coach"); }} active={typeUser === "coach"}>
                        Treinador
                    </S.TabsTrigger>
                    <S.TabsTrigger value="athlete" onClick={(e) => { e.preventDefault(); handleTabClick("athlete"); }} active={typeUser === "athlete"}>
                        Jogador
                    </S.TabsTrigger>
                </S.TabsList>
            </S.TabsRoot>
            <S.TabsContent value="treinador">
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
                        <span>Nome <S.Mandatory>*</S.Mandatory></span>
                        <S.InputLine>
                            <Input.Default
                                placeholder={'John'}
                                value={name}
                                onChange={handleNameChange}
                                onFocus={handleNameTtpChange}
                                onBlur={handleNameTtpChange}
                            />
                            {!isBelow799 &&
                                <Tooltip side='right' open={nameTtpOpen} onHover={handleNameTtpChange}>
                                    <span>O nome deve possuir pelo menos 2 caracteres e não deve possuir números ou caracteres especiais.</span>
                                </Tooltip>
                            }
                        </S.InputLine>
                    </Label>
                    <Label>
                        <span>Sobrenome <S.Mandatory>*</S.Mandatory></span>
                        <S.InputLine>
                            <Input.Default
                                placeholder={'Doe'}
                                value={lastName}
                                onChange={handleLastNameChange}
                                onFocus={handleLastNameTtpChange}
                                onBlur={handleLastNameTtpChange}
                            />
                            {!isBelow799 &&
                                <Tooltip side='right' open={lastNameTtpOpen} onHover={handleLastNameTtpChange}>
                                    <span>O sobrenome deve possuir pelo menos 2 caracteres e não deve possuir números ou caracteres especiais.</span>
                                </Tooltip>
                            }
                        </S.InputLine>
                    </Label>

                    <Label>
                        <span>Data de nascimento <S.Mandatory>*</S.Mandatory></span>
                        <S.InputLine>
                            <Input.Default
                                type={'date'}
                                value={date}
                                onChange={handleDateChange}
                            />
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
                <LS.FormFooter>
                    <span>
                        Já possui uma conta? <br />
                        <LS.Link>
                            <LS.Highlight onClick={() => navigate('/login')}>Faça login</LS.Highlight>
                        </LS.Link>
                    </span>
                </LS.FormFooter>
            </S.TabsContent >
        </S.Form>
    );
}