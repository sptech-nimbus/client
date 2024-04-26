import styled from "styled-components";
import { motion } from "framer-motion";

export const ProgressBar = styled(motion.div)`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   height: 5px;
   background: ${props => props.color ? props.color : 'var(--red)'};
   transform-origin: 50%;
   z-index: 3;
`