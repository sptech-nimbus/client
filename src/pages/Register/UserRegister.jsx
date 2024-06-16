/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as S from './Register.styled';
import * as LS from '@pages/Login/Login.styles';

import { useAuth } from '@contexts/auth';
import { useNotification } from '@contexts/notification';

import Background from '@components/Background/Background';
import Stepper from '@components/Stepper/Stepper';

import FormStepOne from './FormStepOne';
import FormStepTwo from './TrainerRegister/FormStepTwo';
import FormStepTwoAthlete from './AthleteRegister/FormStepTwo';
import FormStepThree from './TrainerRegister/FormStepThree';
import FormStepThreeAthlete from './AthleteRegister/FormStepThree';
import FormStepFour from './AthleteRegister/FormStepFour';

import user from '@api/user';
import blobStorage from '@api/blobStorage';
import athleteDesc from '@api/athleteDesc';
import { useNavigate, useNavigation } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

export default function UserRegister({ teamRegister = false }) {
    const { addNotification } = useNotification();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isRegisterFinished, setIsRegisterFinished] = useState(false);
    const [step, setStep] = useState(1);
    const [token, setToken] = useState('')

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [typeUser, setTypeUser] = useState('coach');

    const [personData, setPersonData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: ''
    });

    const [teamData, setTeamData] = useState({
        name: '',
        category: '',
        local: '',
        coach: {
            id: ''
        }
    });

    const [athleteDescData, setAthleteDescData] = useState({
        weight: '',
        height: '',
        position: '',
        athlete: {
            id: ''
        }
    });

    useEffect(() => {
        if (isRegisterFinished) {
            toast.success('Cadastro realizado! Redirecionando para tela de login...', { autoClose: 2000 });
            setTimeout(() => {
                navigate('/login');
            }, 2600);
        }
    }, [isRegisterFinished]);

    async function handleFormSubmit(formData) {
        if (step == 1) {
            setPersonData({
                ...personData,
                firstName: formData.name,
                lastName: formData.lastName,
                birthDate: formData.date,
            });
            setTypeUser(formData.typeUser);
            setStep(step + 1);
        }
        else if (step == 2 && typeUser == "coach") {
            setUserData({
                email: formData.email,
                password: formData.password
            });
            personData.phone = formData.phone.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");

            try {
                await user.post({
                    email: formData.email,
                    password: formData.password,
                    coach: {
                        ...personData
                    }
                });
                try {
                    await login({ email: formData.email, password: formData.password });
                    navigate('/register/team');
                }
                catch (err) {
                    addNotification('error', 'Houve um erro a validação dos seus dados. Por favor aguarde um momento antes de tentar novamente.')
                }
                setStep(step + 1);
            }
            catch (err) {
                console.log('erro', err);
            }
        }
        else if (step == 2 && typeUser == "athlete") {
            console.log(formData)
            setUserData({
                email: formData.email,
                password: formData.password
            })

            personData.phone = formData.phone.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
            const updatePersonData = {
                ...personData,
                category: '',
                isStarting: ''
            }

            setPersonData(updatePersonData)
            console.log(personData);
            setStep(step + 1);
        }
        else if (step == 3 && typeUser == "athlete") {
            console.log(formData);
            setPersonData({
                ...personData,
                category: null,
                isStarting: null
            })

            athleteDescData.height = formData.height.replace('m', '');
            athleteDescData.weight = formData.weight.replace('kg', '');
            athleteDescData.position = formData.position;
            personData.category = formData.category;
            personData.isStarting = false;

            user.post({
                email: userData.email,
                password: userData.password,
                athlete: personData
            }).then(response => {
                console.log(response.data.data)

                if (response.status == 200) {
                    user.login({
                        email: userData.email,
                        password: userData.password,
                    }).then(response => {
                        const token = response.data.data.token;
                        athleteDescData.athlete.id = response.data.data.personaId

                        if (response.status == 200) {
                            athleteDesc.post(athleteDescData, token);
                        }
                        console.log('id da desgraça: ', response.data.data.userId);

                        if (formData.picture && response.status == 200) {
                            blobStorage.post(formData.picture, token, response.data.data.userId)
                                .then(response => {
                                    console.log(response);
                                }).catch(err => {
                                    console.log(err);
                                });
                        }
                    });

                }
            }).catch(error => {
                console.log((error));
                setStep(step - 1);
            });

            setStep(step + 1);
        }
        else if (step == 4 && typeUser == "athlete") {
            setIsRegisterFinished(!isRegisterFinished);
        }
    }

    return (
        <LS.Header>
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
                limit={3}
            />

            <Background.Login />
            <LS.Title>Cadastro</LS.Title>
            {step == 1 ?
                <FormStepOne onSubmit={handleFormSubmit} />
                :
                typeUser === "athlete" ? (
                    <>
                        {step > 1 &&
                            <S.StepperWrapper>
                                <Stepper steps={4} currentStep={step} />
                            </S.StepperWrapper>
                        }
                        {step == 2 && <FormStepTwoAthlete onSubmit={handleFormSubmit} />}
                        {step == 3 && <FormStepThreeAthlete onSubmit={handleFormSubmit} />}
                        {step == 4 && <FormStepFour onSubmit={handleFormSubmit} />}
                    </>
                ) : (
                    <>
                        {step > 1 &&
                            <S.StepperWrapper>
                                <Stepper steps={2} currentStep={step} />
                            </S.StepperWrapper>
                        }
                        {step == 2 && <FormStepTwo onSubmit={handleFormSubmit} />}
                    </>
                )
            }
        </LS.Header>
    )
}

// UserRegister.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// }