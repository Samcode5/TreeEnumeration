import React, { useEffect, useState, useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import "../components/About/About.scss"

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const chartRef = useRef(null);
  const [showTemperatureChart, setShowTemperatureChart] = useState(true);

  useEffect(() => {
    // Fetch historical data from your API or any other source
    // and update the historicalData state
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/historicaldata');
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };
    fetchData();

    // Cleanup function to destroy the chart instance
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const plotTemperatureChart = () => {
    const labels = historicalData.map((data) => new Date(data.timestamp * 1000).toLocaleString());
    const temperatures = historicalData.map((data) => data.temperature);

    const data = {
      labels,
      datasets: [
        {
          label: 'Temperature',
          data: temperatures,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    return <Line data={data} ref={chartRef} />;
  };

  const plotWeatherChart = () => {
    const labels = historicalData.map((data) => new Date(data.timestamp * 1000).toLocaleString());
    const weathers = historicalData.map((data) => data.weather);
    const uniqueWeathers = [...new Set(weathers)];

    const data = {
      labels,
      datasets: [
        {
          label: 'Weather',
          data: weathers.map((weather) => uniqueWeathers.indexOf(weather) + 1),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    const options = {
      scales: {
        y: {
          ticks: {
            callback: (value) => uniqueWeathers[value - 1],
          },
        },
      },
    };

    return <Bar data={data} options={options} ref={chartRef} />;
  };

  return (
    <div>
    <p>Placeholder</p>
    <p>Placeholder</p>
      <div>
      <h1>Historical Data</h1>
        <button onClick={() => setShowTemperatureChart(true)}>Temperature Chart</button>
        <button onClick={() => setShowTemperatureChart(false)}>Weather Chart</button>
        {/* <form>
          <input type='text' name="loc" placeholder='Enter the  loc'/>
        </form> */}
      </div>
      {historicalData.length > 0 ? (
        showTemperatureChart ? (
          plotTemperatureChart()
        ) : (
          plotWeatherChart()
        )
      ) : (
        'Loading the data...'
      )}
    </div>
  );
};

export default HistoricalData;
