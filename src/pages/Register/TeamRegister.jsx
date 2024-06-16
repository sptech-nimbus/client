/* eslint-disable no-unused-vars */
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
  const { token, personaId, id } = useAuth();
  const navigate = useNavigate();

  const [isRegisterFinished, setIsRegisterFinished] = useState(false);
  const [teamData, setTeamData] = useState({});

  useEffect(() => {
    if (isRegisterFinished) {
      toast.success('Cadastro realizado!', { autoClose: 5000 });
      setTeamData({});
      setTimeout(() => {
        navigate('/my-teams');
      }, 2600);
    }
  }, [isRegisterFinished]);

  const handleFormSubmit = async (formData) => {
    teamData.name = formData.name;
    teamData.category = formData.category;
    teamData.local = formData.local;
    teamData.coach = { id: localStorage.getItem('personaId') }
    const { picture } = formData;
    delete teamData.picture;

    try {
      const { data } = await team.post(teamData, token);
      if (picture) {
        console.log(picture);
        try {
          await blobStorage.post(picture, localStorage.getItem('token'), data.data.id);

          setIsRegisterFinished(true);
        }
        catch (err) {
          console.log(err);
          // addNotification("error", "Seu time foi cadastrado, porém houve um erro ao cadastrarmos a imagem dele. Por favor tente novamente em outro momento.")
        }
        finally {
          setIsRegisterFinished(true);
        }
      }
    }
    catch (err) {
      console.log(err);
      //  addNotification("error", "Houve um erro ao cadastrar o time. Por favor, aguarde um momento antes de tentar novamente");
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