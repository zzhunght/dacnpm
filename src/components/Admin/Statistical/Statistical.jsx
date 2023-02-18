import "./Statistical.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
const data = [
  {
    id: 1,
    name: "Lược nhớt",
    price: "10000",
    sold: "20",
    type: "Phụ tùng",
  },
  {
    id: 2,
    name: "Bugi",
    price: "1000",
    sold: "500",
    type: "Phụ tùng",
  },
  {
    id: 3,
    name: "Dầu động cơ",
    price: "500",
    sold: "500",
    type: "LOẠI PHỤ PHẪM, DẦU MỠ",
  },
  {
    id: 4,
    name: "Săm, lốp",
    price: "10",
    sold: "10",
    type: "Phụ tùng",
  },
  {
    id: 5,
    name: "Gioăng đệm",
    price: "950",
    sold: "60",
    type: "Phụ tùng",
  },
];

const revenue = data.map(item => {
  return item.price * item.sold
})
var x= 0;
for(var i = 0; i< revenue.length; i++) {
  x= x+ revenue[i]
}
console.log(x);

function Statistical() {
 

  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "doanh thu",
        data: revenue,
        backgroundColor: "yellow",
        // borderColor:'red',
        tension: 0.4,
      },
      // {
      //   label: "hàng tồn kho",
      //   data: [100, 10, 50, 4, 60, 90, 30],
      //   backgroundColor: "green",
      //   // borderColor:'red',
      //   tension: 0.4,
      // },
    ],
  });

   const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Thống kê',
      },
    },
  };

  
  
  return (
    <div className="chart">
      
       
      <Line options={options} data={data}></Line>
      <h4 className="totalRevenue">Tổng doanh thu: {x}</h4>
    </div>
    

  );
}

export default Statistical;
