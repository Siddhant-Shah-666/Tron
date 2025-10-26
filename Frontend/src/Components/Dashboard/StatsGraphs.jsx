import React, { useMemo } from 'react';
import { Doughnut } from "react-chartjs-2"; // ✨ 1. Import Doughnut instead of Pie
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

ChartJs.register(ArcElement, Tooltip, Legend);

function StatsGraphs({ tickets }) {
  const statusCounts = useMemo(() => {
    if (!tickets || tickets.length === 0) {
      return {};
    }
    return tickets.reduce((acc, ticket) => {
      const st = ticket.status || "Unknown";
      acc[st] = (acc[st] || 0) + 1;
      return acc;
    }, {});
  }, [tickets]);

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Ticket Status',
        data: Object.values(statusCounts),
backgroundColor: [
          'rgba(147, 197, 253, 0.8)', // Light Cornflower Blue
          'rgba(96, 165, 250, 0.8)',  // Standard Blue
          'rgba(59, 130, 246, 0.8)',  // Stronger Blue
          'rgba(37, 99, 235, 0.8)',   // Electric Blue
          'rgba(99, 102, 241, 0.8)',  // Indigo Blue
        ],
    
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          color: 'cyan',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className='h-[40vh] w-[90vw] md:h-[35vh] md:w-[40vw] bg-gray-700 rounded-xl flex flex-col justify-center items-center p-4 text-white relative border bg-slate-950/40 backdrop-blur-md border-cyan-400 text-cyan-300 
      shadow-lg shadow-cyan-400/30 '>
      {/* ✨ 2. Add the header */}
      <h3 className='text-xl font-semibold mb-4 absolute top-5 left-5 text-white'>Bugs by Status</h3>
      
      {tickets && tickets.length > 0 ? (
        <div className='relative h-full w-full'>
          {/* ✨ 3. Use the Doughnut component */}
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No ticket data to display.</p>
      )}
    </div>
  );
}

export default StatsGraphs;