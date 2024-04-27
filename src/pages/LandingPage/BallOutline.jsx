import React, { useState, useEffect, useRef } from 'react';
import * as S from './LandingPage.styled';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function BallOutline() {
  const { scrollY } = useScroll();
  const rotateSpring = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
  }); 
  const rotate = useTransform(rotateSpring, [0, 100], [0, 25], { clamp: false, })

  return (
    <motion.div
    style={{ rotate }} 
    >
        <S.Outline src='/public/assets/basketball-outline.svg'/>
    </motion.div>
  );
};

