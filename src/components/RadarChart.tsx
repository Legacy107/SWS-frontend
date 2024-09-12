import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  data: number[];
  labels: string[];
}

export default function RadarChart({ data, labels }: RadarChartProps) {
  return (
    <Radar
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: 'rgba(34, 202, 236, 0.2)',
            borderColor: 'rgba(34, 202, 236, 1)',
            borderWidth: 1,
            tension: 0.3,
          },
        ],
      }}
      options={{
        layout: {
          autoPadding: true,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            yAlign: 'bottom',
            displayColors: false,
            callbacks: {
              title: function () {
                return ''; // Disable the title in the tooltip
              },
              label: function (context) {
                return `${labels[context.dataIndex]}: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 6,
            ticks: {
              display: false,
              stepSize: 1,
            },
            pointLabels: {
              display: false,
            },
          },
        },
      }}
    />
  );
}
