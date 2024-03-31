import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Background from '../../components/Background/Background';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { TooltipInput as Tooltip } from '../../components/Tooltip/Tooltip';
import { TextValidation, PastDateValidation } from '../../utils/Validations';

export default function Register() {
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

   function handleSubmit(e) {
      e.preventDefault();

      if(!TextValidation(name) || !TextValidation(surname) || !PastDateValidation(date)) {
         console.log('false');
      }
      else {
         console.log('true');
      }
   }

   return(
      <LS.Header>
         <Background.Login />
         {/* <S.Text>
            Insira algumas informações sobre você para que possamos criar a sua conta!
         </S.Text> */}
         <LS.Title>
            Cadastro
         </LS.Title>
         <S.Form>
            <LS.InputsContainer>
               <Label>
                  Nome
                  <S.InputLine>
                     <Input.Default
                        placeholder={'John'}
                        value={name}
                        onChange={handleNameChange}
                        onFocus={handleNameTtpChange}
                        onBlur={handleNameTtpChange}
                     />
                     <Tooltip side='right' open={nameTtpOpen} onHover={handleNameTtpChange}>
                        <span>O nome deve possuir pelo menos 2 caracteres e não deve possuir números ou caracteres especiais.</span>
                     </Tooltip>
                  </S.InputLine>
               </Label>

               <Label>
                  Sobrenome
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
                  Data de nascimento
                  <S.InputLine>
                     <Input.Default
                        type={'date'}
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
            <LS.FormFooter>
               <span>
                  Já possui uma conta? <br />
                  <LS.Link>
                     <highlight>Faça login</highlight>
                  </LS.Link>
               </span>
            </LS.FormFooter>
         </S.Form>
      </LS.Header>
   )
}