import * as S from './LandingPage.styled.js';
import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Colors } from "@utils/Helpers";

import Background from '@components/Background/Background';
import Title from "@components/Title/Title";
import { InputDefault as Input, InputTextarea as Textarea } from "@components/Input/Input";
import { PrimaryButton as Button} from "@components/Button/Button";
import Label from "@components/Label/Label";
import ScrollProgress from "@components/ScrollProgress/ScrollProgress";

import { motion } from "framer-motion";

import Menu from './Menu.jsx';
import BallOutline from './BallOutline.jsx';

import mockupImage from '@assets/images/mockup.png';
import transitionTextSvg from '@assets/elements/transition-text.svg';
import scrollDownSvg from '@assets/elements/scroll-down.svg';
import nimbusLogo from '@assets/icons/nimbus-logo.svg';
import nimbusAltLogo from '@assets/icons/nimbus-alternative-logo.svg';
import instagramLogo from '@assets/icons/instagram-logo.svg';
import githubLogo from '@assets/icons/github-logo.svg';
import basketballImage from '@assets/images/basketball-image.png';
import vectorWave from '@assets/elements/vector-wave.svg';

export default function LandingPage() {
   const [navOpen, setNavOpen] = useState(false);
   const [userEmail, setUserEmail] = useState('');
   const [userMsg, setUserMsg] = useState('');

   const handleNavOpen = () => {
      setNavOpen(!navOpen);
   }

   const handleUserEmail = (e) => {
      const { value } = e.target;
      setUserEmail(value);
   }

   const handleUserMsg = (e) => {
      const { value } = e.target;
      setUserMsg(value);
   }

   const renderSlider = () => {
      const items = [];

      for (let i = 0; i < 12; i++) {
         items.push(
            <S.FeaturesSliderItem key={`feature${i}`}>
               Funcionalidades
            </S.FeaturesSliderItem>
         );

         items.push(
            <S.FeaturesSliderItem key={`dot${i}`}>
               •
            </S.FeaturesSliderItem>
         );
      }

      return items;
   }

   return ( 
      <S.PageWrapper $navOpen={navOpen}>
         <ScrollProgress color={Colors.orange300}/>
         <S.Header id="header">
            <Background.Default />
            {navOpen &&
            <Menu $navOpen={navOpen} handleNavOpen={handleNavOpen}/>
            }
            <S.Navbar>
               {navOpen ?
               <S.NavLogo src={nimbusAltLogo} alt={`nimbus - logo do projeto.`}/> :
               <S.NavLogo src={nimbusLogo} alt={`nimbus - logo do projeto.`}/>
               }

               <S.MenuTrigger onClick={handleNavOpen} $state={navOpen}>
                  <S.MenuLineUpper $state={navOpen} />
                  <S.MenuLineMid $state={navOpen} width='70%'/>
                  <S.MenuLineLower $state={navOpen} />
               </S.MenuTrigger>
            </S.Navbar>
            <S.HeaderContent>
               <S.Wrapper>
                  <motion.span>
                  <S.TitleContainer>
                     <Title text={'Basquete para todos!'} $uppercase size='6.2rem' color={Colors.orange100}/>
                  </S.TitleContainer>
                  </motion.span>

                  <motion.span>
                  <S.TitleContainer>
                     <Title text={'E perto de você!'} $uppercase size='6.2rem' color={Colors.orange100}/>
                  </S.TitleContainer>
                  </motion.span>
                  
                  <S.Line initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ 
                     type: "spring", 
                     duration: 1.5,
                     }}/>

                  <S.SocialMediaContainer>
                     <S.SocialMedia src={githubLogo}/>
                     <S.SocialMedia src={instagramLogo}/>
                  </S.SocialMediaContainer>
               </S.Wrapper>
               <S.ScrollDown src={scrollDownSvg}/>
            </S.HeaderContent>
         </S.Header>

         <S.Main id="main">
            <S.About id="about">
               <Background.Default />
               <S.AboutTextContainer>
                  <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <Title text='Para o jogador' $uppercase size='2.5rem'/>
                  </motion.span>

                  <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <S.AboutText>
                        Acompanhe seu desempenho de perto com estatísticas detalhadas e análises feitas pelo seu treinador.
                     </S.AboutText>
                  </motion.span>

               </S.AboutTextContainer>
               <BallOutline />
               <S.AboutTextContainer $textAlign='right'>
                  <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <S.AboutText $textAlign='right'>
                        Gerencie várias de suas equipes e jogadores de forma intuitiva e eficiente dentro de uma única plataforma.
                     </S.AboutText>
                  </motion.span>
                  <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <Title text='Para o treinador' $uppercase size='2.5rem'/>
                  </motion.span>
               </S.AboutTextContainer>
               <S.TransitionText
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }} 
               src={transitionTextSvg}/>
               <S.WaveSvg src={vectorWave}/>
            </S.About>
            
            <S.Comunication id="comunication">
               <S.ComunicationWrapper>
                  <S.ComunicationTextContainer>
                     <S.ComunicationText initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }}>
                        A comunicação é a espinha dorsal, uma <S.Bold>interação instantânea e eficaz</S.Bold> entre treinadores e jogadores impulsiona o progresso e a coesão da equipe.
                     </S.ComunicationText>
                  </S.ComunicationTextContainer>
                  
                  <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <Title text='Comunicação direta' color={Colors.orange100} size='7rem' $uppercase/>
                  </motion.span>

                  <S.ComunicationTextContainerRight>
                     <S.ComunicationTextRight initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }}>Troca de passes, troca de ideias: sucesso garantido.</S.ComunicationTextRight>
                  </S.ComunicationTextContainerRight>
                  <S.Mockup initial={{ opacity: 0, y: '30%' }} whileInView={{ opacity: 1, y: 0 }} src={mockupImage}/>
               </S.ComunicationWrapper>
            </S.Comunication>

            <S.Features id="features">
               <S.InvertedWaveSvg src={vectorWave}/>
               <S.FeaturesWrapper>
               <S.FeaturesTitle>
                  <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <Title text='Acompanhe o seu' $uppercase color={Colors.gray900} size='4.5rem'/>
                  </motion.span>
                  <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <S.SecondTitle>
                        <Title text='Desempenh' $uppercase color={Colors.gray900} size='11.7rem'/>
                        <motion.span initial={{ rotate: 90 }} whileInView={{ rotate: 0 }} transition={{ delay: .2 }}>
                           <S.BasketballTitle src={basketballImage}/>
                        </motion.span>
                     </S.SecondTitle>
                  </motion.span>
               </S.FeaturesTitle>

               <S.FeaturesSlider>
                  <S.FeaturesSliderWrapper>
                     {renderSlider()}
                  </S.FeaturesSliderWrapper>
               </S.FeaturesSlider>

               <S.FeaturesCardContainer>
                  <S.FeaturesCard>
                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                        <Title text='Gráficos' $uppercase/>
                     </motion.span>
                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <S.FeaturesCardText>
                        Analise seu jogo como um profissional e visualize <S.Highlight>estatísticas detalhadas</S.Highlight> e <S.Highlight>gráficos interativos</S.Highlight> sobre seus treinos e partidas!
                     </S.FeaturesCardText>
                     </motion.span>
                  </S.FeaturesCard>

                  <S.FeaturesCard>
                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                        <Title text='Eventos' $uppercase/>
                     </motion.span>
                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                        <S.FeaturesCardText>
                           <S.Highlight>Gerencie sua agenda criando</S.Highlight>, editando e excluindo treinos e partidas com um calendário intuitivo e fácil de usar. Seus jogadores receberão notificações de tudo!
                        </S.FeaturesCardText>
                     </motion.span>
                  </S.FeaturesCard>

                  <S.FeaturesCard>
                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                        <Title text='Anotações' $uppercase/>
                     </motion.span>
                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                        <S.FeaturesCardText>
                           O treinador pode <S.Highlight>registrar anotações</S.Highlight> sobre o desempenho individual e coletivo da equipe, <S.Highlight>durante treinos e partidas</S.Highlight> e compartilhar essas anotações com o time.
                        </S.FeaturesCardText>
                     </motion.span>
                  </S.FeaturesCard>
               </S.FeaturesCardContainer>
               </S.FeaturesWrapper>
            </S.Features>

            <S.Contact id="contact">
               <Background.Default />
               <S.ContactWrapper>
                  <S.ContactContent>
                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                        <Title
                        text='Dúvidas, sugestões ou reclamações?'
                        color={Colors.orange100}
                        $uppercase
                        size='4rem'/>
                     </motion.span>

                     <motion.span initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2}}>
                     <S.ContactText>
                        Estamos prontos para ouvir você. Valorizamos suas opiniões e feedback para melhorar nossos serviços. Não enviamos spam, apenas queremos oferecer a melhor experiência possível. Se surgir alguma dúvida ou precisar de suporte, estamos aqui para ajudar. Por favor, compartilhe suas ideias ou preocupações conosco ao lado. Aguardamos sua mensagem!
                     </S.ContactText>
                     </motion.span>
                  </S.ContactContent>
                  <S.ContactForm initial={{ opacity: 0, y: '50%' }} whileInView={{ opacity: 1, y: 0 }}>
                     <Label>
                        <span>E-mail</span>
                        <Input
                           placeholder='seu@email.com'
                           value={userEmail}
                           onChange={handleUserEmail}
                        />
                     </Label>
                     <Label>
                        <span>Sua mensagem</span>
                        <Textarea
                           placeholder='Sua mensagem aqui'
                           value={userMsg}
                           onChange={handleUserMsg}
                           rows='10'
                        />
                     </Label>
                     <Button
                     value='Enviar e-mail'
                     size='md'
                     fontSize='1.5rem'
                     />
                  </S.ContactForm>
               </S.ContactWrapper>
            </S.Contact>
         </S.Main>

         <S.Footer id="footer">
            <S.FooterFlex>
               <S.FooterSocialMedia src={githubLogo}/>
               <S.FooterSocialMedia src={instagramLogo}/>
            </S.FooterFlex>
            <S.Flex>
               <S.FooterLink>Voltar para o início.</S.FooterLink>
               <S.FooterLink>nimbus © 2024. All Rights reserved</S.FooterLink>
               <S.FooterLink>Privacidade & Termos</S.FooterLink>
            </S.Flex>
         </S.Footer>
      </S.PageWrapper>
   )
}