import * as S from './ScrollProgress.styled';
import { useScroll, useSpring } from "framer-motion";

export default function({color}) {
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
     stiffness: 100,
     damping: 30,
     restDelta: 0.001
   });

   return (
      <S.ProgressBar style={{ scaleX }} color={color}/>
   )
}