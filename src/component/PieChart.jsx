import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({completedTotal, newTotal, inProgressTotal}) => {

    const data = {
        labels: ['Completed', 'New', 'In Progress'],
        datasets: [
            {
                label: 'Total Amount',
                data: [completedTotal, newTotal, inProgressTotal],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            }
        ],
    }
    
  return (
    <Pie 
    data={data} 
    width={220}
    height={220}
    options={{maintainAspectRatio: false}}
    />
  )
}

export default PieChart