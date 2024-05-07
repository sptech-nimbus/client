import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '@pages/Login/Login.styles';

import Background from '@components/Background/Background';
import Stepper from '@components/Stepper/Stepper';

import FormStepOne from './FormStepOne';
import FormStepTwo from './TrainerRegister/FormStepTwo';
import FormStepThree from './TrainerRegister/FormStepThree';
import FormStepThreeAthlete from './AthleteRegister/FormStepThree';
import FormStepFour from './AthleteRegister/FormStepFour';

import user from '@api/user';
import team from '@api/team';
import athlete from '@api/athlete';
import athleteDesc from '@api/athleteDesc';

export default function Register() {
    const [step, setStep] = useState(1);

    const [token, setToken] = useState('')

    const [personaId, setPersonaId] = useState('')

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        typeUser: 'athlete'
    });

    const [personData, setPersonData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: ''
    });

    const [teamData, setTeamData] = useState({
        code: '',
        name: '',
        category: '',
        picture: '',
        local: '',

    });

    const [athleteDescData, setAthleteDescData] = useState({
        weight: '',
        height: '',
        position: '',
        athlete: {
            id: ''
        }
    })

    function handleFormSubmit(formData) {
        if (step === 1) {
            setPersonData({
                ...personData,
                firstName: formData.name,
                lastName: formData.lastName,
                birthDate: formData.date,
                typeUser: formData.typeUser,
            })

            setStep(step + 1);
        }
        else if (step == 2 && userData.typeUser === "coach") {
            setUserData({
                email: formData.email,
                password: formData.password,
                phone: formData.formattedPhone,
            })

            setStep(step + 1)
        }
        else if (step == 2 && userData.typeUser === "athlete") {
            userData.email = formData.email;
            userData.password = formData.password;
            personData.phone = formData.formattedPhone

            const updatePersonData = {
                ...personData,
                category: '',
                isStarting: ''
            }

            setPersonData(updatePersonData)
            console.log(personData);

            setStep(step + 1);
        }
        else if (step == 3 && userData.typeUser === "coach") {
            setTeamData({
                code: formData.code,
                name: formData.name,
                category: formData.category,
                picture: formData.picture,
                // isAmateur: formData.chkAmateur;
            })

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
            setPersonData({
                category: formData.category,
                isStarting: false
            })

            setAthleteDescData({ 
                ...athleteDescData,
                height: formData.height.replace('cm', ''),
                weight: formData.weight.replace('kg', ''),
                position: formData.position
            })
            
            user.post({
                email: userData.email,
                password: userData.password,
                athlete: personData
            }).then(response => {
                console.log(response.data.data)

                if (response.status == 200) {
                    console.log(athleteDescData);

                    setAthleteDescData({
                        ...athleteDescData,
                        athlete: {
                            id: response.data.data.personaId
                        }
                    })
                    
                    athleteDesc.post({
                        body: athleteDescData, token
                    }).then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error.response)
                    })        

                    user.login({
                        email: userData.email,
                        password: userData.password,
                    }).then(response => {
                        console.log(response.data.data.token)
                        setToken(response.data.data.token)
                    })
                }
            }).catch(error => {
                console.log((error));
                setStep(step - 1);
            });

            setStep(step + 1);
        }
        else if (step == 4 && userData.typeUser === "athlete") {
            console.log('bfial');

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
                    {step > 1 && 
                    <S.StepperWrapper>
                        <Stepper steps={4} currentStep={step} />
                    </S.StepperWrapper>
                    }
                    {step === 1 && <FormStepOne onSubmit={handleFormSubmit} />}
                    {step === 2 && <FormStepTwo onSubmit={handleFormSubmit} />}
                    {step === 3 && <FormStepThreeAthlete onSubmit={handleFormSubmit} />}
                    {step === 4 && <FormStepFour onSubmit={handleFormSubmit} />}
                </>
            ) : (
                <>
                    {step > 1 && 
                    <S.StepperWrapper>
                        <Stepper steps={3} currentStep={step} />
                    </S.StepperWrapper>
                    }
                    {step === 1 && <FormStepOne onSubmit={handleFormSubmit} />}
                    {step === 2 && <FormStepTwo onSubmit={handleFormSubmit} />}
                    {step === 3 && <FormStepThree onSubmit={handleFormSubmit} />}
                </>
            )}
        </LS.Header>
    )
}