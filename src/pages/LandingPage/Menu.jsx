import { useNavigate } from "react-router-dom";
import * as S from "./LandingPage.styled";

export default function Menu({navOpen, handleNavOpen}) {
   const navigate = useNavigate();

   return (
      <S.MenuContainer state={navOpen}>
         <S.MenuContent>
            <S.MenuLinks>
               <S.MenuLink delay='.2s' onClick={handleNavOpen}>Home</S.MenuLink>
               <S.MenuLink delay='.3s' onClick={() => navigate('/login')}>Login</S.MenuLink>
               <S.MenuLink delay='.5s' onClick={() => navigate('/cadastro')}>Cadastro</S.MenuLink>
               <S.MenuLink delay='.6s' onClick={() => navigate('/sobre-nos')}>Sobre nós</S.MenuLink>
               <S.MenuFooter>
                  <S.MenuFooterText>nimbus © 2024. All Rights reserved</S.MenuFooterText>
                  <S.MenuFooterText>Privacidade & Termos</S.MenuFooterText>
               </S.MenuFooter>
            </S.MenuLinks>
         </S.MenuContent>

         <S.MenuAnimation>
            <S.Animation1st />
            <S.Animation2nd />
            <S.Animation3rd />
         </S.MenuAnimation>
      </S.MenuContainer>
   )
}