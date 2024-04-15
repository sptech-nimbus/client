import * as S from "./Login.styles";
import Background from "@components/Background/Background";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import { Envelope } from "@phosphor-icons/react";
import Button from "@components/Button/Button";

export default function Login() {
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
                  <Input.Default placeholder={'seu@email.com'}>
                     <Envelope />
                  </Input.Default>
               </Label>
               <Label >
                  Insira sua senha
                  <Input.Password placeholder={'**********'} hasIcon/>
               </Label>
            </S.InputsContainer>
            <Button.Primary 
               value={'Entrar'}
               size={'md'}
               width={'100%'}
               fontSize={'1.5rem'}
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