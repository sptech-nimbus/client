import { Result } from './Home.styled';
import Colors from '@utils/Colors';

export default function Results({ result }) {
   let color;
   let text;
   
   switch(result) {
      case 'win':
         color = Colors.green;
         text = 'Vitória'
         break;
      case 'lose':
         color = Colors.red;
         text = 'Derrota'
         break;
      default:
         color = '#F9A400';
         text = 'Pendente'
         break;
   }

   return (
      <Result color={color}> {text} </Result>
   )
}