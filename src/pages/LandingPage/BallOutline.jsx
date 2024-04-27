import React, { useState, useEffect, useRef } from 'react';
import * as S from './LandingPage.styled';
import { motion, useScroll, useTransform, useMotionValue, useVelocity, useAnimationFrame, useSpring } from 'framer-motion';

export default function BallOutline() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 100], [0, 30], { clamp: false, })

  return (
    <motion.div
    style={{ rotate }} 
    >
        <S.Outline src='/public/assets/basketball-outline.svg'/>
    </motion.div>
  );
};

