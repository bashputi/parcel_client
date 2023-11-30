import SectionTitle from "../../components/SectionTitle";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Adminhome = () => {
  const [chartData, setChartData] = useState({});
  

  useEffect(() => {
    fetch('http://localhost:5002/books')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const processedData = data.reduce((acc, item) => {
          const { time } = item;
          if (!acc[time]) {
            acc[time] = 1; 
          } else {
            acc[time]++; 
          }
          return acc;
        }, {});
        const categories = Object.keys(processedData);
        const seriesData = Object.values(processedData);
        setChartData({
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: categories
            }
          },
          series: [
            {
              name: "series-1",
              data: seriesData
            }
          ]
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      
      });
  }, []);

  return (
    <div >
      <SectionTitle  heading={'statistics'} subHeading={'Give focus on service'} />
      <div data-aos="zoom-in" data-aos-duration="2000" className="App flex justify-center my-20">
        <div className="chart">
          {chartData && chartData?.series && (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width="500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminhome;