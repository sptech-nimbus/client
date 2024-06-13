import { useState } from 'react';
import * as S from './Match.styled';

export default function Playing({ isStarter }) {
   const [isPlaying, setIsPlaying] = useState(isStarter);
   
   const handlePlaying = () => {
      setIsPlaying(!isPlaying);
   }

   return (
      <S.isPlaying onClick={handlePlaying} $isPlaying={isPlaying}>
         {isPlaying ? 'Jogando' : 'No banco'}
      </S.isPlaying>
   )
}