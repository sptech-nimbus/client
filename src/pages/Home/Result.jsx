/* eslint-disable react/prop-types */
import { Result } from './Home.styled';
import { Colors } from '@utils/Helpers';

export default function Results({ result }) {
   let color;
   let text;

   switch (result) {
      case 'win':
         color = Colors.green;
         text = 'Vitória'
         break;
      case 'lose':
         color = Colors.red;
         text = 'Derrota'
         break;
      case 'draw':
         color = Colors.yellow;
         text = 'Empate';
         break;
      default:
         color = Colors.yellow;
         text = 'Pendente'
         break;
   }

   return (
      <Result color={color}> {text} </Result>
   )
}