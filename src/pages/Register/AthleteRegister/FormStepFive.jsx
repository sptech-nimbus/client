/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNotification } from '@contexts/notification';

import * as S from '../Register.styled';
import * as LS from '../../Login/Login.styles';

import Label from '@components/Label/Label';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';

import { TooltipInput as Tooltip } from '@components/Tooltip/Tooltip';
import { TeamCodeValidation } from '@utils/Validations';

import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FormStepFive({ onSubmit }) {
   const { addNotification } = useNotification();
   const [teamCode, setTeamCode] = useState('');
   const [teamCodeTtpOpen, setTeamCodeTtpOpen] = useState(false);

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

   function handleTeamCodeChange(e) {
      const { value } = e.target;
      setTeamCode(value);
   }

   function handleTeamCodeTtpChange() {
      setTeamCodeTtpOpen(!teamCodeTtpOpen);
   }

   function handleSubmit(e) {
      e.preventDefault();
      onSubmit();
   }

   return (
      <S.Form onSubmit={handleSubmit}>
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
               <span>
                  Seu cadastro foi realizado! Para continuar, entre em contato com o treinador do seu time e peça para ele te enviar o link de associação ao time.
               </span>
            </Label>
         </LS.InputsContainer>
      </S.Form>
   )
}

FormStepFour.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};