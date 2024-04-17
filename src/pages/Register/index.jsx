import { useState } from 'react';
import * as S from '../Register/assets/Register.styled';
import * as LS from '@pages/Login/Login.styles';

import Background from '@components/Background/Background';
import Stepper from '@components/Stepper/Stepper';

import FormStepOne from '../UserRegister/FormStepOne';
import FormStepTwo from '../UserRegister/TrainerRegister/FormStepTwo';
import FormStepThree from '../UserRegister/TrainerRegister/FormStepThree';
import FormStepThreeAthlete from '../UserRegister/AthleteRegister/FormStepThree';

import user from '@api/user';
import team from '@api/team';

export default function Register() {
    const [step, setStep] = useState(3);

    const [userData, setUserData] = useState({
        email: null,
        password: null,
        typeUser: null
    });

    const [personData, setPersonData] = useState({
        firstName: null,
        lastName: null,
        birthDate: null,
        phone: null
    })

    const [teamData, setTeamData] = useState({
        code: null,
        name: null,
        category: null,
        logo: null,
        isAmateur: null
    })

    function handleFormSubmit(formData) {
        if (step === 1) {
            personData.firstName = formData.name;
            personData.lastName = formData.lastName;
            personData.birthDate = formData.date;
            userData.typeUser = formData.typeUser;

            setStep(step + 1);
        } else if (step == 2 && userData.typeUser == "coach") {
            userData.email = formData.email;
            userData.password = formData.password;
            personData.phone = formData.formattedPhone


            setStep(step + 1)
        }
        else if (step == 2 && userData.typeUser === "athlete") {
            
            userData.email = formData.email;
            userData.password = formData.password;

            personData.phone = formData.formattedPhone
                
            const updatePersonData = {
                ...personData,
                category: null,
                isStarting: null
            }

            setPersonData(updatePersonData)
            console.log(personData)

            setStep(step + 1);
        }
        else if (step == 3) {
            teamData.code = formData.teamCode;
            teamData.name = formData.teamName;
            teamData.category = formData.category;
            teamData.logo = formData.teamLogo;
            teamData.isAmateur = formData.chkAmateur;

            console.log(personData);

            user.post({
                email: userData.email,
                password: userData.password,
                athlete: personData
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log((error.response.data));
                setStep(step - 1);
            });
            team.post(teamData);
        }
    }
    if (userData.typeUser === "athlete") {
        return (
            <LS.Header>
                <Background.Login />
                <LS.Title>
                    Cadastro
                </LS.Title>

                <S.StepperWrapper>
                    <Stepper steps={3} currentStep={step} />
                </S.StepperWrapper>

                {step === 1 ? (
                    <FormStepOne onSubmit={handleFormSubmit} />
                ) : step === 2 ? (
                    <FormStepTwo onSubmit={handleFormSubmit} />
                ) : (
                    <FormStepThree onSubmit={handleFormSubmit} />
                )}
            </LS.Header>
        )
    } else {
        return (
            <LS.Header>
                <Background.Login />
                <LS.Title>
                    Cadastro
                </LS.Title>

                <S.StepperWrapper>
                    <Stepper steps={4} currentStep={step} />
                </S.StepperWrapper>

                {step === 1 ? (
                    <FormStepOne onSubmit={handleFormSubmit} />
                ) : step === 2 ? (
                        <FormStepTwo onSubmit={handleFormSubmit} />
                    ) : step === 3 ? (
                            <FormStepThreeAthlete onSubmit={handleFormSubmit} />
                        ) : (
                            <FormStepThree onSubmit={handleFormSubmit} />
                )}
            </LS.Header>
        )
    }
}