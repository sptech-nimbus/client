import styled, { keyframes } from "styled-components";
import { Colors } from "@utils/Helpers";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const linePadding = "8rem";

const textFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const rotate = keyframes`
   from{
      transform: rotate(0deg);
   }
   to{
      transform: rotate(360deg);
   }

`
const textSlider = keyframes`
  from   { 
      transform: translateX(0%); 
  }
  to { 
      transform: translateX(-50%); 
  }
`

export const LogoBackground = styled.img`
   width: 45vw;
   position: absolute;
   bottom: 20%;
   z-index: 3;
   right: ${linePadding};
   user-select: none;
`

export const Flex = styled.div`
   width: 100%;
   height: fit-content;
   display: flex;
   gap: ${props => props.gap ? props.gap : '1rem'};
   justify-content: ${props => props.justCont ? props.justCont : 'space-between'};
   align-items: ${props => props.alignItems ? props.alignItems : 'center'};
`

export const PageWrapper = styled.div`
   width: 100%;
   height: ${props => props.$navOpen ? '100vh' : 'fit-content'};
   overflow-x: hidden;
   overflow-y: ${props => props.$navOpen ?  'hidden' : 'auto'};
`

// --------- header -----------
export const Header = styled.header`
   position: relative;
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`

export const Navbar = styled.nav`
   width: 100vw;
   height: 10vh;
   display: flex;
   justify-content: space-between;
   align-items: center;
   position: absolute;
   top: 0;
   left: 0;
   padding-inline: ${linePadding};
`

export const NavLogo = styled.img`
   width: 8.5vw;
   max-width: 180px;
   cursor: pointer;
   z-index: 2;
`

export const MenuTrigger = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: flex-end;
   width: 3vw;
   max-width: 50px;
   height: 30px;
   max-height: 50px;
   cursor: pointer;
   z-index: 2;
`

export const MenuContainer = styled.div`
   position: fixed;
   width: 100vw;
   height: 100vh;
   top: 0;
   left: 0;
   transition: all .5s ease-in-out;
   overflow: hidden;
   z-index: 2;
`

export const MenuContent = styled.div`
   width: 100%;
   height: 100%;
   position: relative;
   padding-top: 5%;
   padding-inline: ${linePadding};
   color: ${Colors.gray900};
   z-index: 3;
`

export const MenuLinks = styled.div`
   display: flex;
   flex-direction: column;
   position: relative;
   width: 100%;
   height: 100%;
`

export const MenuLink = styled.a`
   font-family: 'Catamaran', sans-serif;
   font-size: 5rem;
   font-weight: 900;
   text-transform: uppercase;
   color: ${Colors.gray900};
   transition: all .1s ease-in;
   cursor: pointer;

   &:hover {
      color: ${Colors.orange500};
   }
`

export const MenuFooter = styled.div`
   display: flex;
   justify-content: space-between;
   position: absolute;
   bottom: 0;
   width: 100%;
   height: 10%;
`

export const MenuFooterText = styled.span`
   font-weight: 600;
`

export const MenuAnimation = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
`

export const AnimationContainer = styled.div`
   position: relative;
   width: 100vw;
   height: 33.5vh;
   background-color: ${Colors.orange100};
   z-index: 2;
`

export const Animation1st = styled(AnimationContainer)`
   transform: translateX(-100%);
   animation: ${fadeIn} 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0s forwards;
`

export const Animation2nd = styled(AnimationContainer)`
   transform: translateX(-100%);
   animation: ${fadeIn} 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) .1s forwards;
`

export const Animation3rd = styled(AnimationContainer)`
   transform: translateX(-100%);
   animation: ${fadeIn} 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) .2s forwards;
`

export const MenuLine = styled.div`
   width: ${props => props.width ? props.width : '100%'};
   height: 0.25rem;
   background-color: ${props => props.$state ? Colors.orange500 : Colors.orange100};
   border-radius: 1rem;
   transition: all .5s cubic-bezier(.34,.44,0,.66), width .2s cubic-bezier(.34,.44,0,.66);
`

export const MenuLineUpper = styled(MenuLine)`
   transform: translateY(${props => props.$state ? '12px' : '0px'});
`

export const MenuLineMid = styled(MenuLine)`
   width: ${props => props.$state ? '0%' : props.width ? props.width : '100%'};
   transform: rotate(0deg);
`

export const MenuLineLower = styled(MenuLine)`
   transform: translateY(${props => props.$state ? '-12px' : '0px'});
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-inline: ${linePadding};
`

export const TitleContainer = styled.div` 
   position: relative;
   display: block;
   height: fit-content;
   text-align: center;
`

export const Line = styled(motion.hr)`   
   width: 50%;
   background-color: ${Colors.orange100};
   height: 4px; 
   border-radius: 1rem;
   border: none;
`

export const SocialMediaContainer = styled.div`
  width: 50%;
  padding-top: 8px;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`

export const SocialMedia = styled.img`
  width: 5%;
  cursor: pointer;
`

export const  Wrapper = styled.div`
   position: relative;
   top: -8%;
   display: flex;
   align-items: center;
   flex-direction: column;
`

export const ScrollDown = styled.img`
   width: 8vw;
   position: absolute;
   left: ${linePadding};
   bottom: 5%;
   animation: ${rotate} 8s linear infinite;
   -webkit-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
`

// ------------- main ---------------

export const Main = styled.main`
   position: relative;
`

export const About = styled.section`
   position: relative;
   width: 100%;
   height: 120vh;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 1.5rem;
   padding-inline: ${linePadding};
   padding-bottom: 20vh;
`

export const Outline = styled.img`
   width: 28vw;
   -webkit-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
   animation: ${rotate} 12s linear infinite;
`

export const AboutTextContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1.2rem;
   max-width: 500px;
   text-align: ${props => props.$textAlign ? props.$textAlign : 'left'};
`

export const AboutText = styled.span`
   font-size: 1.4rem;
   text-align: ${props => props.$textAlign ? props.$textAlign : 'left'};
`

export const WaveSvg = styled.img`
   position: absolute;
   width: 100vw;
   bottom: -.5%;

   -webkit-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
`

export const Comunication = styled.section`  
   position: relative;
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 120vh;
   background-color: ${Colors.orange500};
   padding-inline: ${linePadding};
`

export const TransitionText = styled(motion.img)`
   width: 80vw;
   position: absolute;
   bottom: -5%;
   z-index: 1;
   -webkit-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
`

export const ComunicationTextContainer = styled.div`
   display: flex;
   width: 100%;
`

export const ComunicationTextContainerRight = styled(ComunicationTextContainer)`
   justify-content: flex-end;
`

export const ComunicationText = styled(motion.div)`
   width: 40vw;
   color: ${Colors.orange100};
   font-size: 1.2rem;
`

export const ComunicationTextRight = styled(ComunicationText)`
   width: 24%;
   text-align: right;
`

export const Bold = styled.span`
   font-weight: 700;
`

export const Mockup = styled(motion.img)`
   position: absolute;
   width: 60vw;
   bottom: -20%;
   -webkit-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
   z-index: 1;
`

export const ComunicationWrapper = styled(Wrapper)`   
   position: relative;
   width: 100%;
   height: 100vh;
   top: 0;
   justify-content: center;
`

export const Features = styled.section`
   position: relative;
   width: 100vw;
   height: 135vh;
   align-items: flex-end;
   justify-content: flex-end;
   background-color: ${Colors.orange100};
   padding-inline: ${linePadding};
`

export const InvertedWaveSvg = styled.img`
   position: absolute;
   top: -1%;
   left: 0;
   width: 100vw;
   transform: scaleY(-1);
   -webkit-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
`

export const FeaturesWrapper = styled(Wrapper)`
   position: relative;
   top: 25%;
   width: 100%;
   height: 75%;
   gap: 2rem;
   align-items: flex-start;
`

export const FeaturesTitle = styled.div`
   width: 100%;
   box-sizing: border-box;
   position: relative;
   left: 0;
   display: flex;
   flex-direction: column;
`

export const SecondTitle = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
`

export const BasketballTitle = styled.img`
   position: relative;
   top: -4%;
   height: 10rem;
   -webkit-user-select: none; 
   -ms-user-select: none; 
   user-select: none; 
`

export const FeaturesSlider = styled.div`
   width: 100%;
   min-height: 40px;
   overflow-x: hidden;
`

export const FeaturesSliderWrapper = styled.div`
   display: flex;
   gap: 12px;
   width: fit-content;
   height: fit-content;
   white-space: nowrap;
   animation: ${textSlider} 25s linear infinite;
`

export const FeaturesSliderItem = styled.span`
   color: ${Colors.orange500};
   font-weight: 600;
   font-size: 1.2rem;
   text-transform: uppercase;
`

export const FeaturesCardContainer = styled.div`
   width:100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
`

export const FeaturesCard = styled.div`
   width: 30%;
   display: flex;
   gap: 1rem;
   flex-direction: column;
   padding: 1.2rem;
   border-radius: .8rem;
   transition: all .2s ease-in;
   border: 1px solid transparent;
   cursor: pointer;

   &:hover {
      background: rgba(255, 247, 243, 1);
      backdrop-filter: blur(12.5px);
      -webkit-backdrop-filter: blur(12.5px);
      border: 1px solid rgba(255, 234, 224, 0.54);
   }
`

export const FeaturesCardText = styled.span`
   color: ${Colors.gray900};
   font-size: 1rem;
   font-weight: 500;
`

export const Highlight = styled.span`
   font-weight: 700;
   color: ${Colors.orange500};
`

export const Contact = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   padding-block: 3rem;
   padding-inline: ${linePadding};
   position: relative;
   width: 100vw;
   height: 90vh;
   box-sizing: border-box;
`

export const ContactWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 5rem;
`

export const ContactContent = styled.div`
   display: flex;
   flex-direction: column;
   gap: 3rem;
   width: 50vw;
`

export const ContactForm = styled(motion.form)`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   width: 35vw;
`

export const ContactText = styled.span`
   width: 85%;
   font-size: 1rem;
   font-size: 'Catamaran';
   color: ${Colors.orange100};
`

export const Footer = styled.footer`
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;
   gap: 8px;
   width: 100vw;
   height: 10vh;
`

export const FooterFlex = styled.div`
   width: fit-content;
   height: fit-content;
   display: flex;
   gap: 0.5rem;
`

export const FooterLink = styled.span`
   color: ${Colors.orange100};
   font-weight: 600;
   padding-inline: ${linePadding};
   cursor: pointer;
`

export const FooterSocialMedia = styled.img`
   width: 1.5vw;
   cursor: pointer;
`