import * as S from "./Login.styles";
import Background from "@components/Background/Background";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import { Envelope } from "@phosphor-icons/react";
import Button from "@components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const navigate = useNavigate();

   return (
      <S.Header>
         <Background.Login />
         <S.Title>
            Login
         </S.Title>
         <S.Form>
            <Input.Google />
            <S.LineContainer>
               <S.Line />
               Ou
               <S.Line />
            </S.LineContainer>
            <S.InputsContainer>
               <Label >
                  Insira seu email
                       <Input.Default
                           placeholder={'seu@email.com'}
                           value={ 'michaelhenrique0022@gmail.com' }>                    
                     <Envelope />
                  </Input.Default>
               </Label>
               <Label >
                  Insira sua senha
                       <Input.Password
                           placeholder={'**********'}
                           value={'Wn+V8>v;s2vmpQ4'}
                           hasIcon />
               </Label>
            </S.InputsContainer>
            <Button.Primary 
               value={'Entrar'}
               size={'md'}
               width={'100%'}
               fontSize={'1.5rem'}
               onClick={() => navigate('/home')}
            />
            <S.FormFooter>
               <underlined>
                  <S.Link href="">
                     Esqueceu sua senha?
                  </S.Link>
               </underlined>
               <span>
                  Não possui uma conta ainda? <br />
                  <S.Link>
                     <S.Highlight>Faça seu cadastro!</S.Highlight>
                  </S.Link>
                  </span>
            </S.FormFooter>
         </S.Form>
      </S.Header>
   )
}