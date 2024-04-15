import React, { useState, useEffect } from 'react';
import * as S from './LandingPage.styled.js';
import { useMediaQuery } from 'react-responsive';
import Colors from "@utils/Colors";

import Background from '@components/Background/Background';
import Title from "@components/Title/Title";
import { InputDefault as Input, InputTextarea as Textarea } from "@components/Input/Input";
import { PrimaryButton as Button} from "@components/Button/Button";
import Label from "@components/Label/Label";

export default function LandingPage() {
   const [navOpen, setNavOpen] = useState(false);
   const [userEmail, setUserEmail] = useState('');

   function handleNavOpen() {
      setNavOpen(!navOpen);
   }

   function handleUserEmail(e) {
      const { value } = e.target;
      setUserEmail(value);
   }

   function renderSlider() {
      const items = [];

      for (let i = 0; i < 15; i++) {
         items.push(
            <S.FeaturesSliderItem key={i}>
               Funcionalidades
            </S.FeaturesSliderItem>
         );

         items.push(
            <S.FeaturesSliderItem key={i}>
               •
            </S.FeaturesSliderItem>
         );
      }

      return items;
   }

   return ( 
      <>
         <S.Header>
            <Background.Default />
            {navOpen &&
               <S.MenuContainer state={navOpen}>
                  <S.MenuAnimation>
                     <S.Animation1st />
                     <S.Animation2nd />
                     <S.Animation3rd />
                  </S.MenuAnimation>

                  <S.MenuContent>
                     asd
                  </S.MenuContent>
               </S.MenuContainer>
            }
            <S.Navbar>
               {navOpen ?
               <S.NavLogo src='/public/assets/nimbus-alternative-logo.svg' alt={`nimbus - logo do projeto.`}/> :
               <S.NavLogo src='/public/assets/nimbus-logo.svg' alt={`nimbus - logo do projeto.`}/>
               }

               <S.Menu onClick={handleNavOpen} state={navOpen}>
                  <S.MenuLineUpper state={navOpen} />
                  <S.MenuLineMid state={navOpen} width='70%'/>
                  <S.MenuLineLower state={navOpen} />
               </S.Menu>
            </S.Navbar>
            <S.HeaderContent>
               <S.Wrapper>
                  <S.TitleContainer>
                        <Title text={'Basquete para todos!'} uppercase size='6.2rem' color={Colors.orange100}/>
                        <Title text={'E perto de você!'} uppercase size='6.2rem' color={Colors.orange100}/>
                  </S.TitleContainer>
                  <S.Line />
                  <S.SocialMediaContainer>
                     <S.SocialMedia src='/public/assets/github-logo.svg'/>
                     <S.SocialMedia src='/public/assets/instagram-logo.svg'/>
                  </S.SocialMediaContainer>
               </S.Wrapper>
               <S.ScrollDown src='/public/assets/scroll-down.svg'/>
            </S.HeaderContent>
         </S.Header>

         <S.Main>
            <S.About>
               <Background.Default />
               <S.AboutTextContainer>
                  <Title text='Para o jogador' uppercase size='2.5rem'/>
                  <S.AboutText>
                     Acompanhe seu desempenho de perto com estatísticas detalhadas e análises feitas pelo seu treinador.
                  </S.AboutText>
               </S.AboutTextContainer>
               <S.Outline src='/public/assets/basketball-outline.svg'/>
               <S.AboutTextContainer textAlign='right'>
                  <S.AboutText textAlign='right'>
                     Gerencie várias de suas equipes e jogadores de forma intuitiva e eficiente dentro de uma única plataforma.
                  </S.AboutText>
                  <Title text='Para o treinador' uppercase size='2.5rem'/>
               </S.AboutTextContainer>
               <S.TransitionText src='/public/assets/transition-text.svg'/>
               <S.WaveSvg src='/public/assets/vector-wave.svg'/>
            </S.About>
            
            <S.Comunication>
               <S.ComunicationWrapper>
                  <S.ComunicationTextContainer>
                     <S.ComunicationText>
                        A comunicação é a espinha dorsal, uma <S.Bold>interação instantânea e eficaz</S.Bold> entre treinadores e jogadores impulsiona o progresso e a coesão da equipe.
                        </S.ComunicationText>
                  </S.ComunicationTextContainer>
                  <Title text='Comunicação direta' color={Colors.orange100} size='7rem' uppercase/>
                  <S.ComunicationTextContainerRight>
                     <S.ComunicationTextRight>Troca de passes, troca de ideias: sucesso garantido.</S.ComunicationTextRight>
                  </S.ComunicationTextContainerRight>
                  <S.Mockup src='/public/assets/mockup.png'/>
               </S.ComunicationWrapper>
            </S.Comunication>

            <S.Features>
               <S.InvertedWaveSvg src='/public/assets/vector-wave.svg'/>
               <S.FeaturesWrapper>
               <S.FeaturesTitle>
                  <Title text='Acompanhe o seu' uppercase color={Colors.gray900} size='4.5rem'/>
                  <S.SecondTitle>
                     <Title text='Desempenh' uppercase color={Colors.gray900} size='11.7rem'/>
                     <S.BasketballTitle src='/public/assets/basketball-image.png'/>
                  </S.SecondTitle>
               </S.FeaturesTitle>

               <S.FeaturesSlider>
                  <S.FeaturesSliderWrapper>
                     {renderSlider()}
                  </S.FeaturesSliderWrapper>
               </S.FeaturesSlider>

               <S.FeaturesCardContainer>
                  <S.FeaturesCard>
                     <Title text='Gráficos' uppercase/>
                     <S.FeaturesCardText>
                        Analise seu jogo como um profissional e visualize <S.Highlight>estatísticas detalhadas</S.Highlight> e <S.Highlight>gráficos interativos</S.Highlight> sobre seus treinos e partidas!
                     </S.FeaturesCardText>
                  </S.FeaturesCard>

                  <S.FeaturesCard>
                     <Title text='Eventos' uppercase/>
                     <S.FeaturesCardText>
                        <S.Highlight>Gerencie sua agenda criando</S.Highlight>, editando e excluindo treinos e partidas com um calendário intuitivo e fácil de usar. Seus jogadores receberão notificações de tudo!
                     </S.FeaturesCardText>
                  </S.FeaturesCard>

                  <S.FeaturesCard>
                     <Title text='Anotações' uppercase/>
                     <S.FeaturesCardText>
                        O treinador pode <S.Highlight>registrar anotações</S.Highlight> sobre o desempenho individual e coletivo da equipe, <S.Highlight>durante treinos e partidas</S.Highlight> e compartilhar essas anotações com o time.
                     </S.FeaturesCardText>
                  </S.FeaturesCard>
               </S.FeaturesCardContainer>
               </S.FeaturesWrapper>
            </S.Features>

            <S.Contact>
               <Background.Default />
               <S.ContactWrapper>
                  <S.ContactContent>
                     <Title
                     text='Dúvidas, sugestões ou reclamações?'
                     color={Colors.orange100}
                     uppercase
                     size='4rem'/>
                     <S.ContactText>
                        Estamos prontos para ouvir você. Valorizamos suas opiniões e feedback para melhorar nossos serviços. Não enviamos spam, apenas queremos oferecer a melhor experiência possível. Se surgir alguma dúvida ou precisar de suporte, estamos aqui para ajudar. Por favor, compartilhe suas ideias ou preocupações conosco abaixo. Aguardamos sua mensagem!
                     </S.ContactText>
                  </S.ContactContent>
                  <S.ContactForm>
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
                           value={userEmail}
                           onChange={handleUserEmail}
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

         <S.Footer>
            <S.FooterFlex>
               <S.FooterSocialMedia src='/public/assets/github-logo.svg'/>
               <S.FooterSocialMedia src='/public/assets/instagram-logo.svg'/>
            </S.FooterFlex>
            <S.Flex>
               <S.FooterLink>Voltar para o início.</S.FooterLink>
               <S.FooterLink>Projeto © 2024. All Rights reserved</S.FooterLink>
               <S.FooterLink>Privacidade & Termos</S.FooterLink>
            </S.Flex>
         </S.Footer>
      </>
   )
}