/* eslint-disable react/prop-types */
import Chart from "react-apexcharts";

const SparkLineChart = ({seriesData, name, color}) => {
  const series = [
    { name: name, data: seriesData, type: "area", color: color },
  ];
  const options = {
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 1.5 },
    fill: {
      opacity: [0.8, 0.5, 0.1], // Adjusted opacity array
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100, 100, 100],
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width={130}
      height={46}
    />
  );
};

export default SparkLineChart;
