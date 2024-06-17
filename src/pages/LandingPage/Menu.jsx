import { useNavigate } from "react-router-dom";
import * as S from "./LandingPage.styled";
import logoBackground from '@assets/icons/logo-background.svg';

import { motion } from "framer-motion";

export default function Menu({ $navOpen, handleNavOpen }) {
   const navigate = useNavigate();

   return (
      <S.MenuContainer $state={$navOpen}>
         <S.MenuContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
               <S.LogoBackground src={logoBackground} />
            </motion.div>
            <S.MenuLinks>
               <motion.div initial={{ opacity: 0, x: '-50%' }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2 }}>
                  <S.MenuLink onClick={handleNavOpen}>Home</S.MenuLink>
               </motion.div>

               <motion.div initial={{ opacity: 0, x: '-50%' }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3 }}>
                  <S.MenuLink onClick={() => navigate('/login')}>Login</S.MenuLink>
               </motion.div>

               <motion.div initial={{ opacity: 0, x: '-50%' }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .4 }}>
                  <S.MenuLink onClick={() => navigate('/register')}>Cadastro</S.MenuLink>
               </motion.div>

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