import { useState, useEffect } from 'react';
import * as LS from '@pages/Login/Login.styles';

import Background from '@components/Background/Background';

import FormStepThree from './TrainerRegister/FormStepThree';

import team from '@api/team';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

export default function TeamRegister() {
    const navigate = useNavigate();
    
    const [isRegisterFinished, setIsRegisterFinished] = useState(false);

    const [teamData, setTeamData] = useState({
        code: '',
        name: '',
        category: '',
        picture: '',
        local: '',

    });

    useEffect(() => {
        if(isRegisterFinished) {
           toast.success('Cadastro realizado!', { autoClose: 2000 });
           setTimeout(() => {
                navigate('/my-teams');
           }, 2600);
        }
     }, [isRegisterFinished]);

    function handleFormSubmit(formData) {
      setTeamData({
            code: formData.code,
            name: formData.name,
            category: formData.category,
            picture: formData.picture,
            // isAmateur: formData.chkAmateur;
      });

      team.post(teamData);
      setIsRegisterFinished(!isRegisterFinished);
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
            <FormStepThree onSubmit={handleFormSubmit} />
        </LS.Header>
    )
}