import * as S from './Stepper.styled';
import { useMediaQuery } from 'react-responsive';

function Line({ state }) {
   const states = ['complete', 'pending'];
   if (!states.includes(state)) state = 'pending';
   const isBelow470 = useMediaQuery({ maxWidth: 470 });
   const isAbove1700 = useMediaQuery({ minWidth: 1700 });

   let qtyCircles;
   qtyCircles = isAbove1700 ? 8 : 6
   qtyCircles = isBelow470 ? 3 : qtyCircles;

   function generateCircles() {
      let circlesArray = [];

      for (let i = 0; i < qtyCircles; i++) {
         circlesArray.push(
            <S.Circle key={i} state={state} />
         );
      }

      return circlesArray;
   }

   return (
      <S.Line>
         {generateCircles()}
      </S.Line>
   )
}

function Step({ state }) {
   const states = ['complete', 'onGoing', 'pending'];
   if (!states.includes(state)) state = 'pending';

   return (
      <S.Step state={state} />
   )
}

export default function Stepper({ steps, currentStep }) {

   function generateSteps() {
      let stepsArray = [];
      let stepStates = []; // Lista de estados de todos os passos

      for (let i = 1; i <= steps; i++) {
         let state;
         if (i === currentStep) {
            state = 'onGoing';
         } else if (i < currentStep) {
            state = 'complete';
         } else if (i > currentStep) {
            state = 'pending';
         }
         stepsArray.push(
            <Step key={`step${i}`} state={state} />
         );
         stepStates.push(state); // Adiciona o estado do passo à lista
      }

      return { stepsArray, stepStates }; // Retorna a lista de estados junto com os passos
   }

   function generateLines(stepStates) {
      let linesArray = [];

      for (let i = 0; i < stepStates.length - 1; i++) {
         const lineState = stepStates[i] === 'complete' ? 'complete' : 'pending';
         linesArray.push(
            <Line key={`line${i}`} state={lineState} />
         );
      }

      return linesArray;
   }

   const { stepsArray, stepStates } = generateSteps();

   function generateStepper() {
      let stepper = [];

      for (let i = 0; i < stepsArray.length; i++) {
         stepper.push(stepsArray[i]);

         if (i < stepStates.length - 1) { // Verifica se ainda há linhas a serem adicionadas
            stepper.push(generateLines(stepStates)[i]); // Adiciona a linha correspondente ao estado do passo anterior
         }
      }

      return stepper;
   }

   return (
      <S.Stepper steps={steps}>
         {generateStepper()}
      </S.Stepper>
   )
}
