import { useState } from 'react';
import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Background from '../../components/Background/Background';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { TextValidation, PastDateValidation } from '../../utils/Validations';

export default function Register() {
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [date, setDate] = useState('');
   const [nameErr, setNameErr] = useState(false);
   const [surnameErr, setSurnameErr] = useState(false);
   const [dateErr, setDateErr] = useState(false);

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
                  <Input.Default 
                     placeholder={'John'} 
                     value={name} 
                     onChange={handleNameChange}
                  />
               </Label>

               <Label>
                  Sobrenome
                  <Input.Default 
                     placeholder={'Doe'} 
                     value={surname}
                     onChange={handleSurnameChange}
                  />
               </Label>

               <Label>
                  Data de nascimento
                  <Input.Default 
                     type={'date'} 
                     value={date}
                     onChange={handleDateChange}
                  />
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