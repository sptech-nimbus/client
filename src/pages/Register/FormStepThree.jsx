import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { TooltipInput as Tooltip } from '../../components/Tooltip/Tooltip';
import { TextValidation, PastDateValidation } from '../../utils/Validations';
import { useMediaQuery } from 'react-responsive'

export default function FormStepThree() {
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [date, setDate] = useState('');
   const [nameErr, setNameErr] = useState(false);
   const [surnameErr, setSurnameErr] = useState(false);
   const [dateErr, setDateErr] = useState(false);
   const [nameTtpOpen, setNameTtpOpen] = useState(false);
   const [surnameTtpOpen, setSurnameTtpOpen] = useState(false);
   const [dateTtpOpen, setDateTtpOpen] = useState(false);

   function handleNameChange(e) {
      const { value } = e.target;
      setName(value);
   }

   function handleSurnameChange(e) {
      const { value } = e.target;
      setSurname(value);
   }

   function handleDateChange(e) {
      const { value } = e.target;
      setDate(value);
   }

   function handleNameTtpChange() {
      setNameTtpOpen(!nameTtpOpen);
   }

   function handleSurnameTtpChange() {
      setSurnameTtpOpen(!surnameTtpOpen);
   }

   function handleDateTtpChange() {
      setDateTtpOpen(!dateTtpOpen);
   }

   const isBelow799 = useMediaQuery({ maxWidth: 799 });

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
      <LS.InputsContainer>
         <Label>
            Código do time existente   
            <S.InputLine>
               <Input.Default
                  placeholder={'John'}
                  value={name}
                  onChange={handleNameChange}
                  onFocus={handleNameTtpChange}
                  onBlur={handleNameTtpChange}
               />
               <Tooltip side='right' open={nameTtpOpen} onHover={handleNameTtpChange}>
                  <span>
                     O código do time é disponibilizado pelo treinador atual do time que deseja se cadastrar. Caso haja
                     uma passagem de responsabilidade, contate o treinador do time em questão e peça para ele gerar o código.
                  </span>
               </Tooltip>
            </S.InputLine>
         </Label>

         <Label>
            Nome do time
            <S.InputLine>
               <Input.Default
                  placeholder={'Doe'}
                  value={surname}
                  onChange={handleSurnameChange}
                  onFocus={handleSurnameTtpChange}
                  onBlur={handleSurnameTtpChange}
               />
               <Tooltip side='right' open={surnameTtpOpen} onHover={handleSurnameTtpChange}>
                  <span>O sobrenome deve possuir pelo menos 2 caracteres e não deve possuir números ou caracteres especiais.</span>
               </Tooltip>
            </S.InputLine>
         </Label>

         <Label>
            Categoria
            <S.InputLine>
               <Input.Default
                  value={date}
                  onChange={handleDateChange}
               />
            </S.InputLine>
         </Label>
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