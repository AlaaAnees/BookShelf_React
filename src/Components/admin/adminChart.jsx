import  { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartArea = ({ pricesPerMonth, months }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance.current) {
       
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Total Revenue',
              data: pricesPerMonth,
              backgroundColor: '#8e3a9d',
              borderWidth: 0,
              barPercentage: 0.5,
              categoryPercentage: 0.8,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
   
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [pricesPerMonth, months]);

  return (
    <div>
      <canvas style={{ width: '100%', height: '400px' }} ref={chartContainer} />
    </div>
  );
};

export default ChartArea;
