import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PriorityGraph({ tickets }) {
  const priorityCounts = useMemo(() => {
    if (!tickets || tickets.length === 0) {
      return {};
    }
    return tickets.reduce((acc, ticket) => {
      const priority = ticket.priority || 'Unknown';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});
  }, [tickets]);

  const chartData = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: 'Number of Tickets',
        data: Object.values(priorityCounts),
backgroundColor: [
          'rgba(34, 211, 238, 0.7)',  // A very bright cyan
          'rgba(56, 189, 248, 0.7)',  // A light sky blue
          'rgba(77, 181, 255, 0.7)',  // A vibrant azure blue
        ],
      
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'cyan',
          font: {
            size: 12
          },
          stepSize: 1,
        },
        // ✨ This is the only change
        grid: {
          display: false, // This hides the horizontal grid lines
        }
      },
      x: {
        ticks: {
          color: 'cyan',
          font: {
            size: 14
          }
        },
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Bugs by Priority',
        color: 'white',
        font: {
            size: 18
        }
      },
    },
  };

  return (
    <div className='h-[40vh] w-[90vw] md:h-[35vh] md:w-[40vw]  rounded-xl flex flex-col justify-center items-center p-4 
      border bg-slate-950/40 backdrop-blur-md border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30 '>
      {tickets && tickets.length > 0 ? (
        <div className='relative h-full w-full'>
          <Bar options={chartOptions} data={chartData} />
        </div>
      ) : (
        <p  className="text-cyan-300">No priority data to display.</p>
      )}
    </div>
  );
}

export default PriorityGraph;