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
    });
    const [typeUser, setTypeUser] = useState('');

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
    });

    function handleFormSubmit(formData) {
        if (step == 1) {
            setPersonData({
                ...personData,
                firstName: formData.name,
                lastName: formData.lastName,
                birthDate: formData.date,
            });
            setTypeUser(formData.typeUser);

            console.log('tipo usuario do index form '+formData.typeUser);
            console.log('tipo usuario do index userData '+typeUser);

            setStep(step + 1);
        }
        else if (step == 2 && typeUser == "coach") {
            setUserData({
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            })

            setStep(step + 1)
        }
        else if (step == 2 && typeUser == "athlete") {
            setUserData({
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            })

            const updatePersonData = {
                ...personData,
                category: '',
                isStarting: ''
            }

            setPersonData(updatePersonData)
            console.log(personData);

            setStep(step + 1);
        }
        else if (step == 3 && typeUser == "coach") {
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
        else if (step == 3 && typeUser == "athlete") {
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
        else if (step == 4 && typeUser == "athlete") {
            console.log(formData.code);  
        }
    }

    return (
        <LS.Header>
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
                        {step == 2 && <FormStepTwo onSubmit={handleFormSubmit} />}
                        {step == 3 && <FormStepThreeAthlete onSubmit={handleFormSubmit} />}
                        {step == 4 && <FormStepFour onSubmit={handleFormSubmit} />}
                    </>
                ) : (
                    <>
                        {step > 1 && 
                        <S.StepperWrapper>
                            <Stepper steps={3} currentStep={step} />
                        </S.StepperWrapper>
                        }
                        {step == 2 && <FormStepTwo onSubmit={handleFormSubmit} />}
                        {step == 3 && <FormStepThree onSubmit={handleFormSubmit} />}
                    </>
                )
            }
        </LS.Header>
    )
}