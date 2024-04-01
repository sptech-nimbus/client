import { useState, useEffect } from 'react';
import * as S from './Register.styled';
import * as LS from '../../Login/Login.styles';
import Label from '../../../components/Label/Label';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Checkbox from '../../../components/Checkbox/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import { TooltipInput as Tooltip } from '../../../components/Tooltip/Tooltip';
import { TextValidation, TeamCodeValidation, FileExtensionValidation } from '../../../utils/Validations';
import { useMediaQuery } from 'react-responsive';

export default function FormStepThree({onSubmit}) {
   const [teamName, setTeamName] = useState('');
   const [teamCode, setTeamCode] = useState('');
   const [category, setCategory] = useState('');
   const [teamLogo, setTeamLogo] = useState('');
   const [chkAmateur, setChkAmateur] = useState(false);

   const [teamNameErr, setTeamNameErr] = useState(false);
   const [teamCodeErr, setTeamCodeErr] = useState(false);
   const [categoryErr, setCategoryErr] = useState(false);

   const [teamNameTtpOpen, setTeamNameTtpOpen] = useState(false);
   const [teamCodeTtpOpen, setTeamCodeTtpOpen] = useState(false);
   const [teamLogoTtpOpen, setTeamLogoTtpOpen] = useState(false);

   const [toastPosition, setToastPosition] = useState('top-right');

   const isBelow799 = useMediaQuery({ maxWidth: 799 });
   const isBelow1050 = useMediaQuery({maxWidth: 1050});

   const allowedExtensions = ['jpg', 'png', 'jpeg'];

   useEffect(() => {
      if (isBelow1050) {
        setToastPosition('top-center');
      } else {
        setToastPosition('top-right');
      }
    }, [isBelow1050]);

   function handleTeamNameChange(e) {
      const { value } = e.target;
      setTeamName(value);
   }

   function handleTeamCodeChange(e) {
      const { value } = e.target;
      setTeamCode(value);
   }

   function handleCategoryChange(e) {
      const { value } = e.target;
      setCategory(value);
   }

   function handleTeamLogoChange(e) {
      setTeamLogo(e.target.files[0]);
   }

   function handleChkAmateur() {
      setChkAmateur(!chkAmateur);
   }

   function handleTeamNameTtpChange() {
      setTeamNameTtpOpen(!teamNameTtpOpen);
   }

   function handleTeamCodeTtpChange() {
      setTeamCodeTtpOpen(!teamCodeTtpOpen);
   }

   function handleTeamLogoTtpChange() {
      setTeamLogoTtpOpen(!teamLogoTtpOpen);
   }

   function handleSubmit(e) {
      e.preventDefault();

      if(TeamCodeValidation(teamCode)) {
         onSubmit(teamCode);
      }
      else if(
         TextValidation(teamName) && 
         TextValidation(category) && 
         FileExtensionValidation(teamLogo.name, allowedExtensions)) 
      {
         onSubmit({teamName, category, teamLogo, chkAmateur});
      }
      else {
         if(teamCode) {
            if(!TeamCodeValidation(teamCode)) toast.error('Código inserido é inválido');
         } else {
            if(!TextValidation(teamName)) toast.error('Nome do time é inválido');
            // if(TextValidation(category)) toast.error('Categoria inserida é inválida');
            if(!FileExtensionValidation(teamLogo.name), allowedExtensions) toast.error('A extensão de arquivo inserida é inválida');
         }
      }
   }

   return (
      <S.FormStepThree onSubmit={handleSubmit}>
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
            Código do time existente   
            <S.InputLine>
               <Input.Default
                  placeholder={'1A2B3C'}
                  value={teamCode}
                  onChange={handleTeamCodeChange}
                  onFocus={handleTeamCodeTtpChange}
                  onBlur={handleTeamCodeTtpChange}
                  disabled={teamName || category || teamLogo ? true : false}
                  maxLength={6}
               />
               {
                  !isBelow799 &&
                  <Tooltip side='right' open={teamCodeTtpOpen} onHover={handleTeamCodeTtpChange}>
                     <span>
                        O código do time é disponibilizado pelo treinador atual do time que deseja se cadastrar. Caso haja
                        uma passagem de responsabilidade, contate o treinador do time em questão e peça para ele gerar o código.
                     </span>
                  </Tooltip>
               }
            </S.InputLine>
         </Label>
         <LS.LineContainer>
               <LS.Line />
               Ou
               <LS.Line />
            </LS.LineContainer>
         <Label>
            Nome do time
            <S.InputLine>
               <Input.Default
                  placeholder={'Nome do Time SC'}
                  value={teamName}
                  onChange={handleTeamNameChange}
                  onFocus={handleTeamNameTtpChange}
                  onBlur={handleTeamNameTtpChange}
                  disabled={teamCode ? true : false}
               />
               {
                  !isBelow799 &&
                  <Tooltip side='right' open={teamNameTtpOpen} onHover={handleTeamNameTtpChange}>
                     <span>O nome do time deve possuir pelo menos 2 caracteres e não deve possuir números ou caracteres especiais.</span>
                  </Tooltip>
               }
            </S.InputLine>
         </Label>

         <Label>
            Categoria
            <S.InputLine>
               <Input.Default
                  placeholder={'Sub-20'}
                  value={category}
                  onChange={handleCategoryChange}
                  disabled={teamCode ? true : false}
               />
            </S.InputLine>
         </Label>

         <Label>
            Escudo do time
            <S.InputLine>
               <Input.Image
                  type={'file'}
                  onChange={handleTeamLogoChange}
                  onFocus={handleTeamLogoTtpChange}
                  onBlur={handleTeamLogoTtpChange}
                  disabled={teamCode ? true : false}
               />
               {
                  !isBelow799 &&
                  <Tooltip side='right' open={teamLogoTtpOpen} onHover={handleTeamLogoTtpChange}>
                     <span>As extensões de arquivo aceitas são .jpg, .jpeg e .png.</span>
                  </Tooltip>
               }
            </S.InputLine>
         </Label>
         <Checkbox 
         id={'isAmateur'} 
         label={'Sou um time amador.'} 
         checked={chkAmateur}
         onClick={handleChkAmateur}
         />
      </LS.InputsContainer>
      <Button.Primary 
         value={'Continuar'}
         size={'md'}
         width={'100%'}
         fontSize={'1.5rem'}
         onClick={handleSubmit}
      />
   </S.FormStepThree>
   )
}