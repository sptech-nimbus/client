import { useState } from 'react';
import * as S from '../Register/assets/Register.styled';
import * as LS from '@pages/Login/Login.styles';

import Background from '@components/Background/Background';
import Stepper from '@components/Stepper/Stepper';

import FormStepOne from '../UserRegister/FormStepOne';
import FormStepTwo from '../UserRegister/TrainerRegister/FormStepTwo';
import FormStepThree from '../UserRegister/TrainerRegister/FormStepThree';
import FormStepThreeAthlete from '../UserRegister/AthleteRegister/FormStepThree';
import FormStepFour from '../UserRegister/AthleteRegister/FormStepFour';

import user from '@api/user';
import team from '@api/team';
import athlete from '@api/athlete';
import athleteDesc from '@api/athleteDesc';

export default function Register() {
    const [step, setStep] = useState(3);

    const [token, setToken] = useState('')

    const [personaId, setPersonaId] = useState('')

    const [userData, setUserData] = useState({
        email: 'michaelhenrique0022@gmail.com',
        password: 'Wn+V8>v;s2vmpQ4',
        typeUser: 'athlete'
    });

    const [personData, setPersonData] = useState({
        firstName: 'Michael',
        lastName: 'Henrique',
        birthDate: '2002-03-01',
        phone: '11955777482'
    });

    const [teamData, setTeamData] = useState({
        code: null,
        name: null,
        category: null,
        picture: null,
        local: null,

    });

    const [athleteDescData, setAthleteDescData] = useState({
        weight: null,
        height: null,
        position: null,
    })

    function handleFormSubmit(formData) {
        if (step === 1) {
            personData.firstName = formData.name;
            personData.lastName = formData.lastName;
            personData.birthDate = formData.date;
            userData.typeUser = formData.typeUser;

            setStep(step + 1);
        }
        else if (step == 2 && userData.typeUser === "coach") {
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

            personData.category = '';
            personData.isStarting = '';

            setPersonData(updatePersonData)

            console.log(personData);

            setStep(step + 1);
        }
        else if (step == 3 && userData.typeUser === "coach") {
            teamData.code = formData.teamCode;
            teamData.name = formData.teamName;
            teamData.category = formData.category;
            teamData.logo = formData.teamLogo;
            teamData.isAmateur = formData.chkAmateur;

            user.post({
                email: userData.email,
                password: userData.password,
                coach: personData
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log((error.response.data));
                setStep(step - 1);
            });
            team.post(teamData);
        }
        else if (step == 3 && userData.typeUser === "athlete") {

            personData.category = formData.category;
            personData.isStarting = false;

            athleteDescData.height = formData.height.replace('cm', '');
            athleteDescData.weight = formData.weight.replace('kg', '');
            athleteDescData.position = formData.position;

            user.post({
                email: userData.email,
                password: userData.password,
                athlete: personData
            }).then(response => {
                console.log(response.data.data)
                let personID = response.data.data.personaId;
                setPersonaId(personID)

                if (response.status == 200) {
                    user.login({
                        email: userData.email,
                        password: userData.password,
                    }).then(response => {
                        console.log(response.data.data.token)
                        setToken(response.data.data.token)
                    })
                }
            }).catch(error => {
                console.log((error.response.data));
                setStep(step - 1);
            });

            setStep(step + 1);
        }
        else if (step == 4 && userData.typeUser === "athlete") {
            
            console.log(athleteDescData);
            athleteDesc.post({
                athleteDescData, token
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error.response)
            })

            console.log(formData)
            teamData.name = formData.teamName;
            teamData.category = formData.category;
            teamData.picture = formData.teamPicture;
            teamData.local = formData.local;   
        }
    }

    return (
        <LS.Header>
            <Background.Login />
            <LS.Title>Cadastro</LS.Title>

            {userData.typeUser === "athlete" ? (
                <>
                    <S.StepperWrapper>
                        <Stepper steps={4} currentStep={step} />
                    </S.StepperWrapper>
                    {step === 1 && <FormStepOne onSubmit={handleFormSubmit} />}
                    {step === 2 && <FormStepTwo onSubmit={handleFormSubmit} />}
                    {step === 3 && <FormStepThreeAthlete onSubmit={handleFormSubmit} />}
                    {step === 4 && <FormStepFour onSubmit={handleFormSubmit} />}
                </>
            ) : (
                <>
                    <S.StepperWrapper>
                        <Stepper steps={3} currentStep={step} />
                    </S.StepperWrapper>
                    {step === 1 && <FormStepOne onSubmit={handleFormSubmit} />}
                    {step === 2 && <FormStepTwo onSubmit={handleFormSubmit} />}
                    {step === 3 && <FormStepThree onSubmit={handleFormSubmit} />}
                </>
            )}
        </LS.Header>
    )
}