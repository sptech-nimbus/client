import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from "react-chartjs-2";

ChartJS.register(
   RadialLinearScale,
   PointElement,
   LineElement,
   Filler,
   Tooltip,
   Legend
 );

export default function RadarChart({ data, options = {}, ...props }) {
   return <Radar data={data} options={options} {...props}/>
}