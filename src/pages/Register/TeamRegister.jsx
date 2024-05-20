import { useState, useEffect } from 'react';
import * as LS from '@pages/Login/Login.styles';

import { useNotification } from "@contexts/notification";
import { useAuth } from "@contexts/auth";

import Background from '@components/Background/Background';

import FormStepThree from './TrainerRegister/FormStepThree';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import team from "@api/team";
import blobStorage from "@api/blobStorage";

export default function TeamRegister() {
    const { token, personaId } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => { console.log(token, personaId); }, []);
    
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

    const handleFormSubmit = async (formData) => {
      setTeamData({
            code: formData.code,
            name: formData.name,
            category: formData.category,
            picture: formData.picture,
            coach: {
              id: id
            }
      });
      const { picture } = teamData;
      delete teamData.picture;

      try {
          await team.post(teamData, token);
          try {
            await blobStorage.post(picture); }
          catch(err) {
            addNotification('error', 'Houve um erro ao cadastrar a imagem do time. Tente novamente mais tarde.');
          }
          finally {
             addNotification('success', 'Cadastro realizado! Redirecionando para tela de seleção de time...');
            // setIsRegisterFinished(true);
          }
      }
      catch(err) {
         addNotification('error', 'Não foi possível realizar o cadastro do time, por favor tente novamente mais tarde.');
         console.log(err);
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
            <FormStepThree onSubmit={handleFormSubmit} />
        </LS.Header>
    )
}