import * as S from './Register.styled';
import * as LS from '../Login/Login.styles';
import Background from '../../components/Background/Background';
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function Register() {
   return(
      <LS.Header>
         <Background.Login />
         <LS.Title>
            Cadastro
         </LS.Title>
         <LS.Form>
            <LS.InputsContainer>
               <Label>
                  Nome
                  <Input.Default placeholder={'John'}/>
               </Label>

               <Label>
                  Sobrenome
                  <Input.Default placeholder={'Doe'}/>
               </Label>

               <Label>
                  Data de nascimento
                  <Input.Default type={'date'}/>
               </Label>
            </LS.InputsContainer>
            <Button.Primary 
               value={'Continuar'}
               size={'md'}
               width={'100%'}
               fontSize={'1.5rem'}
            />
         </LS.Form>
      </LS.Header>
   )
}