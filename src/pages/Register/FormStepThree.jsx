import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import { TooltipInput as Tooltip } from '../../components/Tooltip/Tooltip';
import { TextValidation, PastDateValidation } from '../../utils/Validations';
import { useMediaQuery } from 'react-responsive';

export default function FormStepThree() {
   const [teamName, setTeamName] = useState('');
   const [teamCode, setTeamCode] = useState('');
   const [category, setCategory] = useState('');
   const [teamLogo, setTeamLogo] = useState('');

   const [teamNameErr, setTeamNameErr] = useState(false);
   const [teamCodeErr, setTeamCodeErr] = useState(false);
   const [categoryErr, setCategoryErr] = useState(false);

   const [teamNameTtpOpen, setTeamNameTtpOpen] = useState(false);
   const [teamCodeTtpOpen, setTeamCodeTtpOpen] = useState(false);
   const [teamLogoTtpOpen, setTeamLogoTtpOpen] = useState(false);

   const [toastPosition, setToastPosition] = useState('top-right');

   const isBelow799 = useMediaQuery({ maxWidth: 799 });
   const isBelow1050 = useMediaQuery({maxWidth: 1050});

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
      const { value } = e.target;
      setTeamLogo(value);
   }

   function handleTeamNameTtpChange() {
      setTeamNameTtpOpen(!teamNameTtpOpen);
   }

   function handleTeamCodeTtpChange() {
      setTeamCodeTtpOpen(!teamCodeTtpOpen);
   }

   function handleCategoryTtpChange() {
      setCategoryTtpOpen(!categoryTtpOpen);
   }

   function handleTeamLogoTtpChange() {
      setTeamLogoTtpOpen(!teamLogoTtpOpen);
   }

   function handleSubmit(e) {
      e.preventDefault();

      if(!TextValidation(name) || !TextValidation(surname) || !PastDateValidation(date)) {
         console.log('false');
      }
      else {
         console.log('true');
      }
   }


   return (
      <S.Form>
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
               />
               <Tooltip side='right' open={teamCodeTtpOpen} onHover={handleTeamCodeTtpChange}>
                  <span>
                     O código do time é disponibilizado pelo treinador atual do time que deseja se cadastrar. Caso haja
                     uma passagem de responsabilidade, contate o treinador do time em questão e peça para ele gerar o código.
                  </span>
               </Tooltip>
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
               />
               <Tooltip side='right' open={teamNameTtpOpen} onHover={handleTeamNameTtpChange}>
                  <span>O nome do time deve possuir pelo menos 2 caracteres e não deve possuir números ou caracteres especiais.</span>
               </Tooltip>
            </S.InputLine>
         </Label>

         <Label>
            Categoria
            <S.InputLine>
               <Input.Default
                  placeholder={'Sub-20'}
                  value={category}
                  onChange={handleCategoryChange}
               />
            </S.InputLine>
         </Label>

         <Label>
            Escudo do time
            <S.InputLine>
               <Input.Default
                  type={'file'}
                  value={teamLogo}
                  onChange={handleTeamLogoChange}
               />
            </S.InputLine>
         </Label>
         <Checkbox id={'isAmateur'} label={'Sou um time amador.'}/>
      </LS.InputsContainer>
      <Button.Primary 
         value={'Continuar'}
         size={'md'}
         width={'100%'}
         fontSize={'1.5rem'}
         onClick={handleSubmit}
      />
   </S.Form>
   )
}